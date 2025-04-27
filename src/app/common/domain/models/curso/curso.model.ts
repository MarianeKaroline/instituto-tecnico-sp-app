import { TipoTopicoCursoEnum } from "../../enums/tipo-topico-curso.enum";

export interface CursoModel {
    cursoId: number;
    nome: string;
    categoria: string;
    urlImagem: string;
    topicos: CursoTopicoModel[];
}

export interface CursoTopicoModel {
    tipoTopicoCursoEnum: TipoTopicoCursoEnum;
    cards: CardModel[];
    storageKey?: string;
}

export interface CardModel {
    img?: string;
    titulo: string;
    descricao?: string;
    cor: string;
    icone: boolean;
    tipoCard: number;
}