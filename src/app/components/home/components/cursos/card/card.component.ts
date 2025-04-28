import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CursoListaModel } from '../../../../../common/domain/models/curso/curso-lista.model';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-cursos-card',
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule
    ],
    templateUrl: './card.component.html',
})
export class HomeCursosCardComponent implements OnInit {

    public curso = input<CursoListaModel>();

    constructor() { }

    ngOnInit() {
    }

}
