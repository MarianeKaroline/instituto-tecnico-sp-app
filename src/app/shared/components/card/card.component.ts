import { trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { slideInLeft } from 'ngx-animate';
import { ScreenSizeService } from '../../../common/core/services/screen-size.service';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';

export type DataCard = {
    img?: string;
    titulo: string;
    descricao?: string;
    icone: boolean;
    cor: string;
    tipoCardEnum: number;
}

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    animations: [   
        trigger('slideInLeftOnEnter', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { 
                    timing: '0.8',
                    delay: '{{ delay }}',
                    easing: 'ease-out'
                }
            })),
            transition('* => out', [])
        ])
    ],
    imports: [
        CommonModule,
        AnimateOnScrollDirective,
        MatIconModule
    ]
})
export class CardComponent implements OnInit {
    
    animateCards = 'out';

    data = input<DataCard>();
    index = input<number>();

    private screen = inject(ScreenSizeService);
    isMobile = this.screen.isMobile;

    constructor() { }

    ngOnInit() {
    }

}
