import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal, viewChild } from '@angular/core';

import { EmblaCarouselDirective, EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel-angular';

@Component({
    selector: 'app-curso-carousel-modulos',
    templateUrl: './carousel-modulos.component.html',
    styleUrl: './carousel-modulos.component.scss',
    imports: [
        CommonModule,
        EmblaCarouselDirective
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CursoCarouselModulosComponent {

    modulos = input<any[]>();

    slides = [...Array(30).keys()];

    emblaRef = viewChild(EmblaCarouselDirective)

    public emblaApi?: EmblaCarouselType
    public options: EmblaOptionsType = {
        align: 'start'
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
