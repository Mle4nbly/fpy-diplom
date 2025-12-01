import { useContext } from "react";
import { ViewTypeContext } from "../../../contexts/ViewTypeContext/ViewTypeContext";
import { FilesContext } from "../../../contexts/FilesContext/FilesContext";
import { ToggleSortingButtons } from "../../UI/Buttons/ToggleSortingButtons";
import { UploadButton } from "../../UI/Buttons/UploadButton";
import { FileBrowser } from "../FileBrowser";

export const UserFiles = () => {
  const {viewType} = useContext(ViewTypeContext)
  const {files, uploadFile, deleteFile, editFile, downloadFile} = useContext(FilesContext);

  return (
    <>
      <div className="container container-title">
        <h3 className="title">Все файлы</h3>
      </div>
      <header className="container header-container">
        <UploadButton onUpload={uploadFile}/>
        <ToggleSortingButtons />
      </header>
      {!files?.length ?
        <p>В облаке пока нет файлов</p> :
        <FileBrowser viewType={viewType} files={files} onDelete={deleteFile} onEdit={editFile} onDownload={downloadFile}/>
      }
    </>
  )
}