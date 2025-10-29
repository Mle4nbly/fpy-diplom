import { useState } from "react"

export interface EditModalProps {
  name: string,
  description: string | null,
  onClose: () => void,
  onSubmit: (name: string, description: string | null) => void,
}

export const EditModal = ({name, description, onClose, onSubmit}: EditModalProps) => {
  const [nameValue, setNameValue] = useState(name);
  const [descriptionValue, setDescriptionValue] = useState<string | null>(description);

  return (
    <>
      <div className="modal show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Редактирование файла</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <form onSubmit={() => onSubmit(nameValue, descriptionValue)}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="col-form-label" htmlFor="name">Имя файла:</label>
                  <input 
                    className="form-control"
                    id="name"
                    type="text"
                    value={nameValue}
                    onChange={(e) => setNameValue(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="description"></label>
                  <textarea 
                    className="form-control" 
                    id="description"
                    value={descriptionValue ? descriptionValue : ''}
                    onChange={(e) => setDescriptionValue(e.target.value)}
                  />
                </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={onClose}>Закрыть</button>
                  <button type="submit" className="btn btn-primary">Готово</button>
                </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  )
}