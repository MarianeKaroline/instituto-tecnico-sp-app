import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

export type DataCard = {
    img?: string;
    titulo: string;
    descricao?: string;
    icone: boolean;
    cor: string;
    tipoCard: number;
}

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    imports: [
        MatIconModule
    ]
})
export class CardComponent implements OnInit {

    data = input<DataCard>();
    index = input<number>();

    constructor() { }

    ngOnInit() {
    }

}
