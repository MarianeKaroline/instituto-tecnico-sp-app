import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, useAnimation } from '@angular/animations';

import { fadeInUp, slideInLeft } from 'ngx-animate';

import { HomeMotivoEscolhaCarouselComponent } from './carousel/carousel.component';
import { AnimateOnScrollDirective } from '../../../../shared/directives/animate-on-scroll.directive';
import { CardComponent, DataCard } from '../../../../shared/components/card/card.component';
import { ScreenSizeService } from '../../../../common/core/services/screen-size.service';

@Component({
    selector: 'app-home-motivo-escolha',
    templateUrl: './motivo-escolha.component.html',
    animations: [
        trigger('fadeInUpOnEnter', [
            transition('* => in', useAnimation(fadeInUp, {
                params: { timing: '0.8' }
            })),
            transition('* => out', [])
        ]),        
        trigger('slideInLeftOnEnter', [
            transition('* => in', useAnimation(slideInLeft, {
                params: { 
                    timing: '0.8',
                    delay: '{{ delay }}'
                }
            })),
            transition('* => out', [])
        ])
    ],
    imports: [
        CommonModule, 
        MatIconModule,
        AnimateOnScrollDirective,
        
        HomeMotivoEscolhaCarouselComponent,
        CardComponent
    ]
})
export class HomeMotivoEscolhaComponent {

    private screen = inject(ScreenSizeService);

    isMobile = this.screen.isMobile;
    animateText = 'out';
    animateCards = 'out';

    cards: DataCard[] = [
        {
            cor: '#4e9d4e',
            icone: false,
            titulo: 'Laboratórios Modernos',
            descricao: 'Equipados com tecnologia de ponta para aulas práticas.',
            img: 'assets/icons/lab.svg',
            tipoCardEnum: 1
        },
        {
            cor: '#287A23',
            icone: false,
            titulo: 'Professores Qualificados',
            descricao: 'Corpo docente experiente e atualizado com as demandas do mercado.',
            img: 'assets/icons/educacao.png',
            tipoCardEnum: 1
        },
        {
            cor: '#4e9d4e',
            icone: false,
            titulo: 'Infraestrutura Completa',
            descricao: 'Salas climatizadas e adaptadas para melhor aprendizado.',
            img: 'assets/icons/education.svg',
            tipoCardEnum: 1
        },
        {
            cor: '#287A23',
            icone: false,
            titulo: 'Conexão com o Mercado',
            descricao: 'Parcerias estratégicas para estágio e empregabilidade.',
            img: 'assets/icons/connection.svg',
            tipoCardEnum: 1
        }
    ]

    delays = this.cards.map((_, i) => i * 0.2).sort((a, b) => b - a);

}
