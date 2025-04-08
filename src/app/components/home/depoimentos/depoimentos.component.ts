import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home-depoimentos',
    templateUrl: './depoimentos.component.html',
    styleUrl: './depoimentos.component.scss',
    imports: [
        CommonModule
    ]
})
export class HomeDepoimentosComponent implements OnInit {

    
    public images = [...Array(4).keys()]

    constructor() { }

    ngOnInit() {
    }

}
