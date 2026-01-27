import type { FileType } from '../../types/apiTypes';
import { FileListCard } from './FileCard/FileListCard';

export interface FilesListProps {
  files: FileType[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newName: string, description: string) => void;
  onDownload: (id: number, filename: string) => void;
}

export const FilesList = ({ files, onDelete, onDownload, onEdit }: FilesListProps) => {
  return (
    <table className="table">
      <thead>
        <tr className="header-row">
          <th className="cell-container">
            <div className="cell-content">
              <span>Название</span>
            </div>
          </th>
          <th className="cell-container col-uploaded">
            <div className="cell-content">
              <span>Дата добавления</span>
            </div>
          </th>
          <th className="cell-container col-size">
            <div className="cell-content">
              <span>Размер</span>
            </div>
          </th>
          <th className="cell-container col-actions">
            <div className="cell-content cell-content--end">
              <span>Действия</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <FileListCard
            key={file.id}
            id={file.id}
            url={file.url}
            original_name={file.original_name}
            description={file.description}
            size={file.size}
            uploaded_at={file.uploaded_at}
            last_download_at={file.last_download_at}
            share_link={file.share_link}
            status={file.status}
            onDelete={onDelete}
            onDownload={onDownload}
            onEdit={onEdit}
          />
        ))}
      </tbody>
    </table>
  );
};
