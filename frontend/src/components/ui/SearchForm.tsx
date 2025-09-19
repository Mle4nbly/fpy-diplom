import { useState } from "react"

export interface SearchFormProps {
  onSearch: (newQuery: string) => void
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={() => onSearch(value)} className="d-flex ms-3">
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