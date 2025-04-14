import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutHeaderComponent } from './components/layout/header/header.component';
import { LayoutFooterComponent } from './components/layout/footer/footer.component';

@Component({
    selector: 'app-root',
    imports: [
        RouterOutlet,

        LayoutHeaderComponent,
        LayoutFooterComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    title = 'instituto-tecnico-sp-app';
}
