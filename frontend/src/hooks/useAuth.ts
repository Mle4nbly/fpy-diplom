export const useAuth = () => {
  const registerReq = async (username: string, password: string, email: string, name: string) => {
    const response = await fetch('http://127.0.0.1:8000/api/users/register/', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, password, email, full_name: name}),
    })

    if (!response.ok) throw new Error('Ошибка регистрации')
    const data = await response.json()

    return data;
  }

  const loginReq = async (username: string, password: string) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({username, password}),
      });

      if (!response.ok) throw new Error('Ошибка авторизации');
      
      const jsonResp = await response.json();
      console.log(jsonResp);
      return jsonResp;
    } catch (error) {
      console.log(error)
    }
  }

  return {loginReq, registerReq};
}