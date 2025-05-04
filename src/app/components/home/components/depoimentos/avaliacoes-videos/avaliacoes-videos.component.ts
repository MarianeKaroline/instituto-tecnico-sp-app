import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home-depoimentos-avaliacoes-videos',
    templateUrl: './avaliacoes-videos.component.html',
    styleUrl: './avaliacoes-videos.component.scss',
    imports: [
        MatIconModule
    ]
})
export class HomeDepoimentosAvaliacoesVideosComponent {

    video: string = 'assets/videos/depoimento-1.mp4';

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
        }
    ]

}
