import { Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Title } from '@angular/platform-browser';

import { filter, map, mergeMap } from 'rxjs';

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
    private activatedRoute = inject(ActivatedRoute);
    private titleService = inject(Title);

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

        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd),
                map(() => {
                    let route = this.activatedRoute;
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter(route => route.outlet === 'primary'),
                mergeMap(route => route.data)
            )
            .subscribe(data => {
                if (data['title']) {
                    this.titleService.setTitle(data['title']);
                }
            });
    }
}
