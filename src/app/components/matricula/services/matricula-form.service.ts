import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { MatriculaModel } from '../models/matricula.model';
import { PatternsDb } from '../../../common/domain/patterns/patterns';

type formType = {
    nomeCompleto: FormControl<string>;
    email: FormControl<string>;
    celular: FormControl<string>;
    estado: FormControl<string>;
    cidade: FormControl<string>;
    cursoId: FormControl<string>;
}

@Injectable()
export class MatriculaFormService {

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
    public getValue(): MatriculaModel {
        return <MatriculaModel> {
            nomeCompleto: this._form.get('nomeCompleto')?.value,
            email: this._form.get('email')?.value,
            celular: this._form.get('celular')?.value,
            uf: this._form.get('estado')?.value,
            cidade: this._form.get('cidade')?.value,
            cursoId: this._form.get('cursoId')?.value
        }
    }

    // Private methods
    private _buildForm(): FormGroup<formType> {

        return this._fb.group<formType>({
            nomeCompleto: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            email: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(200), Validators.email, Validators.pattern(PatternsDb.email)], nonNullable: true}),
            celular: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(11), Validators.pattern(PatternsDb.telefone.celular)], nonNullable: true }),
            estado: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(2)], nonNullable: true }),
            cidade: this._fb.control<string>('', { validators: [Validators.required, Validators.maxLength(100)], nonNullable: true }),
            cursoId: this._fb.control<string>('', { validators: [Validators.required], nonNullable: true }),
        })
    }

}
