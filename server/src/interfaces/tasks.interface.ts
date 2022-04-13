/* eslint-disable prettier/prettier */
export interface Task {
  id: number;
  description: string;
  completed: boolean;
  folder_id: number;
}

export interface Folder{
    id: number;
    name: string;
    user_id: string;
}
