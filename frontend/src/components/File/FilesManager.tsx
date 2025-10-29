import { useContext, useEffect, useState } from "react"
import { FileContext } from "../../contexts/FileContext/FileContext"; 
import { FilesList } from "./FilesView/FilesList";
import { FilesGrid } from "./FilesView/FilesGrid";
import { ViewTypeContext } from "../../contexts/ViewTypeContext/ViewTypeContext";

export const FileManager = () => {
  const {viewType} = useContext(ViewTypeContext)
  const {files, loading, error, getFilesList, deleteFile, editFile, downloadFile} = useContext(FileContext);

  if (!files?.length) return <p>No files...</p>;

  return (
    <>
      <div className="container container-header">
        <h3 className="title">Все файлы</h3>
      </div>
      <section className="container">
        {viewType == "LIST" ?
          <FilesList files={files} onDownload={downloadFile} onDelete={deleteFile} onEdit={editFile}/> :
          <FilesGrid files={files} onDownload={downloadFile} onDelete={deleteFile} onEdit={editFile}/>
        }
      </section>
    </>
  )
}