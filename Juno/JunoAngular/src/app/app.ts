import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBar } from "./components/NavBar/NavBar";
import { AuthService } from './common/Services/AuthService';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBar, LucideAngularModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  ngOnInit(): void {
    this.authService.CurrentUser().subscribe({
      next: (res)=> {
        this.authService.setAuthentication(res)
      },
      error: ()=> this.authService.deleteUserData()
    });
  }

  authService = inject(AuthService);

  protected readonly title = signal('JunoAngular');
}
