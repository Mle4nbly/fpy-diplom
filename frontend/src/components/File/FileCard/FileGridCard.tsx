import { useContext, useState } from "react";
import type { FileStatus } from "../../../types/apiTypes"
import { FileIcon } from "../FileIcon"
import { FileDropdown } from "../../ui/Dropdown/FileDropdown";
import { RenameForm } from "../../ui/Forms/RenameForm";
import { ModalContext } from "../../../contexts/ModalContext/ModalContext";
import { Dropdown } from "../../ui/Dropdown/Dropdown";

export interface FileGridCardProps {
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

export const FileGridCard = ({id, path, name, description, size, status, onDelete, onEdit, onDownload}: FileGridCardProps) => {
  const {openModal, closeModal} = useContext(ModalContext)
  
  const [isEditing, setIsEditing] = useState(false);

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDownload = () => {
    onDownload(id, name)
  }

  const handleDelete = () => {
    onDelete(id)
  }

  const handleRename = (newName: string) => {
    onEdit(id, newName, description);
    setIsEditing(false);
  };

  const handleEdit = (newName: string, newDescription: string | null) => {
    if (!newDescription) {
      onEdit(id, newName, null);
      closeModal();

      return;
    }

    onEdit(id, newName, newDescription);
    closeModal()
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
    <div className="grid-container">
      <div className="grid-content border p-2">
        <FileIcon path={path} name={name} view="GRID"/>
        <Dropdown
          id={id}
          items={[
            {
              id: 'edit',
              label: 'Изменить',
              action: handleEdit
            },
            {
              id: 'download',
              label: 'Скачать',
              action: handleDownload
            },
            {
              id: 'delete',
              label: 'Удалить',
              action: handleDelete
            }
          ]}
        />
      </div>
      <div className="grid-info">
        {renderFileName()}
        <small className="card-body text-truncate d-block">{(size / 1024 / 1024).toFixed(2)} MB | {name.split('.').pop()?.toUpperCase()}</small>
      </div>
    </div>
  )  
}