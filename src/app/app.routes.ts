import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'asana',
        loadChildren: () => import('./modules/asana/asana.module').then(mod => mod.AsanaModule)
    }
];
