import { Injectable } from '@angular/core';
import { CreateFolderDto, CreateFolderDtoNo } from '../dtos/folders.dto';
import { CreateTaskDto, CreateTaskDtoNo } from '../dtos/tasks.dto';
import { CreateUserDto } from '../dtos/users.dto';
import axios from 'axios';
import { User } from 'src/todo-interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {
  server_route : string = "http://localhost:3000"
  folders_route : string = this.server_route+"/todo/folders/"
  tasks_route : string = this.server_route+"/todo/tasks/"
  users_route : string = this.server_route+"/users/"

  session_user: string

  constructor() {
    this.session_user = ""
  }

  setSessionUser(id: string){
    this.session_user = id
  }
  getSessionUser() : string{
    return this.session_user
  }

  async getUser(id: string) : Promise<HttpResponse>{
    return (await axios.get(this.users_route + id)).data
  }
  async getFolders(id: string) : Promise<HttpResponse>{
    return (await axios.get(this.folders_route+"get/"+id)).data
  }
  async getTasks(id: number) : Promise<HttpResponse>{
    return (await axios.get(this.tasks_route+"get/"+id.toString())).data
  }

  async createUser(userToCreate : CreateUserDto) : Promise<HttpResponse>{
    return (await axios.post(this.users_route, userToCreate)).data
  }
  async createFolder(folderToCreate : CreateFolderDtoNo) : Promise<HttpResponse>{
    return (await axios.post(this.folders_route, folderToCreate)).data
  }
  async createTask(taskToCreate : CreateTaskDtoNo) : Promise<HttpResponse>{
    return (await axios.post(this.tasks_route, taskToCreate)).data
  }

  async updateUser(userToUpdate : CreateUserDto) : Promise<HttpResponse>{
    return (await axios.put(this.users_route, userToUpdate)).data
  }
  async updateFolder(folderToUpdate : CreateFolderDto) : Promise<HttpResponse>{
    return (await axios.put(this.folders_route, folderToUpdate)).data
  }
  async updateTask(taskToUpdate : CreateTaskDto) : Promise<HttpResponse>{
    return (await axios.put(this.tasks_route, taskToUpdate)).data
  }

  async deleteFolder(id: string) : Promise<HttpResponse>{
    return (await axios.delete(this.folders_route+id)).data
  }
  async deleteTask(id: string) : Promise<HttpResponse>{
    return (await axios.delete(this.tasks_route+id)).data
  }

}

export interface HttpResponse{
  data: any;
  message: string;
}