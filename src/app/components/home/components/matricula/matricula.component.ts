import { trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { slideInRight } from 'ngx-animate';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-home-matricula',
    templateUrl: './matricula.component.html',
    styleUrl: './matricula.component.scss',
    animations: [
        trigger('slideInRightOnEnter', [
            transition('* => in', useAnimation(slideInRight, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule, 
        RouterModule,
        AnimateOnScrollDirective
    ],
})
export class HomeMatriculaComponent implements OnInit {
    animateText = 'out';

    constructor() { }

    ngOnInit() {
    }

}
