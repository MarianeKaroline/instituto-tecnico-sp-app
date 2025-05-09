import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HomeDepoimentosAvaliacoesCarouselComponent } from './carousel/carousel.component';

@Component({
    selector: 'app-curso-avaliacoes',
    templateUrl: './avaliacoes.component.html',
    styleUrl: './avaliacoes.component.scss',
    imports: [
        MatIconModule,
        HomeDepoimentosAvaliacoesCarouselComponent
    ]
})
export class CursoAvaliacoesComponent {

    avatares = Array.from({length: 4}, (_, i) => i + 1)

}
