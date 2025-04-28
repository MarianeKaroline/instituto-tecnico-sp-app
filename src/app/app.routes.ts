import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'cursos',
        children: [
            {
                path: ':nomeCurso',
                loadComponent: () => import('./components/curso/curso.component').then(c => c.CursoComponent)
            }
        ]
    },
    {
        path: 'contato',
        loadComponent: () => import('./components/contato/contato.component').then(c => c.ContatoComponent)
    }
];
