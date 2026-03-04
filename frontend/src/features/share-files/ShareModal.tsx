import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export interface DetailModalProps {
  fileName: string;
  shareLink: string;
  onClose: () => void;
}

export const ShareModal = ({ shareLink, fileName, onClose }: DetailModalProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const link = `${import.meta.env.VITE_CLIENT_URL}/s/${shareLink}`

  useEffect(() => {
    inputRef.current?.focus();
    inputRef.current?.select();
  }, [])

  return createPortal(
    <>
      <div className="modal show-modal">
        <div className="modal-dialog">
          <div className="modal-content share-modal-content">
            <div className="modal-header">
              <div className="file-title-container">
                <span style={{ marginRight: '.5em' }}>Поделиться:</span>
                <div className="file-title">
                  <span>{fileName.split('.')[0]}</span>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <input 
                ref={inputRef}
                className='form-control' 
                type="text" 
                value={link}
                readOnly
              />
              <button className="btn btn-dark btn-text">
                <span onClick={onClose}>Готово</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>,
    document.body,
  );
};
