import { trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { fadeInDown, fadeInUp, slideInRight } from 'ngx-animate';

import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { HomeDepoimentosCarouselComponent } from './carousel/carousel.component';
import { HomeDepoimentosAvaliacoesComponent } from './avaliacoes/avaliacoes.component';

@Component({
    selector: 'app-home-depoimentos',
    templateUrl: './depoimentos.component.html',
    styleUrl: './depoimentos.component.scss',
    animations: [
        trigger('fadeInDownOnEnter', [
            transition('* => in', useAnimation(fadeInDown, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInRightOnEnter', [
            transition('* => in', useAnimation(slideInRight, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
        trigger('fadeInUpOnEnterFirst', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.5' }
            })),
            transition('* => out', [])
        ]),
        trigger('fadeInUpOnEnterSecond', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '1.0' }
            })),
            transition('* => out', [])
        ]),
        trigger('fadeInUpOnEnterThird', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '1.5' }
            })),
            transition('* => out', [])
        ]),
        trigger('fadeInUpOnEnterFourth', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '2.0' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule,
        MatIconModule,
        HomeDepoimentosCarouselComponent,
        HomeDepoimentosAvaliacoesComponent,

        AnimateOnScrollDirective
    ]
})
export class HomeDepoimentosComponent implements OnInit {
    
    animateDepoiments = 'out';
    animateCards = 'out';
    animateText = 'out';
    animateVideo = 'out';

    public videoSelecionado = 0;
    
    public images = [...Array(4).keys()]

    constructor() { }

    ngOnInit() {
    }

    public setVideoSelecionado(index: number): void {
        console.log(index)
        this.videoSelecionado = index;
    }

}
