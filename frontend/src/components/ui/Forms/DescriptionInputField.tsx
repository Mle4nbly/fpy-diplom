import { useState } from "react"

export interface DescriptionInputFieldProps {
  initValue: string | null,
  onSubmit: (newDescription: string | null) => void,
  onCancel: () => void,
}

export const DescriptionInputField = ({onSubmit, onCancel, initValue}: DescriptionInputFieldProps) => {
  const [value, setValue] = useState(initValue ? initValue : '');

  return (
    <div className="description-field">
      <textarea 
        className="form-control"
        id="description"
        value={value ? value : ''}
        onChange={(e) => {setValue(e.target.value)}}
        placeholder="Введите описание"
      />
      <div className="field-actions">
        <button className="btn-cancel" onClick={onCancel}>Отменить</button>
        <button className="btn-submit" onClick={() => onSubmit(value)} type="submit">Сохранить</button>
      </div>
    </div>
  )
}