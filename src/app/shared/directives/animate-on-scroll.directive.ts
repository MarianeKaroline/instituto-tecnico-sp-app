import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Directive({
    selector: '[appAnimateOnScroll]'
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
    @Input('appAnimateOnScroll') animationClass = 'fadeInUp';

    @Output() visible = new EventEmitter<boolean>();

    @HostBinding('class.animated') animated = true;
    @HostBinding('class') elementClass = '';

    private observer!: IntersectionObserver;

    constructor(private el: ElementRef) { }

    ngOnInit(): void {
        if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
            this.observer = new IntersectionObserver(
                entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.visible.emit(true);
                            this.elementClass = this.animationClass;
                            this.observer?.unobserve(this.el.nativeElement);
                        }
                    });
                },
                { threshold: 0.2 }
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
