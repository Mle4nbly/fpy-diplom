export const getFileType = (filename: string): string => {
  const ext = filename.split('.').pop()?.toLowerCase();

  if (!ext) return 'other';

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) return 'image';
  if (['pdf'].includes(ext)) return 'pdf';
  if (['doc', 'docx'].includes(ext)) return 'word';
  if (['xls', 'xlsx'].includes(ext)) return 'excel';
  if (['zip', 'rar', '7z'].includes(ext)) return 'archive';
  if (['json', 'py', 'js', 'jsx', 'tsx', 'ts', 'cpp', 'css', 'html'].includes(ext)) return 'code';

  return 'other';
};
