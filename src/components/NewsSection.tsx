import React, { useState } from 'react';
import { Calendar, ArrowRight, Share2, X, Download } from 'lucide-react';

interface NewsArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  body: string[];
}

export const NewsSection: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  const articles: NewsArticle[] = [
    {
      id: 'n1',
      title: 'Convenção Nacional Homologa Helena Vasconcelos e Chapa 77 com Unanimidade',
      category: 'Institucional',
      date: '10 de Outubro de 2026',
      readTime: '3 min',
      excerpt: 'Em plenária lotada no centro de convenções, delegados dos 27 estados aprovaram as diretrizes de governo e confirmaram o número 77 como símbolo de renovação.',
      body: [
        'A Executiva Nacional do Partido PROMA concluiu neste fim de semana a sua Convenção Nacional com a homologação oficial da chapa majoritária liderada pela Dra. Helena Vasconcelos.',
        'Durante seu discurso de aceitação, Helena destacou que o PRO não aceitará o loteamento de cargos públicos e reiterou a meta de cortar despesas administrativas federais no primeiro mês de mandato.',
        '"Estamos construindo uma plataforma fundada na verdade técnica e na coragem moral. O Brasil tem pressa para voltar a crescer com solidez", declarou a presidente sob aplausos de mais de 4.000 delegados presentes.',
        'A convenção também deliberou sobre o plano de expansão dos diretórios municipais, que já somam presença em mais de 1.400 cidades.',
      ],
    },
    {
      id: 'n2',
      title: 'Bancada do PRO Protocolará Marco da Desburocratização e Abertura em 30 Minutos',
      category: 'Projetos de Lei',
      date: '04 de Outubro de 2026',
      readTime: '4 min',
      excerpt: 'Iniciativa legislativa liderada pelo núcleo econômico do PRO quer extinguir alvarás manuais para atividades de baixo risco e zerar impostos de microempresas.',
      body: [
        'O núcleo de formulação de políticas públicas do Partido PROMA divulgou a versão final da minuta de lei complementar que institui a "Abertura Relâmpago de Empresas".',
        'Pelo texto, qualquer negócio considerado de baixo impacto ambiental e sanitário terá emissão automática de alvarás de funcionamento em até 30 minutos por auto-declaração digital.',
        'Além disso, o projeto propõe imunidade tributária federal pelos primeiros 24 meses para negócios que faturem até o limite do Simples Nacional, incentivando o empreendedorismo jovem.',
      ],
    },
    {
      id: 'n3',
      title: 'Campanha Nacional de Filiação Ultrapassa 184 Mil Membros Registrados',
      category: 'Cidadania & Base',
      date: '28 de Setembro de 2026',
      readTime: '2 min',
      excerpt: 'Com a nova carteirinha digital instantânea com verificação criptográfica, o partido alcançou a maior taxa de crescimento orgânico do ano.',
      body: [
        'O sistema de filiação online do PRO registrou mais de 25 mil novos cadastros nas últimas três semanas, impulsionado pela adesão de universitários, empreendedores e lideranças de bairro.',
        'Os dados de filiação são disponibilizados publicamente no Portal de Transparência do PRO, garantindo lisura e respeito rigoroso às normas do Tribunal Superior Eleitoral.',
      ],
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Central de Imprensa & Comunicados
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Notícias Oficiais do Partido PROMA
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Acompanhe em tempo real os posicionamentos oficiais, resoluções da executiva e
            atividades parlamentares do PRO em todo o país.
          </p>
        </div>

        {/* Articles Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((art) => (
            <div
              key={art.id}
              onClick={() => setSelectedArticle(art)}
              className="group cursor-pointer bg-neutral-900 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-600 transition-all duration-200"
            >
              <div className="space-y-4">
                {/* Unboxed metadata kicker */}
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-medium">
                  <span className="text-white font-semibold">{art.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{art.readTime}</span>
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-neutral-200 transition-colors leading-snug">
                  {art.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                <div className="flex items-center gap-1.5 font-mono text-[11px]">
                  <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                  <span>{art.date}</span>
                </div>
                <span className="font-semibold text-white group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  Ler nota <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 text-white space-y-6 my-8 animate-in fade-in duration-200">
              
              <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="text-white font-bold">{selectedArticle.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedArticle.date}</span>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                  {selectedArticle.title}
                </h2>
                <div className="text-sm font-semibold text-neutral-400 italic">
                  Assessoria de Comunicação Social do Partido PROMA (PRO)
                </div>
              </div>

              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed border-t border-b border-neutral-800 py-6">
                {selectedArticle.body.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div className="text-xs text-neutral-500 font-mono">
                  Registro: PROMA-NOT-2026-X81
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(window.location.href);
                      alert('Link do comunicado copiado para compartilhamento!');
                    }}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-xs font-semibold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Share2 className="w-4 h-4 text-neutral-400" />
                    <span>Compartilhar</span>
                  </button>

                  <button
                    onClick={() => {
                      alert('Arquivo oficial em PDF exportado com sucesso.');
                    }}
                    className="px-4 py-2 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold rounded-lg inline-flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    <span>Baixar Release</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
