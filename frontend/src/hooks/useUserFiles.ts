import { useCallback, useEffect, useState } from 'react';
import type { FileStatus, FileType } from '../types/apiTypes';
import { useApi } from './useApi';

export const useUserFiles = (token: string | null, username?: string) => {
  const { getData, sendData, downloadData } = useApi(token);

  const [baseUrl, setBaseUrl] = useState(username ? `/files/${username}` : '/files');

  const [files, setFiles] = useState<FileType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (username) {
      setBaseUrl(`/files/${username}`);
    } else {
      setBaseUrl('/files');
    }
  }, [username]);

  const getFilesList = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getData(baseUrl);

      setFiles(data);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, getData, baseUrl]);

  useEffect(() => {
    getFilesList();
  }, [getFilesList]);

  const deleteFile = async (id: number) => {
    try {
      toggleFileStatus(id, 'DELETING');
      const data = await sendData('DELETE', `${baseUrl}/${id}`);

      if (data) {
        setFiles((prev) => prev.filter((f) => f.id !== id));
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      toggleFileStatus(id);
    }
  };

  const editFile = async (id: number, name: string, description: string) => {
    try {
      toggleFileStatus(id, 'EDITING');
      const data = await sendData(
        'PATCH',
        `${baseUrl}/${id}`,
        JSON.stringify({ original_name: name, description }),
      );

      if (data) {
        setFiles((prev) =>
          prev.map((f) => (f.id == id ? { ...f, original_name: name, description } : f)),
        );
      }
    } catch (error: unknown) {
      console.log(error);
    } finally {
      toggleFileStatus(id);
    }
  };

  const uploadFile = async (file: File, fileName: string, description: string) => {
    const formData = new FormData();
    const originalName = `${fileName}`;

    formData.append('file', file);
    formData.append('original_name', originalName);
    formData.append('description', description);

    try {
      const data = await sendData('POST', `${baseUrl}`, formData);

      if (data) setFiles((prev) => [...prev, data]);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  const downloadFile = (id: number, filename: string) => {
    try {
      toggleFileStatus(id, 'DOWNLOADING');
      downloadData(`${baseUrl}/${id}/download`, filename);
    } catch (error: unknown) {
      console.log(error);
    } finally {
      toggleFileStatus(id);
    }
  };

  const toggleFileStatus = (id: number, nextStatus?: FileStatus) => {
    setFiles(
      (prev) =>
        prev?.map((f) => {
          if (id !== f.id) return f;
          if (nextStatus) return { ...f, nextStatus };

          const clone = { ...f };
          delete clone.status;

          return clone;
        }) ?? [],
    );
  };

  return { files, loading, getFilesList, uploadFile, deleteFile, editFile, downloadFile };
};
