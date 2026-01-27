import { useState } from 'react';

export interface DescriptionInputFieldProps {
  initValue: string | null;
  onSubmit: (newDescription: string) => void;
  onCancel: () => void;
}

export const DescriptionInputField = ({
  onSubmit,
  onCancel,
  initValue,
}: DescriptionInputFieldProps) => {
  const [value, setValue] = useState(initValue ? initValue : '');

  return (
    <div className="description-field">
      <textarea
        className="form-control"
        id="description"
        value={value ? value : ''}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder="Введите описание"
      />
      <div className="field-actions">
        <button className="btn btn-text btn-light" onClick={onCancel}>
          Отменить
        </button>
        <button className="btn btn-text btn-dark" onClick={() => onSubmit(value)} type="submit">
          Сохранить
        </button>
      </div>
    </div>
  );
};
