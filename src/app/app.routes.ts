import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/home/home.component').then(c => c.HomeComponent),
        data: { title: 'ITSP - Instituto Técnico São Paulo' }
    },
    {
        path: 'cursos',
        children: [
            {
                path: '',                
                loadComponent: () => import('./components/cursos/cursos.component').then(c => c.CursosComponent),
                data: { title: 'Cursos | ITSP' }
            },
            {
                path: ':nomeCurso',
                loadComponent: () => import('./components/cursos/curso/curso.component').then(c => c.CursoComponent)
            }
        ]
    },
    {
        path: 'contato',
        loadComponent: () => import('./components/contato/contato.component').then(c => c.ContatoComponent),
        data: { title: 'Contato | ITSP' }
    },
    {
        path: 'sobre-nos',
        loadComponent: () => import('./components/sobre-nos/sobre-nos.component').then(c => c.SobreNosComponent),
        data: { title: 'Sobre Nós | ITSP' }
    },
    {
        path: 'matricula',
        loadComponent: () => import('./components/matricula/matricula.component').then(c => c.MatriculaComponent),
        data: { title: 'Matrícula | ITSP' }
    },
    {
        path: 'trabalhe-conosco',
        loadComponent: () => import('./components/trabalhe-conosco/trabalhe-conosco.component').then(c => c.TrabalheConoscoComponent),
        data: { title: 'Trabalhe conosco | ITSP' }
    }
];
