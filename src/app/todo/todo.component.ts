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

  foldersToDelete : string[] = []
  tasksToDelete : string[] = []

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
    this.folders = []
    this.tasks = []
    this.getFolders(this._user)
    this.tasks = this.tasks.splice(0, Math.ceil(this.tasks.length / 2) ) //First half since pre-flight populates tasks twice
  }

  ngOnInit(): void {
    
  }

  logOut(){
    this._router.navigate(['login'])
  }
  saveChanges() : void{
    for(let folder of this.folders){
      this.api.updateFolder(folder).catch(err => {
        console.log(err)
      })
    }
    for(let task of this.tasks){
      this.api.updateTask(task).catch(err => {
        console.log(err)
      })
    }
    for(let del_folder of this.foldersToDelete){
      this.api.deleteFolder(del_folder).catch(err => {
        console.log(err)
      })
    }
    for(let del_task of this.tasksToDelete){
      this.api.deleteTask(del_task).catch(err => {
        console.log("folder deleted.")
      })
    }
    alert("Changes saved successfully")
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

    if(this.folder_name === "") return

    this.folderToCreate.user_id = this._user
    this.folderToCreate.name = this.folder_name

    this.api.createFolder(this.folderToCreate).then(response => {
      this.folders.unshift( response.data as Folder )
      console.log(response.message)
    })

    this.folder_name = ""
  }
  addTask(folder_id : number) : void{

    let desc : string = (<HTMLInputElement>document.getElementById(folder_id.toString())).value

    if(desc === "") return

    this.taskToCreate.description = desc
    this.taskToCreate.completed = false
    this.taskToCreate.folder_id = folder_id

    this.api.createTask(this.taskToCreate).then(response => {
      this.tasks.push(response.data as Task)
      console.log(response.message)
    })

    let temp : HTMLInputElement = document.getElementById(folder_id.toString()) as HTMLInputElement
    temp.value = ''
  }

  updateFolder(folder : Folder) : void{

    if(folder.name === "") return

    this.folders.find((compare, index) => {
      if(compare.id === folder.id){
        this.folders[index] = folder
        return
      }
    })
  }
  updateTask(task : Task) : void{

    if(task.description === "") return

    this.tasks.find((compare, index) => {
      if(compare.id === task.id){
        this.tasks[index].description = (<HTMLInputElement>document.getElementById(task.id.toString())).value
        return
      }
    })
  }
  updateTaskState(task : Task) : void{
    this.tasks.find((compare, index) => {
      if(compare.id === task.id){
        console.log(compare.id)
        this.tasks[index].completed = !this.tasks[index].completed
        return
      }
    })
  }

  deleteFolder(id: number) : void{
    this.folders.find((compare, index) => {
      if( compare.id === id ){
        this.foldersToDelete.push(compare.id.toString())
        this.folders.splice(index,1)
        return
      }
    })
  }
  deleteTask(id: number) : void{
    this.tasks.find((compare, index) => {
      if( compare.id === Number(id) ){
        this.tasksToDelete.push(compare.id.toString())
        this.tasks.splice(index,1)
        return
      }
    })
  }

}
