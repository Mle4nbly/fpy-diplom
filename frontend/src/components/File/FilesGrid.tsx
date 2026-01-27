import type { FileType } from '../../types/apiTypes';
import { FileGridCard } from './FileCard/FileGridCard';

export interface FilesGridProps {
  files: FileType[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newName: string, description: string) => void;
  onDownload: (id: number, filename: string) => void;
}

export const FilesGrid = ({ files, onDelete, onEdit, onDownload }: FilesGridProps) => {
  return (
    <div className="grid-container">
      {files.map((file) => (
        <FileGridCard
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
    </div>
  );
};
