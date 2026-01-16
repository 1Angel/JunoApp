import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { email, form, required, FormField, minLength } from '@angular/forms/signals';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../common/Services/AuthService';

type LoginForm = {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-page',
  imports: [FormField, RouterLink],
  templateUrl: './LoginPage.html',
  styleUrl: './LoginPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage { 

  private service = inject(AuthService);
  private router = inject(Router);

  errorMessage = signal('');

  userModel = signal<LoginForm>({
    email: '',
    password: ''
  });

  loginForm = form(this.userModel, (path)=>{
    required(path.email,{ message: "Email is required"}),
    email(path.email, {message: "Email is invalid"}),

    required(path.password, {message: "Password is required"}),
    minLength(path.password, 5, {message: "Password should be more than 5 characters"})
  });

  LogIn(event: Event){
    event.preventDefault();
    if(this.loginForm().valid()){
      const {email, password} = this.userModel();
      this.service.Login(email, password).subscribe({
        next: ()=> this.router.navigateByUrl('/'),
        error: (err)=>{
          console.log(err)
          this.errorMessage.set(err.error.message)
        }
      })
    }
  }

}
