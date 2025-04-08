import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HomeCarouselComponent } from './carousel/carousel.component';
import { HomeCursosComponent } from './cursos/cursos.component';
import { HomeMatriculaComponent } from './matricula/matricula.component';
import { HomeFormularioComponent } from './formulario/formulario.component';
import { HomeSobreNosComponent } from './sobre-nos/sobre-nos.component';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        HomeCarouselComponent,
        HomeCursosComponent,
        HomeMatriculaComponent,
        HomeFormularioComponent,
        HomeSobreNosComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
