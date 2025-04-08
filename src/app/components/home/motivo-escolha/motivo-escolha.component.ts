import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HomeMotivoEscolhaCarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'app-home-motivo-escolha',
    templateUrl: './motivo-escolha.component.html',
    styleUrl: './motivo-escolha.component.scss',
    imports: [
        CommonModule, 
        MatIconModule,
        
        HomeMotivoEscolhaCarouselComponent
    ]
})
export class HomeMotivoEscolhaComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
