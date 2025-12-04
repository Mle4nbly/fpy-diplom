import { useContext, type ReactNode } from "react";
import { FilesContext } from "./FilesContext";
import { useUserFiles } from "../../hooks/useUserFiles";
import { AuthContext } from "../AuthContext/AuthContext";

export const FileProvider = ({children}: {children: ReactNode}) => {
  const {token} = useContext(AuthContext)

  const {files, loading, error, uploadFile, getFilesList, deleteFile, editFile, downloadFile} = useUserFiles(token)

  return (
    <FilesContext.Provider value={{files, loading, error, uploadFile, getFilesList, deleteFile, editFile, downloadFile}}>
      {children}
    </FilesContext.Provider>
  )
}