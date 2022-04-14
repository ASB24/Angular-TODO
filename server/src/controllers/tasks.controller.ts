/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { CreateFolderDto, CreateFolderDtoNo } from '@/dtos/folder.dto';
import { CreateTaskDto, CreateTaskDtoNo } from '@/dtos/tasks.dto';
import { Task } from '@/interfaces/tasks.interface';
import { Folder } from '@/interfaces/tasks.interface';
import TodoService from '@/services/todo.service';

class TasksController {
  public todoService = new TodoService();

  public getFolders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = String(req.params.id)
      const findAllFoldersData: Folder[] = await this.todoService.findAllFolders(id);

      res.status(200).json({ data: findAllFoldersData, message: 'Folders have been fetched' });
    } catch (error) {
      next(error);
    }
  };
  public getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id)
      const findAllTasksData: Task[] = await this.todoService.findAllTasks(id);

      res.status(200).json({ data: findAllTasksData, message: 'Tasks have been fetched' });
    } catch (error) {
      next(error);
    }
  };

  public createFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folderData: CreateFolderDtoNo = req.body;
      const createFolderData: Folder = await this.todoService.createFolder(folderData, folderData.user_id);

      res.status(200).json({ data: createFolderData, message: 'Folder created successfully' });
    } catch (error) {
      next(error);
    }
  };
  public createTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData: CreateTaskDtoNo = req.body;
      const createTaskData: Task = await this.todoService.createTask(taskData);

      res.status(200).json({ data: createTaskData, message: 'Task created successfully' });
    } catch (error) {
      next(error);
    }
  };

  public updateFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folderData: CreateFolderDto = req.body;
      const updateFolderData: Folder = await this.todoService.updateFolder(folderData);

      res.status(200).json({ data: updateFolderData, message: `Folder: ${folderData.id} updated successfully` });
    } catch (error) {
      next(error);
    }
  };
  public updateTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskData: CreateTaskDto = req.body;
      const updateTaskData: Task = await this.todoService.updateTask(taskData);

      res.status(200).json({ data: updateTaskData, message: `Task: ${taskData.id} updated successfully` });
    } catch (error) {
      next(error);
    }
  };

  public deleteFolder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const folderId = Number(req.params.id);
      const deleteFolderData: Folder = await this.todoService.deleteFolder(folderId);

      res.status(200).json({ data: deleteFolderData, message: `${deleteFolderData.name} folder deleted successfully` });
    } catch (error) {
      next(error);
    }
  };
  public deleteTask = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const taskId = Number(req.params.id);
      const deleteTaskData: Task = await this.todoService.deleteTask(taskId);

      res.status(200).json({ data: deleteTaskData, message: `${deleteTaskData.description} deleted successfully` });
    } catch (error) {
      next(error);
    }
  };
}

export default TasksController;
