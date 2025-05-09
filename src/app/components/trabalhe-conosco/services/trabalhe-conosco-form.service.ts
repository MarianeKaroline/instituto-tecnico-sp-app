import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { TrabalheConoscoModel } from '../models/trabalhe-conosco.model';
import { PatternsDb } from '../../../common/domain/patterns/patterns';

type formType = {
    nomeCompleto: FormControl<string>;
    email: FormControl<string>;
    celular: FormControl<string>;
    estado: FormControl<string>;
    cidade: FormControl<string>;
    dataNascimento: FormControl<Date>;
    genero: FormControl<string>;
}

@Injectable()
export class TrabalheConoscoFormService {

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
    public getValue(): TrabalheConoscoModel {
        return <TrabalheConoscoModel> {
            nomeCompleto: this._form.get('nomeCompleto')?.value,
            email: this._form.get('email')?.value,
            celular: this._form.get('celular')?.value,
            uf: this._form.get('estado')?.value,
            cidade: this._form.get('cidade')?.value,
            dataNascimento: this._form.get('dataNascimento')?.value,
            genero: this._form.get('genero')?.value
        }
    }

    // Private methods
    private _buildForm(): FormGroup<formType> {

        var birthday = new Date();
        birthday.setFullYear(birthday.getFullYear() - 18);

        return this._fb.group<formType>({
            nomeCompleto: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            email: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(200), Validators.email, Validators.pattern(PatternsDb.email)], nonNullable: true}),
            celular: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(11), Validators.pattern(PatternsDb.telefone.celular)], nonNullable: true }),
            estado: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(2)], nonNullable: true }),
            cidade: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            dataNascimento: this._fb.control<Date>(birthday, { validators: [Validators.required], nonNullable: true }),
            genero: this._fb.control<string>('', { validators: [Validators.required], nonNullable: true }),
        })
    }

}
