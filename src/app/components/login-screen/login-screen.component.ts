import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { browserLocalPersistence, browserSessionPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { Router } from '@angular/router';
import { AuthService } from 'src/app/authentication/auth-service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.component.html',
  styleUrls: ['./login-screen.component.scss']
})
export class LoginScreenComponent implements OnInit {
  loginForm: FormGroup;
  authLoading: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: Auth
  ) { 
    this.loginForm = this.formBuilder.group({
      "email": new FormControl("",[Validators.required, Validators.email]),
      "password": new FormControl("",[Validators.required]),
    })
  }

  get email(){
    return this.loginForm.controls["email"];
  }

  get password(){
    return this.loginForm.controls["password"];
  }

  ngOnInit(): void {
  }

  async submitLogin(){
    if(this.loginForm.valid){
      try {
        await signInWithEmailAndPassword(this.auth, this.email.value, this.password.value)
        this.router.navigate([""])
      } catch (error) {
        console.error(error)
      }
    }
  }
}
