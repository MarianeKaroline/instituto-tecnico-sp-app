import { trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, ElementRef, signal, viewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { EmblaCarouselDirective, EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay'

import { fadeIn, fadeInUp, slideInLeft, slideInRight } from 'ngx-animate';

@Component({
    selector: 'app-home-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInRightOnEnter', [
            transition('* => in', useAnimation(slideInRight, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
        trigger('slideInLeftOnEnter', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
        trigger('fadeInOnEnter', [
            transition('* => in', useAnimation(fadeIn, {
                params: { timing: '0.8', easing: 'ease-out' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule,
        RouterModule,
        EmblaCarouselDirective,
        MatIconModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeCarouselComponent {
    
    avatares = Array.from({length: 4}, (_, i) => i + 1);

    emblaRef = viewChild(EmblaCarouselDirective)

    public emblaApi?: EmblaCarouselType
    public options: EmblaOptionsType = {
        axis: 'y',
        loop: true
    }

    public plugins = [Autoplay()]
    scrollSnaps = signal<number[]>([])
    prevBtnEnabled = signal(false)
    nextBtnEnabled = signal(false)
    selectedIndex = signal(0)
    subscribeToEvents: EmblaEventType[] = ['init', 'reInit', 'select', 'scroll'];

    isActiveSlide = (index: number) => {
        return computed(() => this.selectedIndex() === index);
    };

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
        this.emblaApi = emblaApi;

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

    observeElement(el: ElementRef, callback: () => void) {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
            callback();
            observer.unobserve(entry.target);
            }
        }, { threshold: 0.3 });

        observer.observe(el.nativeElement);
    }

}
