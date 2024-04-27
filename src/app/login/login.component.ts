import { Component, OnInit, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HomeComponent } from '../home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HomeComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username="";
  password="";
  errorMsg="";

  constructor(private auth: AuthService, private router: Router) { }
  ngOnInit(): void {
  }

  login(){
    if(this.username.trim().length === 0){
      this.errorMsg = "username is required";
    }
    else if(this.password.trim().length === 0){
      this.errorMsg = "password is required";
    }
    else{
      this.errorMsg = "";
      let res=this.auth.login(this.username, this.password);
      if(res===200){
        this.router.navigate(['/home']);
      }
      else{
        this.errorMsg = "Invalid username or password";
      }
    }
  }
}
