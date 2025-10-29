import { useRef, useState } from "react";

export interface UploadModalProps {
  onClose: () => void,
  onSubmit: (name: string, description: string | null, file: File) => void,
}

export const UploadModal = ({onClose, onSubmit}: UploadModalProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null)
  
  const [nameValue, setNameValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('');

  const handleSubmit = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      return;
    }

    onSubmit(nameValue, descriptionValue, file);
  };

  return (
    <>
      <div className="modal show">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Загрузка нового файла</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={onClose}></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="col-form-label" htmlFor="name">Файл:</label>
                  <input
                    className="form-control"
                    id="file"
                    ref={fileRef}
                    type="file" 
                  />
                </div>
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