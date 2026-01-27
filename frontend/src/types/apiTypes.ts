export type FileStatus = 'DOWNLOADING' | 'DELETING' | 'EDITING';

export interface FileType {
  id: number;
  url: string;
  original_name: string;
  description: string;
  size: number;
  uploaded_at: string;
  last_download_at: string;
  share_link: string;
  status?: FileStatus;
}

export interface UserType {
  id: number;
  username: string;
  is_admin: boolean;
  files_count: number;
  total_size: number;
}
