import { CommonModule } from '@angular/common';
import { Component, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { EmblaCarouselDirective, EmblaCarouselType, EmblaOptionsType, EmblaEventType } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay';

@Component({
    selector: 'app-home-depoimentos-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    imports: [
        CommonModule,
        EmblaCarouselDirective,
        MatButtonModule
    ]
})
export class HomeDepoimentosCarouselComponent {

    emblaRef = viewChild(EmblaCarouselDirective)

    public emblaApi?: EmblaCarouselType
    public options: EmblaOptionsType = {
        loop: true
    }

    public plugins = [Autoplay()]
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
            console.log(type)
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
