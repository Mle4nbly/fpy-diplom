import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { ViewTypeContext } from '../contexts/ViewTypeContext/ViewTypeContext';
import { SortingToggler } from '../features/files/controls/SortingToggler';
import { FileBrowser } from '../features/files/views/FilesBrowser';
import { FileUploadButton } from '../features/files/controls/FileUploadButton';
import { useFilesData } from '../shared/hooks/useFilesData';

export const AdminFilesManagerPage = () => {
  const params = useParams();
  const username = params.username || undefined;

  const { token } = useContext(AuthContext);
  const { viewType } = useContext(ViewTypeContext);
  const { files, uploadFile, deleteFile, editFile, downloadFile } = useFilesData(token, username);

  return (
    <section className="page-content-section">
          <div className="title-container">
            <h3 className="title">Все файлы</h3>
          </div>
          <header className="header-container">
            <FileUploadButton onUpload={uploadFile} />
            <SortingToggler />
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