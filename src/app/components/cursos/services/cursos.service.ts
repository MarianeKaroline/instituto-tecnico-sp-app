import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment.local';
import { CursoListaModel } from '../../../common/domain/models/curso/curso-lista.model';

const API_URL = {
    curso: environment.api.baseUrl + environment.api.curso
}

@Injectable()
export class CursosService {

    constructor(
        private _http: HttpClient
    ) { }

    // Public methods
    public obter(): Observable<CursoListaModel[]> {
        return this._obter();
    }

    // Private methods
    public _obter(): Observable<CursoListaModel[]> {
        
        return this._http.get<CursoListaModel[]>(`${API_URL.curso}`)
            .pipe(
                take(1)
            );
    }

}
