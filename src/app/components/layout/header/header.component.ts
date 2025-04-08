import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
    selector: 'app-layout-header',
    imports: [
        RouterModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class LayoutHeaderComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
