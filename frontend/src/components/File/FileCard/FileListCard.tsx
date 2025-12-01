import { useRef, useState } from "react"
import type { FileStatus } from "../../../types/apiTypes"
import { FileIcon } from "../FileIcon"
import { NameInputField } from "../../UI/Forms/NameInputField"
import { Dropdown } from "../../UI/Dropdown/Dropdown"
import { DetailModal } from "../../Modal/DetailModal"

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
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);

  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [isRenaming, setIsRenaming] = useState(false);

  const handleOpenDetailModal = () => {
    setDetailModalIsOpen(true)
    setDropdownIsOpen(false)
  }

  const handleCloseDetailModal = () => {
    setDetailModalIsOpen(false)
  }

  const handleRenamingCancel = () => {
    setIsRenaming(false);
  }

  const handleRenameFieldOpen = () => {
    setIsRenaming(true)
    setDropdownIsOpen(false)
  }

  const handleDownload = () => {
    onDownload(id, name);

    setDropdownIsOpen(false);
  }

  const handleDelete = () => {
    onDelete(id);

    setDropdownIsOpen(false);
  }

  const handleRename = (newName: string) => {
    onEdit(id, newName, description);
    setIsRenaming(false);
  };

  const handleEditDescription = (newDescription: string | null) => {
    onEdit(id, name, newDescription)
  }

  const handleEditName = (newName: string) => {
    onEdit(id, newName, description)
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
        return isRenaming ? (
          <NameInputField initValue={name} onCancel={handleRenamingCancel} onRename={handleRename} />
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
          <div className="file-icon-list">
            <FileIcon path={path} name={name}/>
          </div>
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
          <button ref={btnRef} type="button" className="btn btn-secondary btn-dropdown" onClick={() => setDropdownIsOpen(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-three-dots"
              viewBox="0 0 16 16"
            >
              <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
            </svg>
          </button>
          {dropdownIsOpen && btnRef ? 
            <Dropdown
              btnRef={btnRef}
              onClose={() => setDropdownIsOpen(false)}
            >
              <li>
                <button className="dropdown-item" onClick={handleOpenDetailModal}>
                  Изменить
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleDownload}>
                  Скачать
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleRenameFieldOpen}>
                  Переимновать
                </button>
              </li>
              <li>
                <button className="dropdown-item" onClick={handleDelete}>
                  Удалить
                </button>
              </li>
            </Dropdown> : ''
          }
        </td>
      </tr>
      {detailModalIsOpen && <DetailModal name={name} description={description} path={path} size={size} onClose={handleCloseDetailModal} onDescriptionSubmit={handleEditDescription} onNameSubmit={handleEditName}/>}
    </>
  )  
}