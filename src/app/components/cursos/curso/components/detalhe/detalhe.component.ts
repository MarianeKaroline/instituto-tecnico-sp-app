import { Component, computed, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { CardComponent, DataCard } from '../../../../../shared/components/card/card.component';
import { CursoAvaliacoesComponent } from '../avaliacoes/avaliacoes.component';
import { CursoCarouselComponent } from '../carousel/carousel.component';
import { CardModel, CursoModel } from '../../../../../common/domain/models/curso/curso.model';
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
export class CursoDetalheComponent {

    curso = input<CursoModel | null>();
    avatares = input<number[]>();
    
    cardsGerais: CardModel[] | undefined;
    cardsAtuacao: CardModel[] | undefined;
    cardsAprendizado: CardModel[] | undefined;
    cardsDuracao: CardModel[] | undefined;

    header = computed(() => this.curso()?.topicos.find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Header));
    atuacao = computed(() => this.curso()?.topicos.find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Atuacao));
    aprendizado = computed(() => this.curso()?.topicos.find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Aprendizado));
    duracao = computed(() => this.curso()?.topicos.find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Duracao));
    mensalidade = computed(() => this.curso()?.topicos.find(t => t.tipoTopicoCursoEnum == TipoTopicoCursoEnum.Mensalidade));
    
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
            titulo: 'Professores, mestres e doutores experientes e atuantes no mercado de trabalho',
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

}
