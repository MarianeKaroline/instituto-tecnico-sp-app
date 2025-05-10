import { isPlatformBrowser } from '@angular/common';
import { computed, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

export type TailwindBreakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

@Injectable({
    providedIn: 'root'
})
export class ScreenSizeService {
    private readonly breakpoints: Record<TailwindBreakpoint, number> = {
        base: 0,
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        '2xl': 1536,
    };

    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser = isPlatformBrowser(this.platformId);
    private readonly currentWidth = signal(0);

    readonly breakpoint = computed<TailwindBreakpoint>(() => {
        const width = this.currentWidth();
        if (width >= this.breakpoints['2xl']) return '2xl';
        if (width >= this.breakpoints.xl) return 'xl';
        if (width >= this.breakpoints.lg) return 'lg';
        if (width >= this.breakpoints.md) return 'md';
        if (width >= this.breakpoints.sm) return 'sm';
        return 'base';
    });

    readonly isMobile = computed(() => this.currentWidth() < this.breakpoints.md);
    readonly isTablet = computed(() =>
        this.currentWidth() >= this.breakpoints.md &&
        this.currentWidth() < this.breakpoints.lg
    );
    readonly isDesktop = computed(() => this.currentWidth() >= this.breakpoints.lg);

    constructor() {
        if (this.isBrowser) {
            const updateWidth = () => this.currentWidth.set(window.innerWidth);

            effect(() => {
                window.addEventListener('resize', updateWidth);
                updateWidth(); // inicializa
                return () => window.removeEventListener('resize', updateWidth);
            });
        }
    }
}
