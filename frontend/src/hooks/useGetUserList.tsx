import { useContext, useState } from "react"
import type { FileType } from "../types/apiTypes"
import { useApi } from "./useApi"
import { AuthContext } from "../contexts/AuthContext/AuthContext"

export const useGetFilesList = (user: string) => {
  const {token} = useContext(AuthContext)

  const [files, setFiles] = useState<FileType[] | null>(null)
  const {sendData} = useApi(token)

  const getFiles = async () => {
    const response = await sendData('POST', '/files/by-user', {username: user})

    if (response) setFiles(response)
  }

  return {files};
}