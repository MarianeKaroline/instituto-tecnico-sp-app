import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { CursoModel } from '../../../common/domain/models/curso/curso.model';
import { TipoTopicoCursoEnum } from '../../../common/domain/enums/tipo-topico-curso.enum';

@Injectable()
export class CursoService {

    private _curso = signal<CursoModel | null>(null);
    public readonly curso = this._curso.asReadonly();

    constructor(
        private _http: HttpClient
    ) { }

    public obter(cursoNome: string): void {
        const curso = this._obter(cursoNome);
        this._curso.set(curso);
    }

    private _obter(cursoNome: string): CursoModel | null {
        var model: CursoModel | null = null;
        if (cursoNome == 'tecnico-em-enfermagem') {

            model = {
                cursoId: 1,
                nome: 'Curso Técnico em Enfermagem',
                categoria: 'Saúde',
                urlImagem: 'assets/images/Banner-01.png',
                topicos: [
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Geral,
                        topicos: [
                            {
                                img: 'assets/icons/training.png',
                                titulo: 'Entre Rápido no Mercado',
                                descricao: 'Ideal para quem quer iniciar logo uma carreira na área da saúde, com formação técnica e prática.',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                img: 'assets/icons/working.png',
                                titulo: 'Tenha Estabilidade Profissional',
                                descricao: 'A enfermagem é uma das profissões mais procuradas e valorizadas, com alta demanda no mercado.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                img: 'assets/icons/next-level.png',
                                titulo: 'Suba de Nível na Carreira',
                                descricao: 'Para quem já atua na saúde e deseja se profissionalizar com mais técnicas e certificações.',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                img: 'assets/icons/social-services.png',
                                titulo: 'Faça a Diferença na Vida das Pessoas',
                                descricao: 'Se você sente vocação em cuidar, esse curso é pra você — transforme sua empatia em profissão.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 1
                            }
                        ]
                    },
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Atuacao,
                        topicos: [
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Hospitais públicos e privados',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Clínicas e ambulatórios',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Home care (atendimento domiciliar)',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Postos e unidades básicas de saúde',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Consultórios e creches',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Instituições de longa permanência',
                                tipoCard: 1
                            }
                        ]
                    },
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Aprendizado,
                        topicos: [
                            {
                                index: 1,
                                titulo: 'Técnicas de Primeiros Socorros',
                                descricao: 'Aprenda a fazer curativos, administrar medicamentos e agir em situações de emergência.',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                index: 2,
                                titulo: 'Coletas e Procedimentos Clínicos',
                                descricao: 'Domine a punção venosa, a coleta de exames e o monitoramento dos sinais vitais.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                index: 3,
                                titulo: 'Vacinação e Suporte Médico',
                                descricao: 'Aplicação de vacinas e assistência em procedimentos médicos',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                index: 4,
                                titulo: 'Cuidado Humanizado com Todos os Perfis',
                                descricao: 'Prepare-se para cuidar de idosos, gestantes, crianças e pacientes em reabilitação.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                index: 5,
                                titulo: 'Atuação em Diversos Ambientes de Saúde',
                                descricao: 'Vivencie a rotina em hospitais, clínicas, unidades básicas e no atendimento domiciliar.',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 1
                            },
                            {
                                index: 6,
                                titulo: 'Fundamentos da Saúde e Ética Profissional',
                                descricao: 'Entenda o corpo humano, a importância da ética e a humanização no atendimento.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 1
                            }
                        ]
                    },
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Duracao,
                        topicos: [
                            {
                                img: 'assets/icons/clock.png',
                                titulo: 'Formação Completa e na Medida Certa',
                                descricao: 'O curso tem duração de 26 a 31 meses, ideal para te preparar com qualidade e agilidade.',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 2
                            },
                            {
                                img: 'assets/icons/graduation-hat.png',
                                titulo: 'Teoria e Prática Caminhando Juntas',
                                descricao: 'Você terá aulas teóricas e práticas em uma estrutura moderna e focada no aprendizado real.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 2
                            },
                            {
                                img: 'assets/icons/placeholder.png',
                                titulo: 'Modalidade Presencial com Prática Real',
                                descricao: 'Aulas presenciais com atividades em laboratório e estágio supervisionado garantido.',
                                cor: '#005200',
                                icone: false,
                                tipoCard: 2
                            },
                            {
                                img: 'assets/icons/quality.png',
                                titulo: 'Certificação Reconhecida pelo MEC',
                                descricao: 'Ao final do curso, você recebe o diploma de Técnico em Enfermagem com validade nacional.',
                                cor: '#8BC34A',
                                icone: false,
                                tipoCard: 2
                            }
                        ]
                    }
                ]
            }

        } else if (cursoNome == 'tecnico-em-radiologia') {

            model = {
                cursoId: 2,
                nome: 'Curso Técnico em Radiologia',
                categoria: 'Saúde',
                urlImagem: 'assets/images/Banner-01.png',
                topicos: [
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Geral,
                        topicos: [
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Entre Rápido no Mercado',
                                descricao: 'Com alta demanda por profissionais, a radiologia é uma excelente opção para quem busca uma carreira sólida na área da saúde.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Profissão em Constante Crescimento',
                                descricao: 'A tecnologia médica não para de evoluir — e a radiologia acompanha esse ritmo, garantindo boas oportunidades de emprego.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Aprendizado Técnico e Especializado',
                                descricao: 'Você se torna apto a operar equipamentos modernos e realizar exames fundamentais para o diagnóstico médico.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Contribua com a Saúde da População',
                                descricao: 'Ajude médicos a salvarem vidas com diagnósticos precisos por imagem. Uma profissão que impacta diretamente a vida das pessoas.',
                                tipoCard: 1
                            }
                        ]
                    },
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Atuacao,
                        topicos: [
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Hospitais públicos e privados',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Clínicas de diagnóstico por imagem',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Centros de medicina nuclear',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Laboratórios de análises clínicas',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Instituições de ensino e pesquisa',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Empresas de radiologia industrial',
                                tipoCard: 1
                            }
                        ]
                    },
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Aprendizado,
                        topicos: [
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Radiologia Convencional e Digital',
                                descricao: 'Aprenda a operar aparelhos de raios-X e entender a formação de imagens radiológicas.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Tomografia Computadorizada e Ressonância Magnética',
                                descricao: 'Conheça os princípios e aplicações dessas tecnologias avançadas de diagnóstico.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Radioproteção e Segurança',
                                descricao: 'Estude os cuidados necessários para garantir sua segurança e a dos pacientes durante os exames.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Anatomia e Fisiologia Humana',
                                descricao: 'Compreenda a estrutura do corpo humano para uma atuação precisa na área de diagnóstico por imagem.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Ética e Legislação em Radiologia',
                                descricao: 'Entenda as normas, direitos e deveres do profissional de radiologia.',
                                tipoCard: 1
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Prática em Laboratórios e Estágios Supervisionados',
                                descricao: 'Tenha experiências reais que complementam o conteúdo teórico e te preparam para o mercado.',
                                tipoCard: 1
                            }
                        ]
                    },
                    {
                        tipoTopicoCursoEnum: TipoTopicoCursoEnum.Duracao,
                        topicos: [
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Formação em Tempo Ideal',
                                descricao: 'O curso tem duração média de 24 a 30 meses, com foco no aprendizado completo e eficiente.',
                                tipoCard: 2
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Aulas Teóricas e Práticas Integradas',
                                descricao: 'Conteúdo pensado para unir teoria à prática em ambientes simulados e reais.',
                                tipoCard: 2
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Modalidade Presencial com Infraestrutura de Qualidade',
                                descricao: 'Estude com equipamentos modernos e laboratórios preparados para seu desenvolvimento.',
                                tipoCard: 2
                            },
                            {
                                cor: '#8BC34A',
                                icone: false,
                                titulo: 'Certificação Reconhecida pelo MEC',
                                descricao: 'Diploma de Técnico em Radiologia com validade nacional, essencial para atuar profissionalmente.',
                                tipoCard: 2
                            }
                        ]
                    }
                ]
            }

        }

        return model;
        
    }

}
