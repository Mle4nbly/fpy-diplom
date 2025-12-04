import type { FileType } from "../../types/apiTypes";
import { FileListCard } from "./FileCard/FileListCard";

export interface FilesListProps {
  files: FileType[],
  onDelete: (id: number) => void,
  onEdit: (id: number, newName: string, description: string) => void,
  onDownload: (id: number, filename: string) => void
}

export const FilesList = ({files, onDelete, onDownload, onEdit}: FilesListProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Имя файла</th>
          <th>Дата</th>
          <th>Размер</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <FileListCard
            key={file.id}
            id={file.id}
            path={file.file}
            name={file.name}
            description={file.description}
            size={file.size}
            uploadedAt={file.uploaded_at}
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