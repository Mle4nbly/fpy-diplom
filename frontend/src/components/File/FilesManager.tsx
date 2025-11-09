import { useContext, useEffect, useState } from "react"
import { FilesContext } from "../../contexts/FilesContext/FilesContext"; 
import { FilesList } from "./FilesView/FilesList";
import { FilesGrid } from "./FilesView/FilesGrid";
import { ViewTypeContext } from "../../contexts/ViewTypeContext/ViewTypeContext";

export const FileManager = () => {
  const {viewType} = useContext(ViewTypeContext)
  const {files, loading, error, getFilesList, deleteFile, editFile, downloadFile} = useContext(FilesContext);

  return (
    <>
      <div className="container container-header">
        <h3 className="title">Все файлы</h3>
      </div>
      {!files?.length ?
        <p>В облаке пока нет файлов</p> :
        <section className="container">
          {viewType == "LIST" ?
            <FilesList files={files} onDownload={downloadFile} onDelete={deleteFile} onEdit={editFile}/> :
            <FilesGrid files={files} onDownload={downloadFile} onDelete={deleteFile} onEdit={editFile}/>
          }
        </section>
      }
    </>
  )
}