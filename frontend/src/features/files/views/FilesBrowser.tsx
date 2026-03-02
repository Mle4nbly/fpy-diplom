import { FilesListView } from './FilesListView';
import { FilesGridView } from './FilesGridView';
import type { FileType } from '../../../types/apiTypes';

export interface FileBrowserProps {
  viewType: 'LIST' | 'GRID';
  files: FileType[];
  onDelete: (id: number) => void;
  onEdit: (id: number, newName: string, description: string) => void;
  onDownload: (id: number, filename: string) => void;
}

export const FileBrowser = ({
  viewType,
  files,
  onDelete,
  onDownload,
  onEdit,
}: FileBrowserProps) => {
  return (
    <>
      {viewType == 'LIST' ? (
        <FilesListView files={files} onDownload={onDownload} onDelete={onDelete} onEdit={onEdit} />
      ) : (
        <FilesGridView files={files} onDownload={onDownload} onDelete={onDelete} onEdit={onEdit} />
      )}
    </>
  );
};
