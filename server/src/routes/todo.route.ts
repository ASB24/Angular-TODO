/* eslint-disable prettier/prettier */
import { Router } from 'express';
import TasksController from '@/controllers/tasks.controller';
import { CreateFolderDto, CreateFolderDtoNo } from '@/dtos/folder.dto';
import { CreateTaskDto, CreateTaskDtoNo } from '@/dtos/tasks.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class TasksRoute implements Routes {
  public path = '/todo';
  public router = Router();
  public taskController = new TasksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/folders/get/:id`, this.taskController.getFolders);
    this.router.get(`${this.path}/tasks/get/:id(\\d+)`, this.taskController.getTasks);

    this.router.post(`${this.path}/folders`, validationMiddleware(CreateFolderDtoNo, 'body'), this.taskController.createFolder);
    this.router.post(`${this.path}/tasks`, validationMiddleware(CreateTaskDtoNo, 'body'), this.taskController.createTask);

    this.router.put(`${this.path}/folders/`, validationMiddleware(CreateFolderDto, 'body', true), this.taskController.updateFolder);
    this.router.put(`${this.path}/tasks/`, validationMiddleware(CreateTaskDto, 'body', true), this.taskController.updateTask);

    this.router.delete(`${this.path}/folders/:id(\\d+)`, this.taskController.deleteFolder);
    this.router.delete(`${this.path}/tasks/:id(\\d+)`, this.taskController.deleteTask);
  }
}

export default TasksRoute;
