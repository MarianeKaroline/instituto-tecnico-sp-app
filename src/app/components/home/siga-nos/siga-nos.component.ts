import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HomeSigaNosCarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'app-home-siga-nos',
    templateUrl: './siga-nos.component.html',
    styleUrl: './siga-nos.component.scss',
    imports: [
        MatIconModule,
        HomeSigaNosCarouselComponent
    ]
})
export class HomeSigaNosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
