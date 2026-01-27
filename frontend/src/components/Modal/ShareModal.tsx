import { createPortal } from 'react-dom';

export interface DetailModalProps {
  fileName: string;
  shareLink: string;
  onClose: () => void;
}

export const ShareModal = ({ shareLink, fileName, onClose }: DetailModalProps) => {
  const handleCopyLink = async () => {
    const link = `http://localhost:5173/s/${shareLink}`;

    try {
      await navigator.clipboard.writeText(link);

      console.log('Ссылка скопирована');
    } catch {
      console.log('Ошибка');
    }
  };

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
    document.body,
  );
};
