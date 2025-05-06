import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { ContatoModel } from '../models/contato.model';
import { PatternsDb } from '../../../common/domain/patterns/patterns';

type formType = {
    nomeCompleto: FormControl<string>;
    email: FormControl<string>;
    celular: FormControl<string>;
    assunto: FormControl<string>;
    mensagem: FormControl<string>;
}

@Injectable()
export class ContatoFormService {

    // Properties
    private _form = this._buildForm();

    constructor(
        private _fb: FormBuilder
    ) { }

    // Accessors
    public get form(): FormGroup {
        return this._form;
    }

    //Public methods
    public getValue(): ContatoModel {
        return <ContatoModel> {
            nomeCompleto: this._form.get('nomeCompleto')?.value,
            email: this._form.get('email')?.value,
            celular: this._form.get('celular')?.value,
            assunto: this._form.get('assunto')?.value,
            mensagem: this._form.get('mensagem')?.value
        }
    }

    // Private methods
    private _buildForm(): FormGroup<formType> {

        return this._fb.group<formType>({
            nomeCompleto: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            email: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(200), Validators.email, Validators.pattern(PatternsDb.email)], nonNullable: true}),
            celular: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(11), Validators.pattern(PatternsDb.telefone.celular)], nonNullable: true }),
            assunto: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            mensagem: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(1000)], nonNullable: true }),
        })
    }

}
