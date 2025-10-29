import { createContext } from "react";
import type { FileType } from "../../types/types";

export type FileContextType = {
  files: FileType[] | null,
  loading: boolean,
  error: string | null,
  uploadFile: (file: File, filename: string, description: string | null) => void,
  downloadFile: (id: number, filename: string) => void,
  getFilesList: () => void,
  deleteFile: (id: number) => void,
  editFile: (id: number, newName: string, description: string | null) => void,
}

export const FileContext = createContext<FileContextType>({
  files: [],
  error: '',
  loading: false,
  uploadFile: () => {},
  downloadFile: () => {},
  getFilesList: () => {},
  deleteFile: () => {},
  editFile: () => {},
})