import { Routes } from '@angular/router';
import { AutheGuard } from './_authe/authe.guard';

export const AppRoutes:Routes=[
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home',
        
    },
    {
        path:'login',
        loadChildren:()=>import('./Component/login/login.module').then(x=>x.LoginModule),
        
    },
    {
        path:'home',
        loadChildren:()=>import('./Component/home/home.module').then(x=>x.HomeModule),
       
    }
];