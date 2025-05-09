import { CommonModule } from '@angular/common';
import { Component, input, OnDestroy, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';

import { fadeInDown, slideInLeft } from 'ngx-animate';

import { Subject, takeUntil } from 'rxjs';

import { HomeCursosService } from './services/cursos.service';
import { CursoListaModel } from '../../../../common/domain/models/curso/curso-lista.model';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { HomeCursosCarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'app-home-cursos',
    templateUrl: './cursos.component.html',
    styleUrl: './cursos.component.scss',
    animations: [
        trigger('fadeInDownOnEnter', [
            transition('* => in', useAnimation(fadeInDown, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnter', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule,
        HomeCursosCarouselComponent,

        AnimateOnScrollDirective
    ],
    providers: [
        HomeCursosService
    ]
})
export class HomeCursosComponent implements OnInit, OnDestroy {

    animateCard = 'out';
    animateText = 'out';

    home = input<boolean>(true);

    public cursos: CursoListaModel[] = [];

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _service: HomeCursosService
    ) { }

    ngOnInit() {
        this._service.obter()
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(cursos => this.cursos = cursos);
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
