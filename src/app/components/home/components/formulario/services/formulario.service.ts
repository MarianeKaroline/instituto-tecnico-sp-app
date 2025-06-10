import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, Observable, take } from 'rxjs';

import { EstadoModel } from '../models/estado.model';
import { CidadeModel } from '../models/cidade.model';
import { environment } from '../../../../../../environments/environment.local';
import { EnvioEmailModel } from '../../../../../common/domain/models/email/envio-email.model';
import { TipoEmailEnum } from '../../../../../common/domain/enums/tipo-email-enum';

const API_URL = {
    localidade: "https://servicodados.ibge.gov.br/api/v1/localidades",
    home: environment.api.baseUrl + environment.api.home
}

@Injectable()
export class HomeFormularioService {

    constructor(
        private _http: HttpClient
    ) { }

    // Public methods
    public enviarEmail(model: EnvioEmailModel): Observable<void> {
        return this._enviarEmail(model);
    }

    public obterEstados(): Observable<EstadoModel[]> {
        return this._obterEstados()            
            .pipe(
                map(estados => estados.sort((a,b) => a.nome.localeCompare(b.nome)))
            );
    }
    
    public obterCidades(estadoId: number): Observable<CidadeModel[]> {
        return this._obterCidades(estadoId);
    }

    //Private methods
    private _enviarEmail(model: EnvioEmailModel): Observable<void> {

        return this._http.post<void>(`${API_URL.home}/enviar-email/${TipoEmailEnum.EntraremosEmContato}`, model)
            .pipe(
                take(1)
            );
    }

    private _obterEstados(): Observable<EstadoModel[]> {

        return this._http.get<EstadoModel[]>(`${API_URL.localidade}/estados`)
            .pipe(
                take(1)
            );
    }

    private _obterCidades(estadoId: number): Observable<CidadeModel[]> {

        return this._http.get<EstadoModel[]>(`${API_URL.localidade}/estados/${estadoId}/municipios`)
            .pipe(
                take(1)
            );
    }

}
