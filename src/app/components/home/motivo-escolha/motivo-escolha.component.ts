import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, useAnimation } from '@angular/animations';

import { fadeInUp, slideInLeft } from 'ngx-animate';

import { HomeMotivoEscolhaCarouselComponent } from './carousel/carousel.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-home-motivo-escolha',
    templateUrl: './motivo-escolha.component.html',
    styleUrl: './motivo-escolha.component.scss',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnterFirst', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '0.5' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnterSecond', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '1.0' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnterThird', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '1.5' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnterFourth', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '2.0' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule, 
        MatIconModule,
        AnimateOnScrollDirective,
        
        HomeMotivoEscolhaCarouselComponent
    ]
})
export class HomeMotivoEscolhaComponent implements OnInit {

    animateText = 'out';
    animateCards = 'out';

    constructor() { }

    ngOnInit() {
    }

}
