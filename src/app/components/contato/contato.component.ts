import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { finalize, Subject, takeUntil } from 'rxjs';

import { NgxMaskDirective } from 'ngx-mask';

import { ContatoFormService } from './services/contato-form.service';
import { ContatoService } from './services/contato.service';
import { NotificationService } from '../../core/services/notification/notification.service';
import { MasksDb } from '../../common/domain/masks/masks';

@Component({
    selector: 'app-contato',
    templateUrl: './contato.component.html',
    styleUrl: './contato.component.scss',
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
    providers: [ContatoService, ContatoFormService],
    encapsulation: ViewEncapsulation.None
})
export class ContatoComponent implements OnInit {

    public form = this._formService.form;
    public mask = MasksDb.telefone.celular.ddd;
    
    public loading: boolean = false;
    
    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _service: ContatoService,
        private _formService: ContatoFormService,
        private _notificationService: NotificationService
    ) { }

    ngOnInit() {
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
