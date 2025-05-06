import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-matricula',
    templateUrl: './matricula.component.html',
    styleUrl: './matricula.component.scss',
    imports: [CommonModule, RouterModule],
})
export class HomeMatriculaComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
