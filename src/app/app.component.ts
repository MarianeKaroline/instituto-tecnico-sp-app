import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { LayoutHeaderComponent } from './components/layout/header/header.component';
import { LayoutFooterComponent } from './components/layout/footer/footer.component';
import { ScreenSizeService } from './common/core/services/screen-size.service';
import { LayoutNavigationComponent } from './components/layout/navigation/navigation.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        MatIconModule,

        LayoutHeaderComponent,
        LayoutFooterComponent,
        LayoutNavigationComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {    

    private screen = inject(ScreenSizeService);
    private platformId = inject(PLATFORM_ID);
    private router = inject(Router);

    breakpoint = this.screen.breakpoint;
    isMobile = this.screen.isMobile;
    isTablet = this.screen.isTablet;
    isDesktop = this.screen.isDesktop;

    isSticky = false;

    setIsticky(isSticky: boolean): void {
        this.isSticky = isSticky;
    }

    constructor() {
        if (isPlatformBrowser(this.platformId)) {
            this.router.events.subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }
            });
        }
    }
}
