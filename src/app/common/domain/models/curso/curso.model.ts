import { TipoTopicoCursoEnum } from "../../enums/tipo-topico-curso.enum";

export interface CursoModel {
    cursoId: number;
    nome: string;
    categoria: string;
    urlImagem: string;
    topicos: CursoTopicoModel[];
    sessoes: CursoVendaModel[];
    modulos: CursoModuloModel[];
    faq: CursoPerguntaRespostaModel[];
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
    tipoCardEnum: number;
}

export interface CursoVendaModel {
    titulo: string;
    descricao: string;
    conteudos: CursoVendaConteudoModel[];
}

export interface CursoVendaConteudoModel {
    titulo: string;
    descricao: string;
    subtitulo: string;
    image: string;
    video: string;
    alt: string;
    cor: string;
    linkVenda: string;
    card: boolean;
    icone: boolean;
}

export interface CursoModuloModel {
    titulo: string;
    topicos: string[];
}

export interface CursoPerguntaRespostaModel {
    pergunta: string;
    resposta: string;
}