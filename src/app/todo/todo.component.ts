import { Component, OnInit } from '@angular/core';
import { User } from 'src/user';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  user: User = {username: '', password: ''}

  constructor() { }

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void{
    this.user = {username: 'admin', password: '23 8451'}
  }

}
