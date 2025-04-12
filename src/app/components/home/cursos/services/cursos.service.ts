import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { CursoListaModel } from '../../../../common/domain/models/curso-lista.model';

@Injectable()
export class HomeCursosService {

    constructor() { }

    // Public methods
    public obter(): Observable<CursoListaModel[]> {
        return this._obter();
    }

    // Private methods
    public _obter(): Observable<CursoListaModel[]> {
        var model: CursoListaModel[] = [
            {
                cursoId: 1,
                nome: "Técnico em enfermagem",
                descricao: "Formação prática e humanizada para atuar na promoção, prevenção e cuidados com a saúde em hospitais, clínicas e unidades de saúde.",
                categoria: "Saúde",
                urlImagem: "assets/images/Enfermeira-1.png"
            },
            {
                cursoId: 2,
                nome: "Técnico em radiologia",
                descricao: "Capacita profissionais para operar equipamentos de diagnóstico por imagem, como raio-X, tomografia e ressonância, com foco em segurança e precisão.",
                categoria: "Saúde",
                urlImagem: "assets/images/Radiologista-1.png"
            }
        ];

        return of(model);
    }

}
