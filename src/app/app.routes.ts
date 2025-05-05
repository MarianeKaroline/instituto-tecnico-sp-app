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
                path: '',                
                loadComponent: () => import('./components/cursos/cursos.component').then(c => c.CursosComponent),
            },
            {
                path: ':nomeCurso',
                loadComponent: () => import('./components/cursos/curso/curso.component').then(c => c.CursoComponent)
            }
        ]
    },
    {
        path: 'contato',
        loadComponent: () => import('./components/contato/contato.component').then(c => c.ContatoComponent)
    },
    {
        path: 'sobre-nos',
        loadComponent: () => import('./components/sobre-nos/sobre-nos.component').then(c => c.SobreNosComponent)
    }
];
