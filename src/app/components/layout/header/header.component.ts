import { AfterViewInit, Component, ElementRef, EventEmitter, HostListener, Output, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-layout-header',
    imports: [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class LayoutHeaderComponent implements AfterViewInit {

    isSticky = false;
    topOffset = 0;

    @Output() setIsticky = new EventEmitter<boolean>();

    @ViewChild('stickyRef') stickyElement!: ElementRef;

    ngAfterViewInit(): void {
        // Garante que o elemento está presente
        if (this.stickyElement) {
            this.topOffset = this.stickyElement.nativeElement.offsetTop;
        }
    }

    @HostListener('window:scroll', [])
    onWindowScroll(): void {
        if (this.stickyElement) {
            this.isSticky = window.scrollY >= this.topOffset;
            this.setIsticky.emit(this.isSticky);
        }
    }

}
