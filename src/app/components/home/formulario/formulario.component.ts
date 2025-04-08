import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';

import { HomeFormularioService } from './services/formulario.service';

@Component({
    selector: 'app-formulario',
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.scss',
    imports: [
        CommonModule,
        MatFormFieldModule,
        ReactiveFormsModule
    ],
    providers: [HomeFormularioService]
})
export class HomeFormularioComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
