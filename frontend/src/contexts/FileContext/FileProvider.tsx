import { useEffect, useState, type ReactNode } from "react";
import { useApi } from "../../hooks/useApi";
import { FileContext } from "./FileContext";
import type { FileStatus, FileType } from "../../types/types";

export const FileProvider = ({children}: {children: ReactNode}) => {
  const token = localStorage.getItem('token') || '';

  const {loading, error, getData, sendData} = useApi<FileType>(token);
  const [files, setFiles] = useState<FileType[]>([]);
  

  useEffect(() => {
    getFilesList()
  }, [])

  const getFilesList = async () => {
    const response = await getData('/files');

    if (response) setFiles(response)
  }

  const deleteFile = async (id: number) => {
    toggleFileStatus(id, "DELETING")
    const response = await sendData("DELETE", `/files/${id}`)

    console.log(response)
    if (response) setFiles((prev) => prev.filter((f) => f.id != id))

    toggleFileStatus(id)
  }

  const uploadFile = async (file: File, fileName: string, description: string | null) => {
    const formData = new FormData();
    const originalName = `${fileName}.${file.name.split('.')[1]}`

    formData.append("file", file);
    formData.append("original_name", originalName);
    formData.append("description", `${description}`);

    const response = await sendData("POST", "/files", formData);
    if (response) setFiles((prev) => [...prev, response]);
  };

  const editFile = async (id: number, newName: string, description: string | null) => {
    toggleFileStatus(id, "EDITING")
    const response = await sendData("PUT", `/files/${id}`, {original_name: newName, description})

    if (response) {
      setFiles((prev) => 
        prev.map((f) => (f.id == id ? {...f, original_name: newName, description: description} : f))
      )
    }

    toggleFileStatus(id)
  }

  const downloadFile = async (id: number, filename: string) => {
    toggleFileStatus(id, "DOWNLOADING")
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/files/${id}/download/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Ошибка загрузки файла");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    } finally {
      toggleFileStatus(id)
    }
  };

  const toggleFileStatus = (id: number, status?: FileStatus) => {
    setFiles((prev) => prev?.map((f) => {
      if (id !== f.id) return f;
      if (status) return {...f, status};
      const {status: _, ...rest} = f;

      return rest;
    }) ?? []);
  };

  return (
    <FileContext.Provider value={{files, loading, error, uploadFile, getFilesList, deleteFile, editFile, downloadFile}}>
      {children}
    </FileContext.Provider>
  )
}