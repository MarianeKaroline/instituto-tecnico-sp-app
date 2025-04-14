import { trigger, transition, useAnimation } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

import { fadeInUp, slideInRight } from 'ngx-animate';

import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { CountUpOnScrollDirective } from '../../../shared/directives/count-up-on-scroll.directive';

@Component({
    selector: 'app-home-sobre-nos',
    templateUrl: './sobre-nos.component.html',
    styleUrl: './sobre-nos.component.scss',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
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
    ],
    imports: [
        AnimateOnScrollDirective,
        CountUpOnScrollDirective
    ]
})
export class HomeSobreNosComponent implements OnInit {

    animateImage = 'out';
    animateText = 'out';

    constructor() { }

    ngOnInit() {
    }

}
