import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { form, required, FormField, email, minLength } from '@angular/forms/signals';
import { AuthService } from '../../common/Services/AuthService';
import { Router } from '@angular/router';

interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone_number: string;
}

@Component({
  selector: 'app-register-page',
  imports: [FormField],
  templateUrl: './RegisterPage.html',
  styleUrl: './RegisterPage.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPage { 

  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  errorMessage = signal('');

  registerModel = signal<RegisterForm>({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    phone_number: ''
  });

  registerForm = form(this.registerModel, path=>{
    required(path.first_name, {message: "First Name is required"}),
    required(path.last_name, {message: "Last Name is required"});
    required(path.email, {message:"Email is required"}),
    email(path.email, {message: "Email is invalid"}),
    required(path.password, {message: "Password is required"}),
    minLength(path.password, 5, {message: "Password should have more than 5 characters"})
    required(path.phone_number, {message:"Phone number is required"})
  });

  createUser(event: Event){
    event.preventDefault();

    const {first_name, last_name, email, password, phone_number} = this.registerModel();

    if(this.registerForm().invalid()){
      return;
    }

    this.authService.Register(first_name, last_name, email, password, phone_number).subscribe({
      next: ()=> {
        this.router.navigateByUrl('/properties?page=1&homestatus=FOR_SALE');
      },
      error: (err)=> {
        this.errorMessage.set(err.error.errors)
      }
    });
    console.log(this.registerModel());
  }


}
