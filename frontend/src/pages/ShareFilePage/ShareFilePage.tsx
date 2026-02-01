import { useNavigate, useParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { useCallback, useContext, useEffect, useState } from 'react';
import type { FileType } from '../../types/apiTypes';
import { FilePreview } from '../../components/File/FilePreview';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { UserButton } from '../../components/ui/Buttons/UserButton';
import { AuthButtons } from '../../components/ui/Buttons/AuthButtons';

export const ShareFilePage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const fileToken = params.token || '';

  const { token } = useContext(AuthContext);
  const [fileData, setFileData] = useState<FileType | null>(null);

  const { getData } = useApi(token);

  const getFileData = useCallback(async () => {
    try {
      const data = await getData(`/s/${fileToken}`);

      console.log(data);

      if (data) {
        setFileData(data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [fileToken, setFileData, getData]);

  useEffect(() => {
    getFileData();
  }, []);

  if (!fileData) return;

  return (
    <main>
      <div className="share-page">
        <header className="share-header-container">
          <div className="user-actions">
            {token ? (
              <button
                type="button"
                className="btn btn-circle"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => navigate('/')}
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
            ) : (
              ''
            )}
            <div className="file-info">
              <span style={{ fontSize: '20px', fontWeight: '600' }}>
                {fileData?.original_name.split('.')[0]}
              </span>
              <small>
                {fileData?.original_name.split('.').pop()?.toUpperCase()} •{' '}
                {fileData?.size ? (fileData?.size / 1024 / 1024).toFixed(2) : undefined} MB
              </small>
            </div>
          </div>
          <div className="user-actions">{token ? <UserButton /> : <AuthButtons />}</div>
        </header>
        <div className="share-content-container">
          {fileData.description ? (
            <div className="description-container">
              <div className="description-field">
                <span
                  style={{
                    marginBottom: '.5rem',
                  }}
                >
                  Описание:
                </span>
                <span>{fileData.description}</span>
              </div>
            </div>
          ) : (
            ''
          )}
          <div className="share-preview">
            <FilePreview url={fileData.url} name={fileData.original_name} />
          </div>
        </div>
      </div>
    </main>
  );
};
