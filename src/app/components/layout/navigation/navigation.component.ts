import { CommonModule } from '@angular/common';
import { Component, computed, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { ScreenSizeService } from '../../../common/core/services/screen-size.service';
import { filter } from 'rxjs';

@Component({
    selector: 'app-layout-navigation',
    templateUrl: './navigation.component.html',
    styleUrl: './navigation.component.scss',
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
    ]
})
export class LayoutNavigationComponent {

    @ViewChild('expandButton') expandButton!: ElementRef;
    @ViewChild('expandMenu') expandMenu!: ElementRef;

    private screen = inject(ScreenSizeService);
    private router = inject(Router);

    isMobile = this.screen.isMobile;

    currentUrl = signal(this.router.url);
    expand = signal(false);

    constructor() {
        this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe((event: NavigationEnd) => {
                this.currentUrl.set(event.urlAfterRedirects);
            });
    }

    isHome = computed(() => this.currentUrl() === '/');
    isCurso = computed(() => this.currentUrl() === '/cursos');
    isContato = computed(() => this.currentUrl() === '/contato');
    isSobreNos = computed(() => this.currentUrl() === '/sobre-nos');
    isMatriculeSe = computed(() => this.currentUrl() === '/matricula');
    isTrabalheConosco = computed(() => this.currentUrl() === '/trabalhe-conosco');

    setExpand(open: boolean): void {
        this.expand.set(open);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: MouseEvent) {
        const clickedInsideButton = this.expandButton?.nativeElement.contains(event.target);
        const clickedInsideMenu = this.expandMenu?.nativeElement.contains(event.target);

        if (!clickedInsideButton && !clickedInsideMenu && this.expand()) {
            this.setExpand(false);
        }
    }

}
