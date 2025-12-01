import { createContext } from "react";
import type { FileType } from "../../types/apiTypes";

export type FilesContextType = {
  files: FileType[] | null,
  loading: boolean,
  error: string | null,
  uploadFile: (file: File, filename: string, description: string) => void,
  downloadFile: (id: number, filename: string) => void,
  getFilesList: () => void,
  deleteFile: (id: number) => void,
  editFile: (id: number, newName: string, description: string | null) => void,
}

export const FilesContext = createContext<FilesContextType>({
  files: [],
  error: '',
  loading: false,
  uploadFile: () => {},
  downloadFile: () => {},
  getFilesList: () => {},
  deleteFile: () => {},
  editFile: () => {},
})