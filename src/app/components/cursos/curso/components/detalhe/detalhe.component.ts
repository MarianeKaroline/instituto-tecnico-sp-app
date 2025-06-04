import { Component, input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CardComponent, DataCard } from '../../../../../shared/components/card/card.component';
import { CursoAvaliacoesComponent } from '../avaliacoes/avaliacoes.component';
import { CursoCarouselComponent } from '../carousel/carousel.component';
import { CardModel, CursoModel, CursoTopicoModel } from '../../../../../common/domain/models/curso/curso.model';
import { TipoTopicoCursoEnum } from '../../../../../common/domain/enums/tipo-topico-curso.enum';

@Component({
    selector: 'app-curso-detalhe',
    templateUrl: './detalhe.component.html',
    styleUrls: ['./detalhe.component.scss'],
    imports: [
        MatIconModule,
        CardComponent,
        CursoCarouselComponent,
        CursoAvaliacoesComponent,
        RouterModule
    ]
})
export class CursoDetalheComponent implements OnInit {

    curso = input<CursoModel | null>();
    avatares = input<number[]>();
    
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
            cor: '#4e9d4e',
            icone: false,
            titulo: 'Salas modernas com recursos multimídia',
            img: 'assets/icons/education.svg',
            tipoCardEnum: 1
        },
        {
            cor: '#287A23',
            icone: false,
            titulo: 'Laboratórios de anatomia, fisiologia e simulação realística',
            img: 'assets/icons/lab.svg',
            tipoCardEnum: 1
        },
        {
            cor: '#4e9d4e',
            icone: false,
            titulo: 'Professores experientes e atuantes no mercado',
            img: 'assets/icons/educacao.png',
            tipoCardEnum: 1
        },
        {
            cor: '#287A23',
            icone: false,
            titulo: ' Estágios garantidos em instituições parceiras',
            img: 'assets/icons/around-the-world.png',
            tipoCardEnum: 1
        }
    ]

    constructor() { }

    ngOnInit() {
        this.header = this.curso()?.topicos
            .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Header);
        
        this.atuacao = this.curso()?.topicos
            .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Atuacao);

        this.aprendizado = this.curso()?.topicos
            .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Aprendizado);

        this.duracao = this.curso()?.topicos
            .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Duracao);

        this.mensalidade = this.curso()?.topicos
            .find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Mensalidade);
    }

}
