import { useRef, useState } from 'react';
import { FilePreview } from '../File/FilePreview';
import { createPortal } from 'react-dom';
import { DescriptionInputField } from '../ui/Forms/DescriptionInputField';
import { Dropdown } from '../ui/Dropdown/Dropdown';
import { NameInputField } from '../ui/Forms/NameInputField';

export interface DetailModalProps {
  name: string;
  description: string | null;
  url: string;
  size: number;
  onClose: () => void;
  onNameSubmit: (newName: string) => void;
  onDescriptionSubmit: (newDescription: string) => void;
}

export const DetailModal = ({
  name,
  size,
  url,
  description,
  onClose,
  onDescriptionSubmit,
  onNameSubmit,
}: DetailModalProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);

  const [isEditDescription, setIsEditDescription] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const handleOpenDescriptionField = () => {
    setIsEditDescription(true);
    setDropdownIsOpen(false);
    console.log(url);
  };

  const handleDescriptionFieldCancel = () => {
    setIsEditDescription(false);
  };

  const handleDescriptionFieldSubmit = (newDescription: string) => {
    onDescriptionSubmit(newDescription);
    setIsEditDescription(false);
  };

  const handleOpenNameField = () => {
    setIsRenaming(true);
  };

  const handleNameFieldCancel = () => {
    setIsRenaming(false);
  };

  const handleNameFieldSubmit = (newName: string) => {
    onNameSubmit(newName);

    setIsRenaming(false);
  };

  return createPortal(
    <>
      <div className="modal show-modal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="actions-group">
                <button
                  type="button"
                  className="btn btn-circle"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                  >
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                  </svg>
                </button>
                <div className="file-info">
                  {isRenaming ? (
                    <NameInputField
                      initValue={name}
                      onCancel={handleNameFieldCancel}
                      onRename={handleNameFieldSubmit}
                    />
                  ) : (
                    <div className="user-actions">
                      <span
                        style={{
                          fontSize: '20px',
                          fontWeight: '600',
                        }}
                      >
                        {name.split('.')[0]}
                      </span>
                      <button onClick={handleOpenNameField} className="btn btn-small btn-light">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 -960 960 960"
                          width="16px"
                          height="16px"
                        >
                          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
                        </svg>
                      </button>
                    </div>
                  )}
                  <small>
                    {name.split('.').pop()?.toUpperCase()} • {(size / 1024 / 1024).toFixed(2)} MB
                  </small>
                </div>
              </div>
              <div className="actions-group"></div>
            </div>
            <div className="modal-preview">
              <FilePreview url={url} name={name} />
            </div>
            <div className="modal-footer">
              <div className="description-container">
                {isEditDescription && (
                  <DescriptionInputField
                    initValue={description}
                    onSubmit={handleDescriptionFieldSubmit}
                    onCancel={handleDescriptionFieldCancel}
                  />
                )}
                {!isEditDescription && description && (
                  <>
                    <div className="description-field">
                      <span>{description}</span>
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
                  </>
                )}
                {!description && !isEditDescription && (
                  <button className="btn btn-text btn-dark" onClick={handleOpenDescriptionField}>
                    Добавить описание
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
      {dropdownIsOpen ? (
        <Dropdown
          buttonRef={btnRef}
          onClose={() => {
            setDropdownIsOpen(false);
          }}
        >
          <li>
            <button className="dropdown-item" onClick={handleOpenDescriptionField}>
              Изменить
            </button>
          </li>
          <li>
            <button
              className="dropdown-item"
              onClick={() => {
                onDescriptionSubmit('');
              }}
            >
              Удалить
            </button>
          </li>
        </Dropdown>
      ) : (
        ''
      )}
    </>,
    document.body,
  );
};
