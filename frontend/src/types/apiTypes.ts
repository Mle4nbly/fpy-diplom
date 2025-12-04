export type FileStatus = "DOWNLOADING" | "DELETING" | "EDITING";

export interface FileType {
  id: number,
  file: string,
  name: string,
  description: string,
  size: number
  uploaded_at: string,
  status?: FileStatus,
}

export interface UserType {
  id: number,
  username: string,
  is_admin: boolean,
  files_count: number,
  total_size: number
}