import { Component, computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { trigger, transition, useAnimation, animate, style } from '@angular/animations';

import { slideInLeft, slideInRight, fadeInUp } from 'ngx-animate';

import { take } from 'rxjs';

import { DialogComponent } from '../../../../../shared/components/dialog/dialog.component';
import { AnimateOnScrollDirective } from '../../../../../shared/directives/animate-on-scroll.directive';
import { ScreenSizeService } from '../../../../../common/core/services/screen-size.service';

@Component({
    selector: 'app-home-depoimentos-avaliacoes-videos',
    templateUrl: './avaliacoes-videos.component.html',
    styleUrl: './avaliacoes-videos.component.scss',
    animations: [
        trigger('universalEnter', [
            transition('* => in', [
                style({ opacity: 0, transform: '{{transform}}' }),
                animate('{{timing}} {{easing}}', style({ opacity: 1, transform: 'none' }))
            ], 
            { params: { 
                timing: '0.8s', 
                easing: 'ease-out', 
                transform: 'translateX(0)',
                delay: '{{ delay }}',
            } 
        })
        ])
    ],
    imports: [
        CommonModule,
        AnimateOnScrollDirective,
        MatIconModule
    ]
})
export class HomeDepoimentosAvaliacoesVideosComponent {

    animateCards = 'out';

    readonly dialog = inject(MatDialog);

    private screen = inject(ScreenSizeService);
    isMobile = this.screen.isMobile;

    videos = [
        {
            img: 'assets/images/depoimento-1.png',
            video: 'assets/videos/depoimento-1.mp4',
            depoimento: 'Os professores aqui dá o maior apoio, desde a direção, todo o pessoal tá de parabéns...',
            nome: 'Tati'
        },
        {
            img: 'assets/images/depoimento-2.png',
            video: 'assets/videos/depoimento-2.mp4',
            depoimento: 'Amei todo mundo da coordenação, eles foram simplesmente maravilhosos, me atenderam super bem, me explicaram tudo, e aqui tô aqui, realizando esse sonho agora, depois de tanto tempo querendo realizá-lo...',
            nome: 'Sirlene'
        },
        {
            img: 'assets/images/depoimento-3.png',
            video: 'assets/videos/depoimento-3.mp4',
            depoimento: 'To amando a escola! Os professores são maravilhosos, tira suas dúvidas quantas vezes você precisar; A direção sempre pronta pra atender, pra tá ali junto com você...',
            nome: 'Valdirene'
        },
        {
            img: 'assets/images/depoimento-4.png',
            video: 'assets/videos/depoimento-4.mp4',
            depoimento: 'Chegando aqui no Instituto São Paulo, fui bem recebida, muito bem acolhida pelas professoras, pela direção...',
            nome: 'Aparecida'
        },
        {
            img: 'assets/images/depoimento-5.png',
            video: 'assets/videos/depoimento-5.mp4',
            depoimento: 'Eu amo a ITSP pra falar a verdade pra vocês. Eu pesquisei muito antes de chegar aqui...',
            nome: 'Priscila'
        }
    ]

    openDialogVideo(video: string): void {
        this.dialog.open(
            DialogComponent,
            {
                width: '250px',
                data: video,
                panelClass: 'custom'
            }
        )
            .afterClosed()
            .pipe(
                take(1)
            )
            .subscribe()
    }

    delays = this.videos.map((_, i) => i * 0.2).sort((a, b) => b - a);

}
