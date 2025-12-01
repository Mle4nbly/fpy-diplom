import { useRef, useState } from "react"
import { FileIcon } from "../File/FileIcon";
import { createPortal } from "react-dom";
import { DescriptionInputField } from "../UI/Forms/DescriptionInputField";
import { Dropdown } from "../UI/Dropdown/Dropdown";
import { NameInputField } from "../UI/Forms/NameInputField";

export interface DetailModalProps {
  name: string,
  description: string | null,
  path: string,
  size: number,
  onClose: () => void,
  onNameSubmit: (newName: string) => void,
  onDescriptionSubmit: (newDescription: string | null) => void
}

export const DetailModal = ({name, size, path, description, onClose, onDescriptionSubmit, onNameSubmit}: DetailModalProps) => {
  const btnRef = useRef<HTMLButtonElement | null>(null)

  const [nameValue, setNameValue] = useState(name);
  const [descriptionValue, setDescriptionValue] = useState<string | null>(description);
  const [isEditDescription, setIsEditDescription] = useState(false);
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [isRenaming, setIsRenaming] = useState(false)

  const handleOpenDescriptionField = () => {
    setIsEditDescription(true);
    setDropdownIsOpen(false);
  }

  const handleDescriptionFieldCancel = () => {
    setIsEditDescription(false);
  }

  const handleDescriptionFieldSubmit = (newDescription: string | null) => {
    onDescriptionSubmit(newDescription);
    setIsEditDescription(false);
  }

  const handleOpenNameField = () => {
    setIsRenaming(true);
  }

  const handleNameFieldCancel = () => {
    setIsRenaming(false);
  }

  const handleNameFieldSubmit = (newName: string) => {
    onNameSubmit(newName);

    setIsRenaming(false);
  }

  return (
    createPortal(
      <>
        <div className="modal show-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
                <div className="title-container">
                  <div className="modal-title">
                    <div className="file-title">
                      {isRenaming ?
                        <NameInputField initValue={name} onCancel={handleNameFieldCancel} onRename={handleNameFieldSubmit} /> : 
                        <>
                          <span>{name.split(".")[0]}</span>
                          <button onClick={handleOpenNameField} className="btn-rename">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960">
                              <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                            </svg>
                          </button>
                        </>
                      }
                    </div>
                  </div>
                  <small className="d-block">{name.split('.').pop()?.toUpperCase()} • {(size / 1024 / 1024).toFixed(2)} MB</small>
                </div>
              </div>
              <div className="modal-preview">
                <FileIcon path={path} name={name}/>
              </div>
              <div className="modal-body">
                <div className="description-container">
                  {isEditDescription && 
                    <DescriptionInputField initValue={description} onSubmit={handleDescriptionFieldSubmit} onCancel={handleDescriptionFieldCancel}/>
                  }
                  {!isEditDescription && description &&
                    <>
                      <div className="description-field">
                        <span>{description}</span>
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
                      </div>
                      {dropdownIsOpen ? 
                        <Dropdown btnRef={btnRef} onClose={() => {setDropdownIsOpen(false)}}>
                          <li>
                            <button className="dropdown-item" onClick={handleOpenDescriptionField}>
                              Изменить
                            </button>
                          </li>
                          <li>
                            <button className="dropdown-item" onClick={() => {onDescriptionSubmit(null)}}>
                              Удалить
                            </button>
                          </li>
                        </Dropdown> :
                        ''
                      }
                    </>
                  }
                  { !description && !isEditDescription &&  
                    <button className="btn-upload" onClick={handleOpenDescriptionField}>Добавить описание</button>
                  }
                </div>   
              </div>
            </div>
          </div>
        </div>
        <div className="modal-backdrop fade show"></div>
      </>,
      document.body
    )
  )
}