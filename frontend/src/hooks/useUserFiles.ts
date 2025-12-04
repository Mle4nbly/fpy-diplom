import { useEffect, useState } from "react"
import type { FileStatus, FileType } from "../types/apiTypes"
import { useApi } from "./useApi"

export const useUserFiles = (token: string, username?: string) => {
  const {getData, sendData, error, loading} = useApi(token)

  const [baseUrl, setBaseUrl] = useState(username ? `/files/${username}` : '/files')
  const [files, setFiles] = useState<FileType[]>([])

  useEffect(() => {
    if (username) {
      setBaseUrl(`/files/${username}`)
    } else {
      setBaseUrl('/files')
    }
  }, [username])

  useEffect(() => {
    getFilesList()
  }, [])

  const getFilesList = async () => {
    const response = await getData(baseUrl);

    if (response) setFiles(response)
  }

  const deleteFile = async (id: number) => {
    toggleFileStatus(id, 'DELETING')
    const response = await sendData('DELETE', `${baseUrl}/${id}`);

    if (response) setFiles((prev) => prev.filter((f) => f.id !== id))
    toggleFileStatus(id)
  }

  const editFile = async (id: number, name: string, description: string) => {
    toggleFileStatus(id, 'EDITING')
    const response = await sendData('PATCH', `${baseUrl}/${id}`, {name, description})

    if (response) {
      setFiles((prev) => 
        prev.map((f) => (f.id == id ? {...f, name, description} : f))
      )
    }
    toggleFileStatus(id)
  }

  const uploadFile = async (file: File, fileName: string, description: string) => {
    const formData = new FormData();
    const originalName = `${fileName}.${file.name.split('.')[1]}`

    formData.append("file", file);
    formData.append("name", originalName);
    formData.append("description", description);

    const response = await sendData("POST", `${baseUrl}`, formData);
    if (response) setFiles((prev) => [...prev, response]);
  };

  const downloadFile = async (id: number, filename: string) => {
    toggleFileStatus(id, "DOWNLOADING")
    try {
      const response = await fetch(`http://127.0.0.1:8000/api${baseUrl}/${id}/download/`, {
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

  return {files, loading, error, getFilesList, uploadFile, deleteFile, editFile, downloadFile};
}