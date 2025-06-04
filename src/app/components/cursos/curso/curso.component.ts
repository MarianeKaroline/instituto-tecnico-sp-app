import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

import { map, filter, takeUntil, Subject, switchMap } from 'rxjs';

import { CursoService } from './services/curso.service';
import { ItspUtils } from '../../../core/utils/itsp-utils';
import { CursoDetalheComponent } from './components/detalhe/detalhe.component';
import { CursoVendaComponent } from './components/venda/venda.component';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.scss'],
    imports: [
        MatIconModule,
        CursoDetalheComponent,
        CursoVendaComponent,

        RouterModule
    ],
    providers: [CursoService]
})
export class CursoComponent implements OnInit, OnDestroy {

    private _activatedRoute = inject(ActivatedRoute);
    private _titleService = inject(Title);

    private _unsubscribeAll = new Subject<void>();

    curso = this._service.curso;
    avatares = Array.from({length: 6}, (_, i) => i + 1);
    detalhe = true;

    constructor(
        private _service: CursoService
    ) { }

    ngOnInit() {
        this._activatedRoute.params
            .pipe(
                map(m => m['nomeCurso']),
                filter(res => !ItspUtils.isNullOrEmpty(res)),
                switchMap(nomeCurso => this._service.obter(nomeCurso)),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {

                const nomeCurso = this._service.curso()?.nome;
                const titulo = `Curso ${nomeCurso} | ITSP`;
                this._titleService.setTitle(titulo);

                console.log(this._service.curso())
                this.detalhe = this._service.curso()?.topicos.length != 0;
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
