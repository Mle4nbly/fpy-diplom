import type { FileType } from "../../types/FileType";
import { FileGridView } from "./FileGridView";
import { FileListView } from "./FileListView"

export interface FileListProps {
  files: FileType[] | null,
  view: 'list' | 'grid',
  loading: boolean,
  error: string | null,
}

export const FileList = ({ files, view, loading, error }: FileListProps) => {
  
  if (loading) return <div>Loading...</div>
  if (error || !files) return <div>Ошибка</div>
  if (!files.length) return (
    <div className="d-flex flex-column">
      <span>Здесь пока нет файлов, но вы можете их загрузить.</span>
    </div> 
  )

  return (
    <div className="d-flex flex-column">
      <h3 className="title">Все файлы</h3>

      {view === "grid" ? (
        <div className="files-grid">
          {files.map(file => (
            <FileGridView key={file.id} path={file.file} name={file.original_name} size={file.size} uploadedAt={file.uploaded_at}/>
          ))}
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>Название</th>
                <th>Размер</th>
                <th>Изменено</th>
              </tr>
            </thead>
            <tbody className="table-light">
              {files.map(file => (
                <FileListView key={file.id} path={file.file} name={file.original_name} size={file.size} uploadedAt={file.uploaded_at}/>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}