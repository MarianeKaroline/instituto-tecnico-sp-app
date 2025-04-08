import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

import { CursoListaModel } from '../../../../common/domain/models/curso-lista.model';

@Component({
    selector: 'app-home-cursos-card',
    imports: [
        CommonModule,
        MatCardModule
    ],
    templateUrl: './card.component.html',
    styleUrl: './card.component.scss'
})
export class HomeCursosCardComponent implements OnInit {

    public curso = input<CursoListaModel>();

    constructor() { }

    ngOnInit() {
    }

}
