import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { HomeFormularioComponent } from '../home/components/formulario/formulario.component';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.scss',
    imports: [
        CommonModule,
        HomeFormularioComponent
    ]
})
export class ContatoComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
