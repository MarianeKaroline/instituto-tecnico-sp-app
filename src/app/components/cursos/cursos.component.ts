import { Component, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';

import { CursoListaModel } from '../../common/domain/models/curso/curso-lista.model';
import { CursosService } from './services/cursos.service';
import { CursosCardComponent } from './card/card.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-cursos',
    templateUrl: './cursos.component.html',
    styleUrl: './cursos.component.scss',
    imports: [
        CommonModule,
        CursosCardComponent
    ],
    providers: [
        CursosService
    ]
})
export class CursosComponent implements OnInit {

    public cursos: CursoListaModel[] = [];

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _service: CursosService
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
