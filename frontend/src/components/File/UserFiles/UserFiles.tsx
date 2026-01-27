import { useContext } from 'react';
import { ViewTypeContext } from '../../../contexts/ViewTypeContext/ViewTypeContext';
import { ToggleSortingButtons } from '../../ui/Buttons/ToggleSortingButtons';
import { UploadButton } from '../../ui/Buttons/UploadButton';
import { FileBrowser } from '../FileBrowser';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useUserFiles } from '../../../hooks/useUserFiles';

export const UserFiles = () => {
  const { token } = useContext(AuthContext);
  const { viewType } = useContext(ViewTypeContext);
  // const {files, uploadFile, deleteFile, editFile, downloadFile} = useContext(FilesContext);

  const { files, uploadFile, deleteFile, editFile, downloadFile } = useUserFiles(token);

  return (
    <section className="page-content-section">
      <div className="title-container">
        <h3 className="title">Все файлы</h3>
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
