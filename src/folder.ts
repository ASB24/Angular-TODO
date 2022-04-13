import { Task } from "./todo-task";

export interface Folder{
    id: string,
    tasks: Task[]
}