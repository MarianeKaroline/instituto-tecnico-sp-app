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
    topicos: TopicoModel[];
}

export interface TopicoModel {
    img?: string;
    index?: number;
    titulo: string;
    descricao?: string;
    cor: string;
    icone: boolean;
    tipoCard: number;
}