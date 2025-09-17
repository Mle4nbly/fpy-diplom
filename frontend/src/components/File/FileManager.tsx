import { useEffect, useState } from "react"
import { useApi } from "../../hooks/useApi"
import { FileList } from "./FileList"
import type { FileType } from "../../types/FileType"

export interface FileManagerProps {
  query: string | null,
  view: 'list' | 'grid'
}

export const FileManager = ({query, view}: FileManagerProps) => {
  const token = localStorage.getItem("token") || undefined
  const {data: files, loading, error} = useApi<FileType>('/files/', token)

  if (loading) return <div>Loading...</div>
  if (error || !files) return <div>Ошибка загрузки файлов</div>

  return (
    <section className="file-manager">
        <FileList files={files} view={view}/>
    </section>
  )
}