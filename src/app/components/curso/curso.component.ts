import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { map, filter, takeUntil, Subject } from 'rxjs';

import { CursoService } from './services/curso.service';
import { ItspUtils } from '../../core/utils/itsp-utils';
import { TipoTopicoCursoEnum } from '../../common/domain/enums/tipo-topico-curso.enum';
import { CardComponent, DataCard } from '../../shared/components/card/card.component';
import { TopicoModel } from '../../common/domain/models/curso/curso.model';
import { MatIconModule } from '@angular/material/icon';
import { CursoCarouselComponent } from './components/carousel/carousel.component';

@Component({
    selector: 'app-curso',
    templateUrl: './curso.component.html',
    styleUrls: ['./curso.component.scss'],
    imports: [
        MatIconModule,
        CardComponent,
        CursoCarouselComponent
    ],
    providers: [CursoService]
})
export class CursoComponent implements OnInit, OnDestroy {

    private _unsubscribeAll = new Subject<void>();

    curso = this._service.curso;
    avatares = Array.from({length: 6}, (_, i) => i + 1);

    cardsGerais: TopicoModel[] | undefined;
    cardsAtuacao: TopicoModel[] | undefined;
    cardsAprendizado: TopicoModel[] | undefined;
    cardsDuracao: TopicoModel[] | undefined;

    cardsEstrutura: DataCard[] = [
        {
            cor: '#005200',
            icone: false,
            titulo: 'Salas modernas com recursos multimídia',
            img: 'assets/icons/presentation.png',
            tipoCard: 1
        },
        {
            cor: '#8BC34A',
            icone: false,
            titulo: 'Laboratórios de anatomia, fisiologia e simulação realística',
            img: 'assets/icons/lab.png',
            tipoCard: 1
        },
        {
            cor: '#005200',
            icone: false,
            titulo: 'Professores experientes e atuantes no mercado',
            img: 'assets/icons/higher-education.png',
            tipoCard: 1
        },
        {
            cor: '#8BC34A',
            icone: false,
            titulo: ' Estágios garantidos em instituições parceiras',
            img: 'assets/icons/around-the-world.png',
            tipoCard: 1
        }
    ]

    constructor(
        private _service: CursoService,
        private _activatedRoute: ActivatedRoute,
    ) { }

    ngOnInit() {
        this._activatedRoute.params
            .pipe(
                map(m => m['nomeCurso']),
                filter(res => !ItspUtils.isNullOrEmpty(res)),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(nomeCurso => {
                this._service.obter(nomeCurso)

                this.cardsGerais = this._service.curso()?.topicos
                    .filter(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Geral)
                    .flatMap(t => t.topicos);

                this.cardsAtuacao = this._service.curso()?.topicos
                    .filter(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Atuacao)
                    .flatMap(t => t.topicos);

                this.cardsAprendizado = this._service.curso()?.topicos
                    .filter(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Aprendizado)
                    .flatMap(t => t.topicos);

                this.cardsDuracao = this._service.curso()?.topicos
                    .filter(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Duracao)
                    .flatMap(t => t.topicos);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
