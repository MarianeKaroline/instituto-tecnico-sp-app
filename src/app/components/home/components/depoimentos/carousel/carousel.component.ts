import { trigger, transition, useAnimation } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, output, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { EmblaCarouselDirective, EmblaCarouselType, EmblaOptionsType, EmblaEventType } from 'embla-carousel-angular';
import Autoplay from 'embla-carousel-autoplay';
import { fadeInUp } from 'ngx-animate';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';

@Component({
    selector: 'app-home-depoimentos-carousel',
    templateUrl: './carousel.component.html',
    styleUrl: './carousel.component.scss',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),
    ],
    imports: [
        CommonModule,
        EmblaCarouselDirective,
        AnimateOnScrollDirective,
        MatButtonModule
    ]
})
export class HomeDepoimentosCarouselComponent {

    animateCard = 'out';
    emblaRef = viewChild(EmblaCarouselDirective)

    public options: EmblaOptionsType = {
        loop: true
    }

    public plugins = [Autoplay()]
    scrollSnaps = signal<number[]>([])
    prevBtnEnabled = signal(false)
    nextBtnEnabled = signal(false)
    selectedIndex = signal(0)
    subscribeToEvents: EmblaEventType[] = ['init', 'reInit', 'select', 'scroll'];

    playedVideos: Set<string> = new Set();

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

        const TWEEN_FACTOR_BASE = 0.52;
        const TWEEN_FACTOR_SCALE = 0.52;
        const engine = emblaApi?.internalEngine();
        const scrollProgress = emblaApi.scrollProgress();
        const tweenFactor = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
        const tweenFactorScale = TWEEN_FACTOR_SCALE * emblaApi.scrollSnapList().length;

        const iframes = document.querySelectorAll<HTMLIFrameElement>('.embla iframe');

        iframes.forEach((iframe: HTMLIFrameElement) => {
            if (this.playedVideos.has(iframe.src)) {
                const src = iframe.src;
                iframe.src = src;
                this.playedVideos.delete(src);
            }
        });

        emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
            let diffToTarget = scrollSnap - scrollProgress;
            const slidesInSnap = engine.slideRegistry[snapIndex];

            slidesInSnap.forEach((slideIndex) => {

                if (engine.options.loop) {
                    engine.slideLooper.loopPoints.forEach((loopItem) => {
                        const target = loopItem.target();

                        if (slideIndex === loopItem.index && target !== 0) {
                            const sign = Math.sign(target);

                            if (sign === -1) {
                                diffToTarget = scrollSnap - (1 + scrollProgress);
                            }
                            if (sign === 1) {
                                diffToTarget = scrollSnap + (1 - scrollProgress);
                            }
                        }
                    });
                }

                const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor);
                const opacity = this.numberWithinRange(tweenValue, 0, 1).toString();
                emblaApi.slideNodes()[slideIndex].style.opacity = opacity;

                const tweenValueScale = 1 - Math.abs(diffToTarget * tweenFactorScale);
                const scale = this.numberWithinRange(tweenValueScale, 0, 1).toString();
                const tweenNodes = emblaApi.slideNodes().map((slideNode) => {
                    return slideNode.querySelector('.embla__slide__img') as HTMLElement
                });

                const tweenNode = tweenNodes[slideIndex];
                tweenNode.style.transform = `scale(${scale})`;
            });

        });

        if (type === 'select' || type === 'init' || type === 'reInit') {
            this.selectedIndex?.set(emblaApi?.selectedScrollSnap())
            this.prevBtnEnabled?.set(emblaApi?.canScrollPrev())
            this.nextBtnEnabled?.set(emblaApi?.canScrollNext())
            return
        }
    }

    numberWithinRange(number: number, min: number, max: number): number {
        return Math.min(Math.max(number, min), max);
    }

    markVideoAsPlayed(event: Event) {
        const iframe = event.target as HTMLIFrameElement;
        if (iframe && iframe.src) {
            this.playedVideos.add(iframe.src);
            console.log(this.playedVideos)
        }
    }

}
