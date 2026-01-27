import { useParams } from 'react-router-dom';
import { UploadButton } from '../../ui/Buttons/UploadButton';
import { ToggleSortingButtons } from '../../ui/Buttons/ToggleSortingButtons';
import { useUserFiles } from '../../../hooks/useUserFiles';
import { FileBrowser } from '../FileBrowser';
import { useContext } from 'react';
import { ViewTypeContext } from '../../../contexts/ViewTypeContext/ViewTypeContext';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';

export const AdminUserFiles = () => {
  const { token } = useContext(AuthContext);

  const params = useParams();
  const username = params.username || '';

  const { viewType } = useContext(ViewTypeContext);

  const { files, uploadFile, deleteFile, editFile, downloadFile } = useUserFiles(token, username);

  return (
    <section className="page-content-section">
      <div className="title-container">
        <h3 className="title">
          Хранилище пользователя <span style={{ color: 'red' }}>{username}</span>
        </h3>
      </div>
      <header className="header-container">
        <UploadButton onUpload={uploadFile} />
        <ToggleSortingButtons />
      </header>
      <div className="content-container">
        {!files?.length ? (
          <div className="info-container">
            <h3 className="title">В хранилище пока нет файлов</h3>
            <span>Чтобы загрузить файл нажмите на кнопку "Загрузить"</span>
          </div>
        ) : (
          <FileBrowser
            viewType={viewType}
            files={files}
            onDelete={deleteFile}
            onEdit={editFile}
            onDownload={downloadFile}
          />
        )}
      </div>
    </section>
  );
};
