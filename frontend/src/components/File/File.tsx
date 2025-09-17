export type DataType = {
  id?: number,
  name: string,
  size: number,
  path: string
}

export const File = ({ name, size, path }: DataType) => {
  return (
    <div>
      <strong>{name}</strong>
      <span className="ms-2 text-muted">{size} KB | to {path}</span>
    </div>
  )
}