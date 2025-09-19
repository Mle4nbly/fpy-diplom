import { useEffect, useState } from "react"
import { Headers } from "../layouts/Headers"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { useApi } from "../hooks/useApi"
import { FileList } from "../components/File/FilesList"
import type { FileType } from "../types/FileType"

export const MainPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const username = localStorage.getItem('username');
  const token = localStorage.getItem('token') || undefined;
  const { isAuth, logout } = useAuth();

  const [view, setView] = useState<'list' | 'grid'>('list');

  const { data, loading, error, sendData, getData } = useApi<FileType>(token);

  useEffect(() => {
    if (!isAuth) {
      navigate('/auth')
    }

    getData('/files')
  }, [isAuth])

  

  const handleSearch = (newQuery: string) => {
    setSearchParams({
      q: newQuery
    })
  }

  const handleFileUpload = async (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    await sendData("POST", formData, '/files')
    getData('/files')
  }

  const handleFileEdit = async (fileId: string) => {
  
  }

  const handleFileDelete = async (fileId: string) => {
  
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="container bg-light shadow-sm mb-4 h-100">
      <header className="container-header bg-light">
        <Headers
          isAuth={isAuth}
          view={view}
          username={username}
          onLogout={handleLogout}
          onSearch={handleSearch}
          onToggleView={setView}
          onFileSelect={handleFileUpload}
        />
      </header>

      <main className="bg-light">
        <FileList view={view} files={data} loading={loading} error={error}/>
      </main>
    </div>
  );
}