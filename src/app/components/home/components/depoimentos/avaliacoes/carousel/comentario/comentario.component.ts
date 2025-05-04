import { Component, input } from '@angular/core';

import { DepoimentoModel } from '../../../../../../../common/domain/models/depoimento/depoimento.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home-depoimentos-avaliacoes-carousel-comentario',
    templateUrl: './comentario.component.html',
    imports: [
        MatIconModule
    ]
})
export class HomeDepoimentosAvaliacoesCarouselComentarioComponent {

    depoimento = input<DepoimentoModel>();

}
