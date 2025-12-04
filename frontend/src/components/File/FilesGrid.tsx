import type { FileType } from "../../types/apiTypes";
import { FileGridCard } from "./FileCard/FileGridCard";

export interface FilesGridProps {
  files: FileType[],
  onDelete: (id: number) => void,
  onEdit: (id: number, newName: string, description: string) => void,
  onDownload: (id: number, filename: string) => void
}

export const FilesGrid = ({files, onDelete, onEdit, onDownload}: FilesGridProps) => {
  return (
    <div className="files-grid">
    {files.map((file) => (
        <FileGridCard
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
  </div>
  )
}