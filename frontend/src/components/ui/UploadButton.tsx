import { useRef } from "react"

export interface UploadButtonProps {
  onFileSelect: (file: File) => void
}

export const UploadButton = ({ onFileSelect }: UploadButtonProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleClick = () => {
    fileInputRef.current?.click();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0])
    }
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        onClick={handleClick}
        title="Загрузить файл"
      >
        +
      </button>
      <input 
        type="file"
        ref={fileInputRef} 
        onChange={handleChange}
        style={{ display: "none" }}
      />
    </>
  )
}