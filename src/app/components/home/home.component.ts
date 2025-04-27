import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HomeCarouselComponent } from './components/carousel/carousel.component';
import { HomeCursosComponent } from './components/cursos/cursos.component';
import { HomeMatriculaComponent } from './components/matricula/matricula.component';
import { HomeFormularioComponent } from './components/formulario/formulario.component';
import { HomeSobreNosComponent } from './components/sobre-nos/sobre-nos.component';
import { HomeMotivoEscolhaComponent } from './components/motivo-escolha/motivo-escolha.component';
import { HomeDepoimentosComponent } from './components/depoimentos/depoimentos.component';
import { HomeSigaNosComponent } from './components/siga-nos/siga-nos.component';

@Component({
    selector: 'app-home',
    imports: [
        CommonModule,
        HomeCarouselComponent,
        HomeCursosComponent,
        HomeMatriculaComponent,
        HomeFormularioComponent,
        HomeSobreNosComponent,
        HomeMotivoEscolhaComponent,
        HomeDepoimentosComponent,
        HomeSigaNosComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
