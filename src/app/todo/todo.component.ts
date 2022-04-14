import { Component, Input, OnInit } from '@angular/core';
import { CreateFolderDto, CreateFolderDtoNo } from 'src/dtos/folders.dto';
import { CreateTaskDto, CreateTaskDtoNo } from 'src/dtos/tasks.dto';
import { CreateUserDto } from 'src/dtos/users.dto';
import { User, Task, Folder } from 'src/todo-interfaces';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  folders : Folder[] = []
  tasks : Task[] = []

  _user : string = ""

  @Input() task_desc! : string
  @Input() sel_folder! : string
  @Input() folder_name! : string

  resultFolder : Folder = {} as Folder
  resultTask : Task = {} as Task
  resultUser : User = {} as User

  userToCreate : CreateUserDto = {} as CreateUserDto
  folderToCreate : CreateFolderDtoNo = {} as CreateFolderDtoNo
  taskToCreate : CreateTaskDtoNo = {} as CreateTaskDtoNo

  folderToUpdate : CreateFolderDto = {} as CreateFolderDto
  taskToUpdate : CreateTaskDto = {} as CreateTaskDto

  constructor(private api : RequestsService, private _router : Router) {
    this._user = this.api.getSessionUser()
    this.ngOnInit()
  }

  ngOnInit(): void {
    this.folders = []
    this.tasks = []
    this.getFolders(this._user)
  }

  reloadComponent() {
    let currentUrl = this._router.url;
    this._router.routeReuseStrategy.shouldReuseRoute = () => false;
    this._router.onSameUrlNavigation = 'reload';
    this._router.navigate([currentUrl]);
  }

  getFolders(id: string) : void{
      this.api.getFolders(id).then(
        response => {
          this.folders = response.data as Folder[]
          for(let folder of this.folders){
            this.getTasks(folder.id)
          }
        }).catch(
          err => {
            this._router.navigate(['login'])
          }
        )
    
  }
  getTasks(id: number) : void{
    this.api.getTasks(id).then( response => {
      this.tasks = this.tasks.concat(response.data as Task[])
    })
  }

  addFolder() : void{
    this.folderToCreate.user_id = this._user
    this.folderToCreate.name = this.folder_name
    this.api.createFolder(this.folderToCreate).then(response => {
      this.resultFolder = response.data as Folder
      console.log(response.message)
      this.reloadComponent()
    })
  }
  addTask() : void{
    this.taskToCreate.folder_id = Number(this.sel_folder)
    this.taskToCreate.completed = false
    this.taskToCreate.description = this.task_desc
    this.api.createTask(this.taskToCreate).then(response => {
      this.resultTask = response.data as Task
      console.log(response.message)
      this.reloadComponent()
    })
  }

  updateFolder(folder : Folder) : void{
    this.folderToUpdate = folder
    this.api.updateFolder(this.folderToUpdate).then( response => {
      console.log(response.message)
      this.reloadComponent()
    } )
  }
  updateTask(task : Task) : void{
    this.taskToUpdate = task
    this.api.updateTask(this.taskToUpdate).then( response => {
      console.log(response.message)
      this.reloadComponent()
    } )
  }
  updateTaskState(task : Task) : void{
    this.taskToUpdate = task
    this.taskToUpdate.completed = !this.taskToUpdate.completed
    this.api.updateTask(this.taskToUpdate).then( response => {
      console.log(response.message)
      this.reloadComponent()
    } )
  }

  deleteFolder(id: string) : void{
    this.api.deleteFolder(id).then(response => {
      this.resultFolder = response.data as Folder
      console.log(response.message)
      this.reloadComponent()
    })
  }
  deleteTask(id: number) : void{
    this.api.deleteTask(id.toString()).then(response => {
      this.resultTask = response.data as Task
      console.log(response.message)
      this.reloadComponent()
    })
  }

}
