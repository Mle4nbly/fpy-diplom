import { File, type DataType } from "./File"

export interface FileListProps {
  data: DataType[]
}

export const FileList = ({ data }: FileListProps) => {
  return (
    <>
      {data.map(() => (
        <File />
      ))}
    </>
  )
}