import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

import { CountUp } from 'countup.js';

@Directive({
    selector: '[appCountUpOnScroll]'
})
export class CountUpOnScrollDirective implements OnInit, OnDestroy {

    @Input('appCountUpOnScroll') endValue = 0;
    @Input() prefix = '';
    @Input() suffix = '';
    @Input() duration = 2;

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const countUp = new CountUp(this.el.nativeElement, this.endValue, {
                                duration: this.duration,
                                prefix: this.prefix,
                                suffix: this.suffix
                            });

                            if (!countUp.error) {
                                countUp.start();
                            } else {
                                console.error(countUp.error);
                            }

                            this.observer.unobserve(this.el.nativeElement);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            this.observer.observe(this.el.nativeElement);
        }
    }

    ngOnDestroy(): void {
        if (this.observer) {
            this.observer.disconnect();
        }
    }

}
