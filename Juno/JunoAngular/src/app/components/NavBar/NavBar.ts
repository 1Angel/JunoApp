import { ChangeDetectionStrategy, Component, computed, effect, HostListener, inject, signal } from '@angular/core';
import { AuthService } from '../../common/Services/AuthService';
import { Router, RouterLink } from "@angular/router";
import { NgTemplateOutlet, NgComponentOutlet } from '@angular/common';
import { DesignService } from '../../common/Services/DesignService';
import { LucideAngularModule, MenuIcon, XIcon } from "lucide-angular";


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, NgTemplateOutlet, NgComponentOutlet, LucideAngularModule],
  templateUrl: './NavBar.html',
  styleUrl: './NavBar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {

  authService = inject(AuthService);
  designService = inject(DesignService);
  router = inject(Router);

  isMobile = computed(()=> this.designService.smallScreen());
  isAuthenticated = computed(() => this.authService.isLoggedIn());
  user = computed(() => this.authService.User());
  isProfileOpen = signal(false);
  isMenuOpen = signal<boolean>(false);

  navLinks = [
    {
      path: '/',
      title: "Inicio"
    },
    {
      path: '/properties',
      title: "Buscar",
      querys: {
        page: '1',
        homestatus: "FOR_RENT"
      }
    },
    {
      path: '/about',
      title: "Sobre nosotros"
    }
  ]

  openProfileMenu(){
    this.isProfileOpen() ? this.isProfileOpen.update(()=> !!false) : this.isProfileOpen.update(()=> !false);
  }

  openMobileMenu(){
    this.isMenuOpen() ? this.isMenuOpen.update(()=> !!false) : this.isMenuOpen.update(()=> !false);
  }

  // @HostListener('document:click', ['$event'])
  // onCloseProfile(event: MouseEvent){
  //   const target = event.target as HTMLElement;
  //   const clickInside = target.closest('.absolute');
  //   if(!clickInside){
  //     this.isProfileOpen.update(()=> false);
  //   }

  // }

  constructor(){
    effect(()=> {
      console.log(`${this.isProfileOpen()} esta cambiando`)
    })
  }

  Logout(){
    this.authService.Logout().subscribe({
      next: ()=> {
        this.authService.deleteUserData(),
        this.isProfileOpen.update(()=> false),
        this.router.navigateByUrl('/');
      },
      error: (err)=> console.log(err)
    })
  }


  //icons
  menuIcon = MenuIcon;
  xIcon = XIcon;
}
