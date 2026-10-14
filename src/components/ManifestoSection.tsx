import React, { useState } from 'react';
import { ThumbsUp, ChevronDown, ChevronUp, FileText, Check } from 'lucide-react';

interface Proposal {
  id: string;
  pillar: string;
  number: string;
  title: string;
  summary: string;
  details: string[];
  initialVotes: number;
}

export const ManifestoSection: React.FC = () => {
  const [selectedPillar, setSelectedPillar] = useState<string>('todos');
  const [expandedProposal, setExpandedProposal] = useState<string | null>('p1');
  const [votedProposals, setVotedProposals] = useState<Record<string, boolean>>({});
  const [voteCounts, setVoteCounts] = useState<Record<string, number>>({
    p1: 18420,
    p2: 15390,
    p3: 22110,
    p4: 19800,
    p5: 14750,
    p6: 17290,
  });

  const proposals: Proposal[] = [
    {
      id: 'p1',
      pillar: 'economia',
      number: '01',
      title: 'Desregulamentação Acelerada e Livre Iniciativa',
      summary: 'Redução radical da burocracia para abertura de novos negócios e extinção de tributos sobre inovação e investimentos produtivos.',
      details: [
        'Abertura de empresas de baixo impacto em até 30 minutos via plataforma unificada digital sem taxas cartoriais.',
        'Isenção total de tributos federais para microempresas e empreendedores individuais nos primeiros 24 meses de atividade.',
        'Extinção de monopólios estatais em transporte e infraestrutura portuária, priorizando concessões com metas rigorosas.',
        'Fim da retenção indevida de créditos tributários acumulados pelas indústrias nacionais.',
      ],
      initialVotes: 18420,
    },
    {
      id: 'p2',
      pillar: 'educacao',
      number: '02',
      title: 'Educação de Excelência e Inserção no Século XXI',
      summary: 'Foco irrestrito em alfabetização plena na idade certa, expansão do ensino técnico de tecnologia e meritocracia docente.',
      details: [
        'Bônus de desempenho financeiro direto aos professores e equipes escolares que atingirem as metas de proficiência no IDEB.',
        'Inclusão obrigatória de raciocínio lógico, programação aplicada e educação financeira no currículo de ensino médio.',
        'Internet de alta velocidade (1 Gbps) em 100% das escolas públicas municipais e estaduais com financiamento garantido.',
        'Vales-educação técnico-vocacionais para jovens em situação de vulnerabilidade concluírem especializações demandadas pelo mercado.',
      ],
      initialVotes: 15390,
    },
    {
      id: 'p3',
      pillar: 'gestao',
      number: '03',
      title: 'Estado Enxuto, Fim de Privilégios e Eficiência',
      summary: 'Corte de despesas supérfluas nos Três Poderes, digitalização total de serviços e teto salarial unificado sem penduricalhos.',
      details: [
        'Extinção de auxílios moradia, paletó e verbas indenizatórias cumulativas em todos os níveis da administração pública.',
        'Redução em 40% do número de ministérios federais, cargos em comissão e secretarias com sobreposição de competências.',
        'Avaliação periódica de desempenho para ocupantes de cargos públicos com critérios objetivos de produtividade.',
        'Auditoria externa obrigatória e publicação em dados abertos de 100% dos gastos com publicidade e cartões corporativos.',
      ],
      initialVotes: 22110,
    },
    {
      id: 'p4',
      pillar: 'seguranca',
      number: '04',
      title: 'Segurança Pública com Inteligência e Fronteiras Blindadas',
      summary: 'Integração de dados policiais em tempo real, valorização dos agentes de segurança e combate implacável às facções criminosas.',
      details: [
        'Criação do Centro Integrado de Inteligência contra o Crime Organizado com monitoramento de fluxos financeiros ilícitos.',
        'Aperfeiçoamento dos critérios penais para impedir a soltura rápida de criminosos reincidentes em crimes violentos.',
        'Modernização com drones de longo alcance, radares termais e sensores de vigilância nas fronteiras terrestres e marítimas.',
        'Plano de carreira nacional e assistência jurídica e de saúde mental permanente para policiais civis, militares e federais.',
      ],
      initialVotes: 19800,
    },
    {
      id: 'p5',
      pillar: 'agro_sustentabilidade',
      number: '05',
      title: 'Agro Moderno e Transição Energética Verde',
      summary: 'Segurança jurídica para quem produz no campo combinada com incentivos a energias renováveis e biocombustíveis.',
      details: [
        'Titulação definitiva de terras para pequenos e médios produtores rurais, garantindo acesso facilitado a crédito agrícola.',
        'Incentivos fiscais agressivos para plantas de biometano, hidrogênio verde, energia solar e eólica offshore no Brasil.',
        'Regularização ambiental acelerada via sensoriamento orbital automatizado (CAR sem fila manual burocrática).',
        'Investimento prioritário em ferrovias de escoamento para baratear o custo do frete e reduzir emissões de carbono.',
      ],
      initialVotes: 14750,
    },
    {
      id: 'p6',
      pillar: 'democracia',
      number: '06',
      title: 'Democracia Direta Digital e Transparência Cívica',
      summary: 'Plebiscitos digitais sobre matérias de grande relevância nacional e consulta popular obrigatória em grandes obras.',
      details: [
        'Plataforma cidadã onde qualquer cidadão cadastrado pode propor e votar em projetos de lei de iniciativa popular com biometria facial.',
        'Veto orçamentário participativo: a população do município decide diretamente onde aplicar 10% do orçamento de investimentos.',
        'Portal de transparência com rastreabilidade detalhada de cada centavo de emendas parlamentares em tempo real.',
        'Fim da impunidade política com cassação sumária em caso de condenação por crimes contra o erário em 2ª instância.',
      ],
      initialVotes: 17290,
    },
  ];

  const handleToggleVote = (id: string) => {
    const isVoted = votedProposals[id];
    setVotedProposals((prev) => ({ ...prev, [id]: !isVoted }));
    setVoteCounts((prev) => ({
      ...prev,
      [id]: isVoted ? prev[id] - 1 : prev[id] + 1,
    }));
  };

  const filteredProposals = selectedPillar === 'todos'
    ? proposals
    : proposals.filter((p) => p.pillar === selectedPillar);

  return (
    <section id="manifesto" className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Diretrizes Programáticas
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Manifesto do PRO: As 6 Bases da Nossa Ação
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Nossos eixos de governo e atuação parlamentar são transparentes e detalhados.
            Não fazemos promessas vagas: apresentamos projetos estruturantes para transformar o país.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-neutral-800">
          {[
            { id: 'todos', label: 'Todos os Eixos' },
            { id: 'economia', label: 'Economia & Liberdade' },
            { id: 'educacao', label: 'Educação & Tecnologia' },
            { id: 'gestao', label: 'Gestão & Estado Enxuto' },
            { id: 'seguranca', label: 'Segurança & Inteligência' },
            { id: 'agro_sustentabilidade', label: 'Agro & Energia' },
            { id: 'democracia', label: 'Democracia Direta' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedPillar(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                selectedPillar === tab.id
                  ? 'bg-white text-neutral-950 font-bold shadow-sm'
                  : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Proposals List */}
        <div className="space-y-4">
          {filteredProposals.map((item) => {
            const isExpanded = expandedProposal === item.id;
            const hasVoted = votedProposals[item.id];
            const currentVotes = voteCounts[item.id] || item.initialVotes;

            return (
              <div
                key={item.id}
                className="bg-neutral-950 border border-neutral-800 rounded-xl transition-all duration-200 overflow-hidden hover:border-neutral-700"
              >
                {/* Header row */}
                <div
                  onClick={() => setExpandedProposal(isExpanded ? null : item.id)}
                  className="p-6 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-xl font-bold font-mono text-neutral-500 tabular-nums shrink-0">
                      {item.number}.
                    </span>
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1 line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-auto shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleVote(item.id);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold inline-flex items-center gap-1.5 transition-colors ${
                        hasVoted
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : 'bg-neutral-900 text-neutral-300 hover:text-white border border-neutral-800'
                      }`}
                    >
                      <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : ''}`} />
                      <span className="font-mono tabular-nums">{currentVotes.toLocaleString('pt-BR')}</span>
                      <span>apoios</span>
                    </button>

                    <div className="text-neutral-500 p-1">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-800/80 bg-neutral-950/50 space-y-4 animate-in fade-in duration-150">
                    <div className="text-xs uppercase tracking-wider font-bold text-neutral-400">
                      Medidas Concretas Previstas no Estatuto:
                    </div>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-neutral-300">
                      {item.details.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-white shrink-0 mt-0.5" />
                          <span className="text-xs leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="pt-3 border-t border-neutral-800/60 flex flex-wrap items-center justify-between text-xs text-neutral-400 gap-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-neutral-500" />
                        <span>Minuta de Projeto de Lei disponível para consulta pública</span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert('Caderno completo de diretrizes baixado com sucesso em formato PDF.');
                        }}
                        className="text-white hover:underline font-semibold"
                      >
                        Baixar Diretriz Completa (PDF)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
