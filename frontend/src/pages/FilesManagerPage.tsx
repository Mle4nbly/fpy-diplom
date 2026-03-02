import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext/AuthContext';
import { ViewTypeContext } from '../contexts/ViewTypeContext/ViewTypeContext';
import { useFilesData } from '../shared/hooks/useFilesData';
import { FileUploadButton } from '../features/files/controls/FileUploadButton';
import { SortingToggler } from '../features/files/controls/SortingToggler';
import { FileBrowser } from '../features/files/views/FilesBrowser';

export const FilesManagerPage = () => {
  const { token } = useContext(AuthContext)
  const { viewType } = useContext(ViewTypeContext);

  const { files, uploadFile, downloadFile, deleteFile, editFile } = useFilesData(token)

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
