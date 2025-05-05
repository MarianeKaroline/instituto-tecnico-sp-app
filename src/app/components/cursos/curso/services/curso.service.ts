import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, take } from 'rxjs';

import { CursoModel } from '../../../../common/domain/models/curso/curso.model';
import { environment } from '../../../../../environments/environment';

const API_URL = {
    curso: environment.api.baseUrl + environment.api.curso
}

@Injectable()
export class CursoService {

    private _curso = signal<CursoModel | null>(null);
    public readonly curso = this._curso.asReadonly();

    constructor(
        private _http: HttpClient
    ) { }

    // Public methods
    public obter(cursoId: string): Observable<void> {
        return this._obter(cursoId)
            .pipe(
                map(curso => this._curso.set(curso))
            );
    }

    // Private methods
    private _obter(cursoId: string): Observable<CursoModel> {
        
        return this._http.get<CursoModel>(`${API_URL.curso}/${cursoId}`)
            .pipe(
                take(1)
            )
    }

}
