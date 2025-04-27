import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { EmblaCarouselDirective, EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel-angular';
import { CursoListaModel } from '../../../../../common/domain/models/curso-lista.model';
import { HomeCursosCardComponent } from '../card/card.component';

@Component({
    selector: 'app-home-cursos-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    imports: [
        CommonModule,
        EmblaCarouselDirective,
        MatIconModule,

        HomeCursosCardComponent
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCursosCarouselComponent {

    public cursos = input<CursoListaModel[]>([]);

    emblaRef = viewChild(EmblaCarouselDirective)

    public emblaApi?: EmblaCarouselType
    public options: EmblaOptionsType = {
        loop: true
    }

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
