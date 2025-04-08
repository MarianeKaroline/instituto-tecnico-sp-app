import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeCursosCardComponent } from './card/card.component';
import { HomeCursosService } from './services/cursos.service';
import { Subject, takeUntil } from 'rxjs';
import { CursoListaModel } from '../../../common/domain/models/curso-lista.model';

@Component({
    selector: 'app-home-cursos',
    imports: [
        CommonModule,
        HomeCursosCardComponent
    ],
    templateUrl: './cursos.component.html',
    styleUrl: './cursos.component.scss',
    providers: [
        HomeCursosService
    ]
})
export class HomeCursosComponent implements OnInit, OnDestroy {

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
