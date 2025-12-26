import { useParams } from "react-router-dom"
import { UploadButton } from "../../UI/Buttons/UploadButton";
import { ToggleSortingButtons } from "../../UI/Buttons/ToggleSortingButtons";
import { useUserFiles } from "../../../hooks/useUserFiles";
import { FileBrowser } from "../FileBrowser";
import { useContext } from "react";
import { ViewTypeContext } from "../../../contexts/ViewTypeContext/ViewTypeContext";
import { AuthContext } from "../../../contexts/AuthContext/AuthContext";

export const AdminUserFiles = () => {
  const {token} = useContext(AuthContext)

  const params = useParams()
  const username = params.username || '';

  const {viewType} = useContext(ViewTypeContext);

  const {files, uploadFile, deleteFile, editFile, downloadFile} = useUserFiles(token, username)

  return (
    <section className="page-content-section">
      <div className="title-container">
        <h3 className="title">Хранилище пользователя <span style={{color: 'red'}}>{username}</span></h3>
      </div>
      <header className="header-container">
        <UploadButton onUpload={uploadFile}/>
        <ToggleSortingButtons />
      </header>
      <div className="content-container">
        {!files?.length ?
          <p>В облаке пока нет файлов</p> :
          <FileBrowser viewType={viewType} files={files} onDelete={deleteFile} onEdit={editFile} onDownload={downloadFile}/>
        }
      </div>
    </section>
  )
}