import { useRef } from 'react';

export interface UploadButtonProps {
  onUpload: (file: File, fileName: string, description: string) => void;
}

export const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAddFile = () => {
    inputRef.current?.click();
  };

  const handleChangeInputField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      onUpload(file, file.name, '');
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-light btn-text"
        onClick={handleAddFile}
        title="Загрузить файл"
      >
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
        </svg>
        <span>Загрузить</span>
      </button>
      <input className="d-none" type="file" onChange={handleChangeInputField} ref={inputRef} />
    </>
  );
};
