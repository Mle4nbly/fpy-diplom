import { useRef, useState } from 'react';
import type { FileStatus, FileType } from '../../../types/apiTypes';
import { FilePreview } from '../FilePreview';
import { NameInputField } from '../../ui/Forms/NameInputField';
import { Dropdown } from '../../ui/Dropdown/Dropdown';
import { DetailModal } from '../../Modal/DetailModal';
import { ShareModal } from '../../Modal/ShareModal';

export interface FileListCardProps extends FileType {
  status?: FileStatus;
  onDelete: (id: number) => void;
  onEdit: (id: number, name: string, description: string) => void;
  onDownload: (id: number, filename: string) => void;
}

export const FileListCard = ({
  id,
  url,
  original_name: fileName,
  description,
  size,
  uploaded_at: uploadedAt,
  share_link: shareLink,
  status,
  onDelete,
  onEdit,
  onDownload,
}: FileListCardProps) => {
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [isRenaming, setIsRenaming] = useState(false);

  const handleOpenDetailModal = () => {
    setDetailModalIsOpen(true);
    setDropdownIsOpen(false);
  };

  const handleOpenShareModal = () => {
    setShareModalIsOpen(true);
    setDropdownIsOpen(false);
  };

  const handleRenameFieldOpen = () => {
    setIsRenaming(true);
    setDropdownIsOpen(false);
  };

  const handleDownload = () => {
    onDownload(id, fileName);

    setDropdownIsOpen(false);
  };

  const handleDelete = () => {
    onDelete(id);

    setDropdownIsOpen(false);
  };

  const handleRename = (newName: string) => {
    onEdit(id, newName, description);
    setIsRenaming(false);
  };

  const handleEditDescription = (newDescription: string) => {
    onEdit(id, fileName, newDescription);
  };

  const handleEditName = (newName: string) => {
    onEdit(id, newName, description);
  };

  const renderFileName = () => {
    switch (status) {
      case 'EDITING':
        return <span className="file-title">Переименование...</span>;
      case 'DELETING':
        return <span className="file-title">Удаление...</span>;
      case 'DOWNLOADING':
        return <span className="file-title">Загрузка...</span>;
      default:
        return isRenaming ? (
          <NameInputField
            initValue={fileName}
            onCancel={() => setIsRenaming(false)}
            onRename={handleRename}
          />
        ) : (
          <div className="file-title">{fileName.split('.')[0]}</div>
        );
    }
  };

  return (
    <>
      <tr className="body-row">
        <td className="cell-container ">
          <div className="cell-content">
            <div className="file-preview file-preview--list">
              <FilePreview url={url} name={fileName} />
            </div>
            <div className="file-title-container">{renderFileName()}</div>
          </div>
        </td>
        <td className="cell-container">
          <div className="cell-content">
            {new Date(uploadedAt).toLocaleString('ru-RU', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </td>
        <td className="cell-container">
          <div className="cell-content">
            <span>{(size / 1024 / 1024).toFixed(2)} MB</span>
          </div>
        </td>
        <td className="cell-container">
          <div className="cell-content cell-content--end">
            <button
              ref={btnRef}
              type="button"
              className="btn btn-circle"
              onClick={() => setDropdownIsOpen(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
              >
                <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
              </svg>
            </button>
          </div>
        </td>
      </tr>
      {dropdownIsOpen && btnRef ? (
        <Dropdown buttonRef={btnRef} onClose={() => setDropdownIsOpen(false)}>
          <li className="dropdown-section">
            <button className="dropdown-item" onClick={handleOpenDetailModal}>
              Изменить
            </button>
            <button className="dropdown-item" onClick={handleRenameFieldOpen}>
              Переимновать
            </button>
          </li>
          <li>
            <button className="dropdown-item" onClick={handleDownload}>
              Скачать
            </button>
            <button className="dropdown-item" onClick={handleOpenShareModal}>
              Поделиться
            </button>
          </li>
          <li className="dropdown-footer">
            <button className="dropdown-item" onClick={handleDelete}>
              Удалить
            </button>
          </li>
        </Dropdown>
      ) : (
        ''
      )}
      {shareModalIsOpen && (
        <ShareModal
          fileName={fileName}
          shareLink={shareLink}
          onClose={() => setShareModalIsOpen(false)}
        />
      )}
      {detailModalIsOpen && (
        <DetailModal
          name={fileName}
          description={description}
          url={url}
          size={size}
          onClose={() => setDetailModalIsOpen(false)}
          onDescriptionSubmit={handleEditDescription}
          onNameSubmit={handleEditName}
        />
      )}
    </>
  );
};
