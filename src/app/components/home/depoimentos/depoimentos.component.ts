import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home-depoimentos',
    templateUrl: './depoimentos.component.html',
    styleUrl: './depoimentos.component.scss',
    imports: [
        CommonModule,
        MatIconModule
    ]
})
export class HomeDepoimentosComponent implements OnInit {

    public videoSelecionado = 1;
    
    public images = [...Array(4).keys()]

    constructor() { }

    ngOnInit() {
    }

}
