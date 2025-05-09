import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, signal, viewChild } from '@angular/core';

import { EmblaCarouselType, EmblaOptionsType, EmblaEventType, EmblaCarouselDirective } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';
import { HomeDepoimentosAvaliacoesCarouselComentarioComponent } from './comentario/comentario.component';
import { DepoimentoModel } from '../../../../../../common/domain/models/depoimento/depoimento.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home-depoimentos-avaliacoes-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    imports: [
        CommonModule,
        EmblaCarouselDirective,
        MatIconModule,

        HomeDepoimentosAvaliacoesCarouselComentarioComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeDepoimentosAvaliacoesCarouselComponent {

    depoimentos: DepoimentoModel[] = [
        {
            nome: "Geisa Moda",
            comentario: "Melhor experiência possível super atenciosos e pacientes desdo primeiro atendimento pra tirar todas as dúvidas. O Guilherme nem se fala muito educado me explicou tudo certinho tirou todas as dúvidas podem se matrícular sem medo... Ansiosa pra começa a turma 🥰☺ voltando aqui já comecei minha turma... Podem vir sem medo já vamos pra estágio melhor escolha que fiz foi escolher a ITSP pra estudar"
        },
        {
            nome: "Bruna Batista Pereira",
            comentario: "O estudo não é apenas um meio para alcançar sucesso, mas também uma forma de expandir a mente e enriquecer a alma.Acreditar em si mesmo é o primeiro passo para o sucesso. É ter fé em seus sonhos, confiança em suas habilidades e coragem para enfrentar os desafios."
        },
        {
            nome: "Priscila Nascimento",
            comentario: "Tem sido umas das melhores experiências, ótimos professores, coordenadores, recepcionistas, diretora. Tem um bom atendimento e são profissionais que se preocupam com você ."
        },
        {
            nome: "Flávio Brandão",
            comentario: "Profissionais excelentes e capacitados. Escola ótima para que quer se aprofundar e se qualificar na área da saúde!"
        },
        {
            nome: "Cláudia Cristina Salvador Abreu",
            comentario: "Sou aluna da itsp e gosto muito O corpo docente é de excelente qualidade O ensino Eu super recomendo"
        }
    ];

    emblaRef = viewChild(EmblaCarouselDirective);

    public emblaApi?: EmblaCarouselType
    public options: EmblaOptionsType = {
        loop: true,
        duration: 30
    }

    public plugins = [Autoplay(), Fade()]
    scrollSnaps = signal<number[]>([])
    prevBtnEnabled = signal(false)
    nextBtnEnabled = signal(false)
    selectedIndex = signal(0)
    subscribeToEvents: EmblaEventType[] = ['init', 'reInit', 'select', 'scroll']

    scrollPrev() {
        this.emblaRef()?.scrollPrev()
    }

    scrollNext() {
        this.emblaRef()?.scrollNext()
    }

    scrollTo(index: number) {
        this.emblaRef()?.scrollTo(index)
    }

    onEmblaChange(type: EmblaEventType, emblaApi: EmblaCarouselType) {
        if (type === 'init') {
            this.scrollSnaps?.set(emblaApi?.scrollSnapList())
        }

        if (type === 'select' || type === 'init' || type === 'reInit') {
            this.selectedIndex?.set(emblaApi?.selectedScrollSnap())
            this.prevBtnEnabled?.set(emblaApi?.canScrollPrev())
            this.nextBtnEnabled?.set(emblaApi?.canScrollNext())
            return
        }
    }

}
