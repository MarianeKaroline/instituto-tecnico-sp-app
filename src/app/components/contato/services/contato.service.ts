import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take } from 'rxjs';
import { ContatoModel } from '../models/contato.model';
import { environment } from '../../../../environments/environment.local';


const API_URL = {
    home: environment.api.baseUrl + environment.api.home
}

@Injectable()
export class ContatoService {

    constructor(
        private _http: HttpClient
    ) { }

    // Public methods
    public enviarEmail(model: ContatoModel): Observable<void> {
        return this._enviarEmail(model);
    }

    //Private methods
    private _enviarEmail(model: ContatoModel): Observable<void> {

        return this._http.post<void>(`${API_URL.home}/enviar-email`, model)
            .pipe(
                take(1)
            );
    }

}
