import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-layout-footer',
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
    imports: [
        CommonModule,
        MatIconModule,
        RouterModule
    ]
})
export class LayoutFooterComponent {
    data = new Date();
}
