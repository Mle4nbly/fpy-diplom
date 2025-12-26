import { useParams } from "react-router-dom"
import { useApi } from "../../hooks/useApi";
import { useEffect, useState } from "react";
import type { FileType } from "../../types/apiTypes";

export const ShareFilePage = () => {
  const params = useParams();
  const fileToken = params.token || '';
  const fileName = params.filename || '';

  const [fileData, setFileData] = useState<FileType>()

  const {getData, sendData} = useApi()

  useEffect(() => {
    getFileData();
  }, [])

  const getFileData = async () => {
    const response = await getData(`/s/${fileToken}`);

    if (response) setFileData(response);
  }

  const downloadFile = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/s/${fileToken}/download/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) throw new Error("Ошибка заги файла");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = 'base';
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
    }
  };

  if (!fileData) return (<div>Ошибка</div>)

  return (
    <>
      <header className="container">
        <div className="title-wrapper">
          <div className="file-title">
            <span>{fileName.split(".")[0]}</span>
          </div>
          <small className="file-info">
            {fileData?.original_name.split('.').pop()?.toUpperCase()} • {(fileData?.size / 1024 / 1024).toFixed(2)} MB
          </small>
        </div>
      </header>
      <div className="container">
        
      </div>
    </>
  )
}