import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-matricula',
    imports: [CommonModule],
    templateUrl: './matricula.component.html',
    styleUrl: './matricula.component.scss'
})
export class HomeMatriculaComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
