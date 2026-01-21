import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  signal,
  viewChild
} from '@angular/core';
import { AuthService } from '../../common/Services/AuthService';
import { Router, RouterLink } from "@angular/router";
import { NgTemplateOutlet } from '@angular/common';
import { DesignService } from '../../common/Services/DesignService';
import { LucideAngularModule, MenuIcon, XIcon } from "lucide-angular";


@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, NgTemplateOutlet, LucideAngularModule],
  templateUrl: './NavBar.html',
  styleUrl: './NavBar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBar {

  authService = inject(AuthService);
  designService = inject(DesignService);
  router = inject(Router);

  isProfileOpen = signal(false);
  isMenuOpen = signal<boolean>(false);

  isMobile = computed(() => this.designService.smallScreen());
  isAuthenticated = computed(() => this.authService.isLoggedIn());
  user = computed(() => this.authService.User());

  userDropDown = viewChild<ElementRef>('profileContainer');

  openProfileMenu() {
    this.isProfileOpen() ? this.isProfileOpen.update(() => !!false) : this.isProfileOpen.update(() => !false);
  }

  openMobileMenu() {
    this.isMenuOpen() ? this.isMenuOpen.update(() => !!false) : this.isMenuOpen.update(() => !false);
  }

  closeMenujiji(){
    this.isProfileOpen.update(()=> false);
  }

  // @HostListener('document:click', ['$event'])
  // onClickDocument(event: MouseEvent){
  //   const element = this.userDropDown()?.nativeElement;
  //   if(!element.contains(event.target)){
  //     this.closeMenujiji();
  //   }
  // }

  Logout() {
    this.authService.Logout().subscribe({
      next: () => {
        this.authService.deleteUserData(),
          this.isProfileOpen.update(() => false),
          this.router.navigateByUrl('/');
      },
      error: (err) => console.log(err)
    })
  }

  //icons
  menuIcon = MenuIcon;
  xIcon = XIcon;

  //nav bar links
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
        homestatus: "FOR_SALE"
      }
    },
    {
      path: '/about',
      title: "Sobre nosotros"
    }
  ]

}

