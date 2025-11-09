import { useContext, useState } from "react"
import type { FileStatus } from "../../../types/apiTypes"
import { FileIcon } from "../FileIcon"
import { FileDropdown } from "../../ui/Dropdown/FileDropdown"
import { RenameForm } from "../../ui/Forms/RenameForm"
import { ModalContext } from "../../../contexts/ModalContext/ModalContext"

export interface FileListCardProps {
  id: number,
  path: string,
  name: string,
  description: string | null,
  size: number,
  uploadedAt: string,
  status?: FileStatus,
  onDelete: (id: number) => void,
  onEdit: (id: number, name: string, description: string | null) => void,
  onDownload: (id: number, filename: string) => void
}

export const FileListCard = ({id, path, name, description, size, uploadedAt, status, onDelete, onEdit, onDownload}: FileListCardProps) => {
  const {openModal, closeModal} = useContext(ModalContext)

  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleEdit = (newName: string, newDescription: string | null) => {
    if (!newDescription) {
      onEdit(id, newName, null);
      closeModal();

      return;
    }

    onEdit(id, newName, newDescription);
    closeModal()
  };

  const handleRename = (newName: string) => {
    onEdit(id, newName, description);
    setIsEditing(false);
  };

  const renderFileName = () => {
    switch (status) {
      case "EDITING":
        return <span className="file-name">Переименование...</span>
      case "DELETING":
        return <span className="file-name">Удаление...</span>
      case "DOWNLOADING":
        return <span className="file-name">Загрузка...</span>
      default:
        return isEditing ? (
          <RenameForm initName={name} onCancel={handleCancel} onRename={handleRename} />
        ) : (
          <div className="file-title-container">
            <span className="file-title">{name.split(".")[0]}</span>
          </div>
        )
    }
  }

  return (
    <>
      <tr className="file-row">
        <td className="file-name-cell">
          <FileIcon path={path} view="LIST" name={name}/>
          {renderFileName()}
        </td>
        <td className="file-uploaded-cell">
          {new Date(uploadedAt).toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
          })}
        </td>
        <td className="file-size-cell"><span className="m-0">
          {(size / 1024 / 1024).toFixed(2)} MB</span>
          <FileDropdown 
            id={id} 
            onDelete={() => onDelete(id)} 
            onDownload={() => onDownload(id, name)}
            onRename={() => setIsEditing(!isEditing)}
            onEdit={() => openModal('edit', {name, description, onClose: closeModal, onSubmit: handleEdit})}
          />
        </td>
      </tr>
    </>
  )  
}