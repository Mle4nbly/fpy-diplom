import { useState } from "react"

export interface SearchFormProps {
  onSearch: (newQuery: string) => void
}

export const SearchForm = ({ onSearch }: SearchFormProps) => {
  const [value, setValue] = useState('');

  return (
    <form onSubmit={() => onSearch(value)}>
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
      <button type="submit">Поиск</button>
    </form>
  )
}