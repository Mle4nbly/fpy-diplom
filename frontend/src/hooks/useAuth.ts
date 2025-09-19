import { useState } from "react"

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem('token') ? true : false;
  });

  const register = async (username: string, password: string, email: string, name: string) => {
    const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password, email, full_name: name}),
    })

    if (!response.ok) throw new Error('Ошибка регистрации')

    const data = await response.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    setIsAuth(true)
  }

  const login = async (username: string, password: string) => {
    const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password}),
    });

    if (!response.ok) throw new Error('Ошибка авторизации');

    const data = await response.json()
    localStorage.setItem('token', data.token)
    localStorage.setItem('username', data.username)
    setIsAuth(true);
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('username')
    setIsAuth(false)
  }

  return {isAuth, login, logout, register};
}