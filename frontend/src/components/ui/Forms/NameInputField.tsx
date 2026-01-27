import { useEffect, useRef, useState } from 'react';

export interface NameInputFieldProps {
  initValue: string;
  onCancel: () => void;
  onRename: (value: string) => void;
}

export const NameInputField = ({ initValue, onCancel, onRename }: NameInputFieldProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState(initValue);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    inputRef.current?.focus();

    const dotIndex = inputRef.current?.value.lastIndexOf('.');
    if (dotIndex && dotIndex !== -1) {
      inputRef.current?.setSelectionRange(0, dotIndex);
    } else {
      inputRef.current?.select();
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (value == initValue) {
      onCancel();
      return;
    }

    try {
      setIsSaving(true);
      onRename(value);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        name="name"
        type="text"
        ref={inputRef}
        value={value}
        placeholder="Новое имя файла..."
        disabled={isSaving}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => {
          if (!isSaving) onCancel();
        }}
      />
    </form>
  );
};
