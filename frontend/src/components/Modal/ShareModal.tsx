import { useRef, useState } from "react"
import { createPortal } from "react-dom";

export interface DetailModalProps {
  fileName: string,
  shareLink: string,
  onClose: () => void,
}

export const ShareModal = ({shareLink, fileName, onClose}: DetailModalProps) => {

  const handleCopyLink = () => {
    
  }

  return (
    createPortal(
      <>
        <div className="modal show-modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <span>Поделиться - {fileName}</span>
              </div>
              <div className="modal-footer">
                  <button className="btn btn-light btn-text" onClick={handleCopyLink}>
                    <span>Копировать ссылку</span>
                  </button>
                  <button className="btn btn-dark btn-text">
                    <span onClick={onClose}>Готово</span>
                  </button>
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