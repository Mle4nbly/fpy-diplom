import { useState } from "react"

export const SearchForm = () => {
  const [value, setValue] = useState('');

  return (
    <form className="d-flex ms-3">
      <input
        type="text"
        className="form-control"
        placeholder="Поиск файлов..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  )
}