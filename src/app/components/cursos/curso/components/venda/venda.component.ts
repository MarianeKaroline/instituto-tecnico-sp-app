import { Component, inject, input, OnInit } from '@angular/core';
import { CursoModel, CursoModuloModel, CursoPerguntaRespostaModel, CursoVendaConteudoModel, CursoVendaModel } from '../../../../../common/domain/models/curso/curso.model';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardComponent, DataCard } from '../../../../../shared/components/card/card.component';
import { CursoAvaliacoesComponent } from '../avaliacoes/avaliacoes.component';
import { CursoCarouselComponent } from '../carousel/carousel.component';
import { CursoCarouselModulosComponent } from '../carousel-modulos/carousel-modulos.component';
import { MatDialog } from '@angular/material/dialog';
import { take } from 'rxjs';
import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { CommonModule } from '@angular/common';
import { ItspUtils } from '../../../../../core/utils/itsp-utils';

@Component({
    selector: 'app-curso-venda',
    templateUrl: './venda.component.html',
    styleUrls: ['./venda.component.scss'],
    imports: [
        CommonModule,
        MatIconModule,
        MatExpansionModule,
        CardComponent,
        CursoCarouselComponent,
        CursoAvaliacoesComponent,
        CursoCarouselModulosComponent,
        RouterModule
    ]
})
export class CursoVendaComponent implements OnInit {

    curso = input<CursoModel | null>();
    avatares = input<number[]>();

    readonly dialog = inject(MatDialog);

    cardsHeader: DataCard[] = [];
    cardsEntrarNoCurso: DataCard[] = [];

    sessao1: CursoVendaModel | null | undefined = null;
    sessao2: CursoVendaModel | null | undefined = null;
    sessao3: CursoVendaModel | null | undefined = null;
    sessao4: CursoVendaModel | null | undefined = null;
    sessao5: CursoVendaModel | null | undefined = null;
    sessao6: CursoVendaModel | null | undefined = null;
    sessao7: CursoVendaModel | null | undefined = null;
    sessao8: CursoVendaModel | null | undefined = null;
    sessao9: CursoVendaModel | null | undefined = null;

    conteudo8: CursoVendaConteudoModel[] = [];

    image5: string | null | undefined = null;
    alt5: string | null | undefined = null;
    image: string | null | undefined = null;

    ngOnInit(): void {
        this.sessao1 = this.curso()?.sessoes.at(0);
        this.sessao2 = this.curso()?.sessoes.at(1);
        this.sessao3 = this.curso()?.sessoes.at(2);
        this.sessao4 = this.curso()?.sessoes.at(3);
        this.sessao5 = this.curso()?.sessoes.at(4);
        this.sessao6 = this.curso()?.sessoes.at(5);
        this.sessao7 = this.curso()?.sessoes.at(6);
        this.sessao8 = this.curso()?.sessoes.at(7);
        this.sessao9 = this.curso()?.sessoes.at(8);

        this.cardsHeader = this.sessao2?.conteudos.filter(c => c.card).map(c => {
            return <DataCard> {
                titulo: c.titulo,
                descricao: c.descricao,
                img: c.image,
                icone: c.icone,
                cor: c.cor,
                tipoCardEnum: 1
            }
        }) ?? [];

        this.cardsEntrarNoCurso = this.sessao5?.conteudos.filter(c => c.card).map(c => {
            return <DataCard> {
                titulo: c.titulo,
                descricao: c.descricao,
                img: c.image,
                icone: c.icone,
                cor: c.cor,
                tipoCardEnum: 2
            }
        }) ?? [];

        this.image = this.sessao8?.conteudos.find(c => ItspUtils.isNullOrEmpty(c.titulo) && !ItspUtils.isNullOrEmpty(c.image))?.image;
        this.image5 = this.sessao5?.conteudos.find(c => ItspUtils.isNullOrEmpty(c.titulo) && !ItspUtils.isNullOrEmpty(c.image))?.image;
        this.alt5 = this.sessao5?.conteudos.find(c => ItspUtils.isNullOrEmpty(c.titulo) && !ItspUtils.isNullOrEmpty(c.image))?.alt;

        if (this.sessao8) 
            this.conteudo8 = this.sessao8.conteudos?.filter(c => !ItspUtils.isNullOrEmpty(c.titulo));
    }

    openDialogVideo(video: string, title: string): void {
        this.dialog.open(
            DialogComponent,
            {
                width: '500px',
                height: '20rem',
                data: {
                    video: video,
                    youtube: true,
                    title: title
                },
                panelClass: 'custom'
            }
        )
            .afterClosed()
            .pipe(
                take(1)
            )
            .subscribe()
    }

    scrollToSection(sectionId: string): void {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }

}
