import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { trigger, transition, useAnimation } from '@angular/animations';

import { fadeInUp, slideInLeft } from 'ngx-animate';

import { HomeMotivoEscolhaCarouselComponent } from './carousel/carousel.component';
import { AnimateOnScrollDirective } from '../../../shared/directives/animate-on-scroll.directive';
import { CardComponent, DataCard } from '../../../shared/components/card/card.component';

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
        
        CardComponent,
        HomeMotivoEscolhaCarouselComponent
    ]
})
export class HomeMotivoEscolhaComponent {

    animateText = 'out';
    animateCards = 'out';

    cards: DataCard[] = [
        {
            cor: '#005200',
            icone: false,
            titulo: 'Laboratórios Modernos',
            descricao: 'Equipados com tecnologia de ponta para aulas práticas.',
            img: 'assets/icons/lab.png',
            tipoCard: 1
        },
        {
            cor: '#8BC34A',
            icone: false,
            titulo: 'Professores Qualificados',
            descricao: 'Corpo docente experiente e atualizado com as demandas do mercado.',
            img: 'assets/icons/higher-education.png',
            tipoCard: 1
        },
        {
            cor: '#005200',
            icone: false,
            titulo: 'Infraestrutura Completa',
            descricao: 'Salas climatizadas e adaptadas para melhor aprendizado.',
            img: 'assets/icons/presentation.png',
            tipoCard: 1
        },
        {
            cor: '#8BC34A',
            icone: false,
            titulo: 'Conexão com o Mercado',
            descricao: 'Parcerias estratégicas para estágio e empregabilidade.',
            img: 'assets/icons/around-the-world.png',
            tipoCard: 1
        }
    ]

    delays = this.cards.map((_, i) => i * 0.2).sort((a, b) => b - a);

}
