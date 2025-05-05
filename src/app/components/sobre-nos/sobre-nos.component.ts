import { Component, OnInit } from '@angular/core';

import { CountUpOnScrollDirective } from '../../shared/directives/count-up-on-scroll.directive';
import { HomeDepoimentosAvaliacoesComponent } from '../home/components/depoimentos/avaliacoes/avaliacoes.component';
import { HomeCursosComponent } from '../home/components/cursos/cursos.component';

@Component({
    selector: 'app-sobre-nos',
    templateUrl: './sobre-nos.component.html',
    styleUrl: './sobre-nos.component.scss',
    imports: [        
        CountUpOnScrollDirective,
        HomeDepoimentosAvaliacoesComponent,
        HomeCursosComponent
    ]
})
export class SobreNosComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
