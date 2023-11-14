import { FolderInterface } from '@/types/folder';

// Save a list of folders to local storage
export const saveFolders = (folders: FolderInterface[]) => {
  localStorage.setItem('folders', JSON.stringify(folders));
};
