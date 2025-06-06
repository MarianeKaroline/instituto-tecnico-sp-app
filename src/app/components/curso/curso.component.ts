import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { map, filter, takeUntil, Subject, switchMap } from 'rxjs';

import { CursoService } from './services/curso.service';
import { ItspUtils } from '../../core/utils/itsp-utils';
import { TipoTopicoCursoEnum } from '../../common/domain/enums/tipo-topico-curso.enum';
import { CardComponent, DataCard } from '../../shared/components/card/card.component';
import { CardModel, CursoTopicoModel } from '../../common/domain/models/curso/curso.model';
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

    cardsGerais: CardModel[] | undefined;
    cardsAtuacao: CardModel[] | undefined;
    cardsAprendizado: CardModel[] | undefined;
    cardsDuracao: CardModel[] | undefined;

    header: CursoTopicoModel | undefined;
    atuacao: CursoTopicoModel | undefined;
    aprendizado: CursoTopicoModel | undefined;
    duracao: CursoTopicoModel | undefined;
    mensalidade: CursoTopicoModel | undefined;

    cardsEstrutura: DataCard[] = [
        {
            cor: '#005200',
            icone: false,
            titulo: 'Salas modernas com recursos multimídia',
            img: 'assets/icons/presentation.png',
            tipoCardEnum: 1
        },
        {
            cor: '#8BC34A',
            icone: false,
            titulo: 'Laboratórios de anatomia, fisiologia e simulação realística',
            img: 'assets/icons/lab.png',
            tipoCardEnum: 1
        },
        {
            cor: '#005200',
            icone: false,
            titulo: 'Professores experientes e atuantes no mercado',
            img: 'assets/icons/higher-education.png',
            tipoCardEnum: 1
        },
        {
            cor: '#8BC34A',
            icone: false,
            titulo: ' Estágios garantidos em instituições parceiras',
            img: 'assets/icons/around-the-world.png',
            tipoCardEnum: 1
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
                switchMap(nomeCurso => this._service.obter(nomeCurso)),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {

                this.header = this._service.curso()?.topicos
                    .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Header);

                this.atuacao = this._service.curso()?.topicos
                    .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Atuacao);

                this.aprendizado = this._service.curso()?.topicos
                    .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Aprendizado);

                this.duracao = this._service.curso()?.topicos
                    .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Duracao);

                this.mensalidade = this._service.curso()?.topicos
                    .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Mensalidade);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
