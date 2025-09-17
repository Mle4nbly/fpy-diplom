import { useEffect, useState } from "react"
import { FileManager } from "../components/File/FileManager"
import { Headers } from "../layouts/Headers"
import { useSearchParams } from "react-router-dom"
import { useApi } from "../hooks/useApi"

export const MainPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q');

  const token = localStorage.getItem('token') || null

  const [view, setView] = useState<'list' | 'grid'>('list');
  const [isAuth, setIsAuth] = useState(() => {
    return token ? true : false
  });

  const { sendData } = useApi('/files/', token ? token : undefined)

  useEffect(() => {
  }, [])

  const handleSearch = (newQuery: string) => {
    setSearchParams({
      q: newQuery
    })
  }

  const handleFileUpload = (file: File) => {
    const formData = new FormData()
    formData.append("file", file)

    
  }

  const handleLogout = () => {
    setIsAuth(false)
  }

  const handleLogin = () => {
    setIsAuth(true)
  }

  const handleRegister = () => {
    console.log('registration')
  }

  return (
    <>
      <Headers
        isAuth={isAuth}
        view={view}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onRegister={handleRegister}
        onSearch={handleSearch}
        onToggleView={setView}
        onFileSelect={handleFileUpload}
      />
      <FileManager query={query} view={view}/>
    </>
  )
}