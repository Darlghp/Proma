import React, { useState } from 'react';
import { PartyLogo } from './PartyLogo';
import { CheckCircle2, RotateCcw, Share2, Award, ChevronRight } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: number; // 0 to 20
    affinity: string;
  }[];
}

export const AlignmentQuiz: React.FC<{ onAffiliateClick: () => void }> = ({ onAffiliateClick }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);

  const questions: Question[] = [
    {
      id: 1,
      text: 'Qual deve ser a prioridade número um para destravar a economia do Brasil?',
      options: [
        {
          text: 'Reduzir impostos, desburocratizar abertura de empresas e cortar gastos públicos.',
          score: 20,
          affinity: 'Liberdade Econômica',
        },
        {
          text: 'Manter a carga atual, mas focar em regulação mais simples e ágil.',
          score: 14,
          affinity: 'Modernização Administrativa',
        },
        {
          text: 'Aumentar subsídios estatais e criar novas agências reguladoras.',
          score: 4,
          affinity: 'Estatismo',
        },
      ],
    },
    {
      id: 2,
      text: 'Como transformar a educação pública brasileira em referência mundial?',
      options: [
        {
          text: 'Foco total em alfabetização, conectividade de alta velocidade e bônus de mérito aos professores com melhor desempenho.',
          score: 20,
          affinity: 'Meritocracia e Tecnologia',
        },
        {
          text: 'Aumentar orçamentos sem exigir avaliações periódicas de aprendizagem.',
          score: 8,
          affinity: 'Tradicionalismo',
        },
        {
          text: 'Priorizar apenas teorias pedagógicas sem ligação com o mercado de trabalho.',
          score: 2,
          affinity: 'Intervencionismo',
        },
      ],
    },
    {
      id: 3,
      text: 'Qual a estratégia mais eficaz para conter o crime organizado e garantir a paz?',
      options: [
        {
          text: 'Bloqueio do fluxo financeiro de facções, tecnologia nas fronteiras e fim da reincidência penal facilitada.',
          score: 20,
          affinity: 'Segurança e Inteligência',
        },
        {
          text: 'Mais policiamento ostensivo tradicional sem inteligência digital integrada.',
          score: 12,
          affinity: 'Segurança Clássica',
        },
        {
          text: 'Tolerância com contravenções e redução das penas para crimes recorrentes.',
          score: 2,
          affinity: 'Condescendência',
        },
      ],
    },
    {
      id: 4,
      text: 'O que deve ser feito com privilégios e penduricalhos nos Três Poderes?',
      options: [
        {
          text: 'Extinção imediata de auxílios moradia, paletó e teto único real sem exceções.',
          score: 20,
          affinity: 'Integridade Pública',
        },
        {
          text: 'Corte gradual e voluntário apenas para novas contratações.',
          score: 10,
          affinity: 'Cautela',
        },
        {
          text: 'Manutenção dos benefícios como garantia de atratividade da carreira.',
          score: 2,
          affinity: 'Corporativismo',
        },
      ],
    },
    {
      id: 5,
      text: 'Como você enxerga a relação entre agronegócio e sustentabilidade?',
      options: [
        {
          text: 'Segurança jurídica para quem produz, regularização por satélite e estímulo a biocombustíveis e hidrogênio verde.',
          score: 20,
          affinity: 'Agro Moderno e Verde',
        },
        {
          text: 'Foco estritamente na produção sem exigências ecológicas internacionais.',
          score: 10,
          affinity: 'Produtivismo Puro',
        },
        {
          text: 'Paralisar concessões e exportações agrícolas sob alegações ideológicas.',
          score: 2,
          affinity: 'Antidesenvolvimento',
        },
      ],
    },
  ];

  const handleSelectOption = (score: number) => {
    const nextAnswers = [...answers, score];
    setAnswers(nextAnswers);

    if (currentStep + 1 < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setAnswers([]);
    setCurrentStep(0);
    setIsCompleted(false);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const percentage = Math.min(100, Math.round((totalScore / 100) * 100));

  const getRecommendedWing = () => {
    if (percentage >= 85) return 'Núcleo Estratégico de Inovação & Liberdade Econômica';
    if (percentage >= 70) return 'Comitê de Políticas Públicas e Gestão Eficiente';
    return 'Juventude Cidadã e Debates Programáticos do PRO';
  };

  const shareText = `Fiz o teste oficial de alinhamento do Partido PROMA (PRO 77) e obtive ${percentage}% de afinidade com o manifesto de renovação! Descubra o seu também.`;

  const handleShare = () => {
    navigator.clipboard?.writeText(shareText);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <section className="py-20 bg-neutral-950 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Teste de Afinidade Ideológica
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Descubra Seu Grau de Alinhamento com o PRO
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Responda a 5 perguntas objetivas sobre temas cruciais para o país e descubra
            o quanto seus valores coincidem com o Estatuto do Partido PROMA.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-10">
          
          {!isCompleted ? (
            <div className="space-y-8">
              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>Questão {currentStep + 1} de {questions.length}</span>
                  <span>{Math.round(((currentStep) / questions.length) * 100)}% Concluído</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white transition-all duration-300"
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                  />
                </div>
              </div>

              {/* Question Text */}
              <div className="space-y-4">
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  {questions[currentStep].text}
                </h3>
              </div>

              {/* Options */}
              <div className="space-y-3">
                {questions[currentStep].options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(opt.score)}
                    className="w-full text-left p-4 sm:p-5 bg-neutral-950 border border-neutral-800 hover:border-neutral-500 rounded-xl transition-all group flex items-center justify-between gap-4"
                  >
                    <span className="text-sm text-neutral-200 group-hover:text-white leading-relaxed">
                      {opt.text}
                    </span>
                    <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:text-white shrink-0 group-hover:translate-x-1 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-center">
                <div className="w-20 h-20 rounded-full bg-neutral-800 border-2 border-white flex items-center justify-center text-white">
                  <Award className="w-10 h-10" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-xs uppercase font-mono tracking-widest text-neutral-400">
                  SEU RESULTADO OFICIAL
                </div>
                <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight">
                  {percentage}%
                </div>
                <div className="text-lg font-bold text-neutral-200">
                  {percentage >= 80 ? 'Alinhamento Integral com o PROMA!' : 'Forte Afinidade com Nossas Diretrizes'}
                </div>
                <p className="text-xs text-neutral-400 max-w-md mx-auto leading-relaxed">
                  Suas convicções demonstram compromisso claro com a desregulamentação,
                  o rigor fiscal, a excelência educacional e a integridade republicana.
                </p>
              </div>

              {/* Recommended Wing Box */}
              <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl text-left max-w-md mx-auto space-y-2">
                <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-400">
                  NÚCLEO PARTIDÁRIO SUGERIDO
                </div>
                <div className="text-sm font-bold text-white flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{getRecommendedWing()}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  onClick={onAffiliateClick}
                  className="px-6 py-3 bg-white text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors shadow-md"
                >
                  Confirmar Filiação com Esse Perfil
                </button>

                <button
                  onClick={handleShare}
                  className="px-5 py-3 bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-neutral-700 transition-colors inline-flex items-center gap-2 border border-neutral-700"
                >
                  <Share2 className="w-4 h-4" />
                  <span>{copiedShare ? 'Copiado!' : 'Compartilhar Resultado'}</span>
                </button>

                <button
                  onClick={handleRestart}
                  className="px-4 py-3 text-neutral-400 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Refazer</span>
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
