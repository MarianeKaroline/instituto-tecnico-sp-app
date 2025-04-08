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
                categoria: "Saúde",
                urlImagem: "https://wozcodelms2.s3.amazonaws.com/plataformas/42/trilhas/729/foto_miniatura.jpg"
            },
            {
                cursoId: 2,
                nome: "Técnico em radiologia",
                categoria: "Saúde",
                urlImagem: "https://wozcodelms2.s3.amazonaws.com/plataformas/42/trilhas/731/foto_miniatura.png"
            },
            {
                cursoId: 1,
                nome: "Técnico em enfermagem",
                categoria: "Saúde",
                urlImagem: "https://wozcodelms2.s3.amazonaws.com/plataformas/42/trilhas/729/foto_miniatura.jpg"
            },
            {
                cursoId: 2,
                nome: "Técnico em radiologia",
                categoria: "Saúde",
                urlImagem: "https://wozcodelms2.s3.amazonaws.com/plataformas/42/trilhas/731/foto_miniatura.png"
            }
        ];

        return of(model);
    }

}
