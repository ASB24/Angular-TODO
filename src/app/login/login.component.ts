import { Component, Input, OnInit } from '@angular/core';
import { RequestsService } from '../requests.service';
import { User } from 'src/todo-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Input() id!: string
  @Input() pass!: string

  resultUser : User = {} as User
  changeDir : string = ""

  constructor(private api : RequestsService, private router : Router) {
  }

  ngOnInit(): void {
    this.api.setSessionUser("")
  }

  logIn(){
    this.api.getUser(this.id).then( response => {
      let found : User = response.data
      if(found.id == this.id && found.pass == found.pass){
        this.api.setSessionUser(found.id)
        console.log(response.message)
        this.router.navigate(['todo'])
      }
    }).catch(err => {
      alert("Credentials are incorrect")
    })
  }

  signUp(){
    this.api.getUser(this.id).then( response => {
      alert("User already exists")
    }).catch(err => {
      this.api.createUser({
        id: this.id,
        pass: this.pass
      }).then(response => {
        console.log(response.message)
        alert('User created successfully!')
        this.router.navigate(['login'])
      })
    })
  }

}
