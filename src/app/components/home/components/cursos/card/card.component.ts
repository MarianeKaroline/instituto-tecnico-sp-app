import { Component, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { CursoListaModel } from '../../../../../common/domain/models/curso/curso-lista.model';

@Component({
    selector: 'app-home-cursos-card',
    imports: [
        CommonModule,
        RouterModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './card.component.html',
})
export class HomeCursosCardComponent implements OnInit {

    public curso = input<CursoListaModel>();
    public index = input<number>(0);
    public home = input<boolean>(true);

    constructor() { }

    ngOnInit() {
    }

}
