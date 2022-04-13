/* eslint-disable prettier/prettier */
import { hash } from 'bcrypt';
import DB from '@databases';
import { CreateFolderDto, CreateFolderDtoNo } from '@/dtos/folder.dto';
import { CreateTaskDto, CreateTaskDtoNo } from '@/dtos/tasks.dto';
import { HttpException } from '@exceptions/HttpException';
import { Folder, Task } from '@/interfaces/tasks.interface';
import { isEmpty } from '@utils/util';
import { FnParam } from '@angular/compiler/src/output/output_ast';
import { create } from 'domain';
import { where } from 'sequelize/types';

class TodoService {

  public folders = DB.Folders;
  public tasks = DB.Tasks;

  public async findAllFolders(id: string): Promise<Folder[]> {
    const allFolders: Folder[] = await this.folders.findAll({where: {user_id: id}});
    return allFolders;
  }

  public async findAllTasks(id: number): Promise<Task[]> {
    const allTasks: Task[] = await this.tasks.findAll({where: {folder_id: id}});
    return allTasks;
  }

  public async createFolder(folderData: CreateFolderDtoNo, user_id: string): Promise<Folder> {
    if (isEmpty(folderData)) throw new HttpException(420, "Folder data provided incorrectly");

    const findFolder: Folder = await this.folders.findOne({ where: { id: folderData.name, user_id: user_id } });
    if (findFolder) throw new HttpException(429, `The folder ${findFolder.name} already exists`);

    const createFolderData: Folder = await this.folders.create({ ...folderData });
    return createFolderData;
  }
  public async createTask(taskData: CreateTaskDtoNo): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(420, "Task data provided incorrectly");

    const createTaskData: Task = await this.tasks.create({ ...taskData });
    return createTaskData;
  }

  public async updateFolder(folderData: CreateFolderDto): Promise<Folder> {
    if (isEmpty(folderData)) throw new HttpException(420, "Folder Data empty");

    const findFolder: Folder = await this.folders.findByPk(folderData.id);
    if (!findFolder) throw new HttpException(429, "Folder not found");

    await this.folders.update({ ...folderData }, { where: { id: folderData.id } });

    const updateFolder: Folder = await this.folders.findByPk(folderData.id);
    return updateFolder;
  }
  public async updateTask(taskData: CreateTaskDto): Promise<Task> {
    if (isEmpty(taskData)) throw new HttpException(420, "Task Data empty");

    await this.tasks.update({ ...taskData }, { where: { id: taskData.id } });

    const updateTask: Task = await this.tasks.findByPk(taskData.id);
    if (!updateTask) throw new HttpException(429, "You're not user");
    return updateTask;
  }

  public async deleteFolder(folder_id: number): Promise<Folder> {
    if (isEmpty(folder_id)) throw new HttpException(420, "Folder data incorrect");

    const findFolder: Folder = await this.folders.findByPk(folder_id);
    if (!findFolder) throw new HttpException(429, "Folder does not exist");

    await this.folders.destroy({ where: { id: folder_id } });

    return findFolder;
  }
  public async deleteTask(taskId: number): Promise<Task> {
    if (isEmpty(taskId)) throw new HttpException(420, "Task data incorrect");

    const findTask: Task = await this.tasks.findByPk(taskId);
    if (!findTask) throw new HttpException(429, "Task not found");

    await this.tasks.destroy({ where: { id: taskId } });

    return findTask;
  }
}

export default TodoService;
