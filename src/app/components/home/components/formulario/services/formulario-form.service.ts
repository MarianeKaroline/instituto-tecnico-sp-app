import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PatternsDb } from '../../../../../common/domain/patterns/patterns';
import { FormularioModel } from '../models/formulario.model';

type formType = {
    nome: FormControl<string>;
    email: FormControl<string>;
    celular: FormControl<string>;
    uf: FormControl<string>;
    cidade: FormControl<string>;
}

@Injectable()
export class HomeFormularioFormService {

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
    public getValue(): FormularioModel {
        return <FormularioModel> {
            nome: this._form.get('nome')?.value,
            email: this._form.get('email')?.value,
            celular: this._form.get('celular')?.value,
            estado: this._form.get('uf')?.value,
            cidade: this._form.get('cidade')?.value
        }
    }

    // Private methods
    private _buildForm(): FormGroup<formType> {

        return this._fb.group<formType>({
            nome: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            email: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(200), Validators.email, Validators.pattern(PatternsDb.email)], nonNullable: true}),
            celular: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(11), Validators.pattern(PatternsDb.telefone.celular)], nonNullable: true }),
            uf: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(2)], nonNullable: true }),
            cidade: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(200)], nonNullable: true }),
        })
    }

}
