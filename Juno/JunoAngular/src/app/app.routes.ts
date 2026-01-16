import { Routes } from '@angular/router';
import { HomePage } from './pages/HomePage/HomePage';
import { authGuard } from './common/Guards/Auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: HomePage
    },
    {
        path: 'about',
        loadComponent: ()=> import('./pages/AboutPage/AboutPage').then(x=>x.AboutPage)
    },
    {
        path: 'properties',
        loadComponent: () => import('./pages/PropertiesPage/PropertiesPage').then(x => x.PropertiesPage),
    },
    {
        path: 'home-details/:id',
        loadComponent: () => import('./pages/HomeDetailsPage/HomeDetailsPage').then(x => x.HomeDetailsPage)
    },
    {
        path: 'property/create',
        loadComponent: ()=> import('./pages/CreatePropertyPage/CreatePropertyPage').then(x=>x.CreatePropertyPage)
    },
    {
        path: 'auth',
        children: [
            {
                path: 'register',
                loadComponent: () => import('./pages/RegisterPage/RegisterPage').then(x => x.RegisterPage),
            },
            {
                path: 'login',
                loadComponent: () => import('./pages/LoginPage/LoginPage').then(x => x.LoginPage),
            },
            {
                path: 'profile',
                loadComponent: ()=> import('./pages/ProfilePage/ProfilePage').then(x=>x.ProfilePage),
                canActivate: [authGuard]
            },
            {
                path: 'bookmarks',
                loadComponent: ()=> import('./pages/BookmarksPage/BookmarksPage').then(x=>x.BookmarksPage),
                canActivate: [authGuard]
            },
            {
                path: 'properties',
                loadComponent: ()=> import('./pages/PropertiesCreatedByUserPage/PropertiesCreatedByUserPage').then(x=>x.PropertiesCreatedByUserPage)
            }
        ]
    },
    {
        path: '**',
        loadComponent: ()=> import('./pages/NotFoundPage/NotFoundPage').then(x=>x.NotFoundPage),
        title: "Page Not Found :("
    }
];
