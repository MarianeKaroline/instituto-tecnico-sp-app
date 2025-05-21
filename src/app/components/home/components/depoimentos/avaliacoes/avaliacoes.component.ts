import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, useAnimation } from '@angular/animations';

import { slideInRight, slideInLeft } from 'ngx-animate';

import { HomeDepoimentosAvaliacoesCarouselComponent } from './carousel/carousel.component';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-home-depoimentos-avaliacoes',
    templateUrl: './avaliacoes.component.html',
    styleUrl: './avaliacoes.component.scss',
    animations: [
        trigger('slideInRightOnEnter', [
            transition('* => in', useAnimation(slideInRight, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnter', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ])
    ],
    imports: [
        MatIconModule,
        HomeDepoimentosAvaliacoesCarouselComponent,
        AnimateOnScrollDirective,
    ]
})
export class HomeDepoimentosAvaliacoesComponent {

    animateCards = 'out';

    avatares = Array.from({length: 4}, (_, i) => i + 1)

}
