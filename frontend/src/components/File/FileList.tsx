import type { FileType } from "../../types/FileType";
import { File, type DataType } from "./File"

export interface FileListProps {
  files: FileType[],
  view: 'list' | 'grid'
}

export const FileList = ({ files, view }: FileListProps) => {
  if (view === "grid") {
    return (
      <div className="row">
        {files.map(file => (
          <div className="col-3" key={file.id}>
            <File name={file.original_name} size={file.size} path={file.file} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <ul className="list-group">
      {files.map(file => (
        <li className="list-group-item" key={file.id}>
          <File name={file.original_name} size={file.size} path={file.file} />
        </li>
      ))}
    </ul>
  );
}