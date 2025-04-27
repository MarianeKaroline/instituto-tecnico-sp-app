import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, useAnimation } from '@angular/animations';

import { fadeInUp, slideInLeft } from 'ngx-animate';

import { HomeSigaNosCarouselComponent } from './carousel/carousel.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-home-siga-nos',
    templateUrl: './siga-nos.component.html',
    styleUrl: './siga-nos.component.scss',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnter', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        MatIconModule,
        HomeSigaNosCarouselComponent,

        AnimateOnScrollDirective
    ]
})
export class HomeSigaNosComponent implements OnInit {
    
    animateText = 'out';
    animateCard = 'out';

    constructor() { }

    ngOnInit() {
    }

}
