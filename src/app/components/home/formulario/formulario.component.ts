import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

import { filter, of, Subject, switchMap, takeUntil } from 'rxjs';

import { NgxMaskDirective } from "ngx-mask";

import { HomeFormularioService } from './services/formulario.service';
import { HomeFormularioFormService } from './services/formulario-form.service';
import { MasksDb } from '../../../common/domain/masks/masks';
import { EstadoModel } from './models/estado.model';
import { CidadeModel } from './models/cidade.model';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-home-formulario',
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.scss',
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        NgxMaskDirective,
        ReactiveFormsModule
    ],
    providers: [HomeFormularioService, HomeFormularioFormService],
    encapsulation: ViewEncapsulation.None
})
export class HomeFormularioComponent implements OnInit, OnDestroy {

    public form = this._formService.form;
    public mask = MasksDb.telefone.celular.ddd;

    public estados: EstadoModel[] = [];
    public cidades: CidadeModel[] = [];

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _service: HomeFormularioService,
        private _formService: HomeFormularioFormService
    ) { }

    ngOnInit() {
        this._service.obterEstados()
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(estados => this.estados = estados);

        this.form.get("uf")?.valueChanges
            .pipe(
                switchMap(estado => {
                    const estadoId = this.estados.find(e => e.sigla == estado)?.id;

                    if (estadoId)
                        return this._service.obterCidades(estadoId);

                    return of(null);
                }),
                filter(cidades => cidades != null),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(cidades => this.cidades = cidades);
    }

    ngOnDestroy() {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // Public methods
    public obterCidades(uf: string): void {

    }

}
