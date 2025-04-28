import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, take } from 'rxjs';

import { CursoListaModel } from '../../../../../common/domain/models/curso/curso-lista.model';
import { environment } from '../../../../../../environments/environment.local';

const API_URL = {
    curso: environment.api.baseUrl + environment.api.curso
}

@Injectable()
export class HomeCursosService {

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
