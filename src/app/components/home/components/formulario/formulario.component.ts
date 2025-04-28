import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { trigger, transition, useAnimation } from '@angular/animations';

import { filter, finalize, of, Subject, switchMap, takeUntil } from 'rxjs';

import { NgxMaskDirective } from "ngx-mask";
import { fadeInDown, fadeInUp } from 'ngx-animate';

import { HomeFormularioService } from './services/formulario.service';
import { HomeFormularioFormService } from './services/formulario-form.service';
import { MasksDb } from '../../../../common/domain/masks/masks';
import { EstadoModel } from './models/estado.model';
import { CidadeModel } from './models/cidade.model';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { EnvioEmailModel } from '../../../../common/domain/models/email/envio-email.model';
import { NotificationService } from '../../../../core/services/notification/notification.service';

@Component({
    selector: 'app-home-formulario',
    templateUrl: './formulario.component.html',
    styleUrl: './formulario.component.scss',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
        trigger('fadeInDownOnEnter', [
            transition('* => in', useAnimation(fadeInDown, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        NgxMaskDirective,
        ReactiveFormsModule,

        AnimateOnScrollDirective
    ],
    providers: [HomeFormularioService, HomeFormularioFormService],
    encapsulation: ViewEncapsulation.None
})
export class HomeFormularioComponent implements OnInit, OnDestroy {

    animateImage = 'out';
    animateForm = 'out';

    public form = this._formService.form;
    public mask = MasksDb.telefone.celular.ddd;

    public loading: boolean = false;

    public estados: EstadoModel[] = [];
    public cidades: CidadeModel[] = [];

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _service: HomeFormularioService,
        private _formService: HomeFormularioFormService,
        private _notificationService: NotificationService
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
    public enviarEmail(): void {

        this.loading = true;

        const formValue = this._formService.getValue();

        var model: EnvioEmailModel = {
            nomeCompleto: formValue.nome,
            email: formValue.email,
            celular: formValue.celular,
            uf: formValue.estado,
            cidade: formValue.cidade
        }

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
