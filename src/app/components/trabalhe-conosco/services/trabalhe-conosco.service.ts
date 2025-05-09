import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, take } from 'rxjs';

import { environment } from '../../../../environments/environment.local';
import { CidadeModel } from '../../home/components/formulario/models/cidade.model';
import { EstadoModel } from '../../home/components/formulario/models/estado.model';
import { IKeyValuePair } from '../../../common/types/key-value-pair';
import { TrabalheConoscoModel } from '../models/trabalhe-conosco.model';


const API_URL = {
    localidade: "https://servicodados.ibge.gov.br/api/v1/localidades",
    home: environment.api.baseUrl + environment.api.home,
    curso: environment.api.baseUrl + environment.api.curso
}

@Injectable()
export class TrabalheConoscoService {

    constructor(
        private _http: HttpClient
    ) { }

    // Public methods
    public enviarEmail(model: TrabalheConoscoModel, anexo: File): Observable<void> {
        return this._enviarEmail(model, anexo);
    }
    
    public obterEstados(): Observable<EstadoModel[]> {
        return this._obterEstados();
    }
    
    public obterCidades(estadoId: number): Observable<CidadeModel[]> {
        return this._obterCidades(estadoId);
    }
    
    public listarCursosAtivos(): Observable<IKeyValuePair<string, string>[]> {
        return this._listarCursosAtivos();
    }

    //Private methods
    private _enviarEmail(model: TrabalheConoscoModel, anexo: File): Observable<void> {

        const formData = new FormData();
        formData.append('NomeCompleto', model.nomeCompleto);
        formData.append('Email', model.email);
        formData.append('Celular', model.celular);
        formData.append('Uf', model.uf);
        formData.append('Cidade', model.cidade);
        formData.append('Genero', model.genero);
        formData.append('DataNascimento', model.dataNascimento.toISOString());
        formData.append('Anexo', anexo);

        return this._http.post<void>(`${API_URL.home}/email/trabalhe-conosco`, formData)
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

    private _listarCursosAtivos(): Observable<IKeyValuePair<string, string>[]> {

        return this._http.get<IKeyValuePair<string, string>[]>(`${API_URL.curso}/ativos`)
            .pipe(
                take(1)
            );
    }

}
