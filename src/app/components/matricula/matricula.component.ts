import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { Subject, filter, finalize, of, switchMap, takeUntil } from 'rxjs';

import { NgxMaskDirective } from 'ngx-mask';

import { MatriculaFormService } from './services/matricula-form.service';
import { MatriculaService } from './services/matricula.service';
import { NotificationService } from '../../core/services/notification/notification.service';
import { MasksDb } from '../../common/domain/masks/masks';
import { CidadeModel } from '../home/components/formulario/models/cidade.model';
import { EstadoModel } from '../home/components/formulario/models/estado.model';
import { IKeyValuePair } from '../../common/types/key-value-pair';

@Component({
    selector: 'app-matricula',
    templateUrl: './matricula.component.html',
    styleUrl: './matricula.component.scss',
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
    providers: [MatriculaService, MatriculaFormService],
    encapsulation: ViewEncapsulation.None
})
export class MatriculaComponent implements OnInit, OnDestroy {

    public form = this._formService.form;
    public mask = MasksDb.telefone.celular.ddd;

    public loading: boolean = false;
    
    public estados: EstadoModel[] = [];
    public cidades: CidadeModel[] = [];
    public cursos: IKeyValuePair<string, string>[] = [];

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _service: MatriculaService,
        private _formService: MatriculaFormService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
        this._service.obterEstados()
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(estados => this.estados = estados);

        this._service.listarCursosAtivos()
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(cursos => this.cursos = cursos);

        this.form.get("estado")?.valueChanges
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
    public enviarEmail(): void {

        this.loading = true;

        const model = this._formService.getValue();

        this._service.enviarEmail(model)
            .pipe(
                finalize(() => this.loading = false),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                this.resetarFormulario();
                this._notificationService.message("E-mail enviado com sucesso. Em breve nossa equipe entrará em contato")
            })
    }

    private resetarFormulario(): void {
        this.form.reset();
        this.form.markAsPristine();
        this.form.markAsUntouched();

        Object.keys(this.form.controls).forEach(key => {
            this.form.controls[key].setErrors(null);
        });

        this.form.updateValueAndValidity();
    }

}
