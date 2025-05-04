import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import { LayoutHeaderComponent } from './components/layout/header/header.component';
import { LayoutFooterComponent } from './components/layout/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [
        CommonModule,
        RouterOutlet,
        MatIconModule,

        LayoutHeaderComponent,
        LayoutFooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    
    isSticky = false;

    setIsticky(isSticky: boolean): void {
        this.isSticky = isSticky;
    }
}
