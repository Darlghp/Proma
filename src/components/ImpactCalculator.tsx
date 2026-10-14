import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, TrendingDown, Clock, Sparkles } from 'lucide-react';

export const ImpactCalculator: React.FC<{ onAffiliateClick: () => void }> = ({ onAffiliateClick }) => {
  const [profileType, setProfileType] = useState<'clt' | 'pj' | 'agro' | 'autonomo'>('clt');
  const [income, setIncome] = useState<number>(4500);
  const [dependents, setDependents] = useState<number>(1);

  // Calculate simulated benefits under PROMA program
  // 1. Current taxation vs PROMA flat 12% above R$ 5.000 exemption
  const calculateAnnualTaxSavings = () => {
    const annualIncome = income * 12;
    if (profileType === 'clt') {
      // Under PROMA proposal: 0% up to R$ 60.000/yr (R$ 5.000/mo) and 12% flat with dependent credit
      const currentEstimatedTax = Math.max(0, (annualIncome - 28000) * 0.225);
      const promaTax = Math.max(0, (annualIncome - 60000 - dependents * 4000) * 0.12);
      return Math.round(Math.max(800, currentEstimatedTax - promaTax));
    }
    if (profileType === 'pj') {
      // PROMA micro-business zero tax for first 24 months + flat 6% unified digital tax
      return Math.round(annualIncome * 0.075);
    }
    if (profileType === 'agro') {
      // Exemption on diesel and machinery parts
      return Math.round(annualIncome * 0.082);
    }
    // Autônomo
    return Math.round(annualIncome * 0.065);
  };

  const taxSavings = calculateAnnualTaxSavings();
  const hoursSaved = profileType === 'pj' ? 140 : profileType === 'agro' ? 95 : 42;
  const educationalCredit = 1200 + dependents * 600;

  return (
    <section className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Simulador de Benefício Econômico
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Calculadora do Cidadão: Quanto Você Economiza com o PRO
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Nossas propostas fiscais não são promessas abstratas. Veja na prática como a
            isenção do Imposto de Renda até R$ 5.000,00 e o corte da burocracia impactariam o seu bolso.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Box */}
          <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
              <Calculator className="w-5 h-5 text-white" />
              <h3 className="text-base font-bold text-white uppercase tracking-wider">
                Parâmetros do Seu Perfil
              </h3>
            </div>

            {/* Profile Type */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
                Sua Atividade Principal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'clt', label: 'Trabalhador CLT' },
                  { id: 'pj', label: 'PJ / Empresa' },
                  { id: 'autonomo', label: 'Autônomo' },
                  { id: 'agro', label: 'Produtor Rural' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setProfileType(item.id as typeof profileType)}
                    className={`py-2.5 px-3 text-center text-xs font-semibold rounded-lg border transition-all ${
                      profileType === item.id
                        ? 'bg-white text-neutral-950 border-white font-bold shadow-sm'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Income Slider */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                  Rendimento Mensal Médio
                </label>
                <span className="font-mono font-bold text-base text-white">
                  R$ {income.toLocaleString('pt-BR')},00
                </span>
              </div>
              <input
                type="range"
                min="1800"
                max="25000"
                step="200"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full accent-white bg-neutral-800 rounded-lg h-2 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                <span>R$ 1.800</span>
                <span>R$ 10.000</span>
                <span>R$ 25.000+</span>
              </div>
            </div>

            {/* Dependents */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Número de Dependentes
              </label>
              <div className="flex items-center gap-2">
                {[0, 1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setDependents(num)}
                    className={`flex-1 py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                      dependents === num
                        ? 'bg-white text-neutral-950 border-white'
                        : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:text-white'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 text-[11px] text-neutral-500 flex items-center gap-2 border-t border-neutral-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Baseado no Projeto de Lei Complementar PRO 77/2026 de Reforma Tributária Nacional.</span>
            </div>
          </div>

          {/* Results Summary Box */}
          <div className="lg:col-span-6 space-y-4">
            <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                <span className="text-xs uppercase font-bold tracking-wider text-neutral-400">
                  Estimativa Anual de Ganho Direto
                </span>
                <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> SIMULAÇÃO ATIVA
                </span>
              </div>

              {/* Marquee Metric */}
              <div className="space-y-1">
                <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold">
                  Dinheiro a Mais no Seu Bolso por Ano
                </div>
                <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-tight text-emerald-400">
                  + R$ {taxSavings.toLocaleString('pt-BR')},00
                </div>
                <p className="text-xs text-neutral-400 pt-1">
                  Valor retido a menos pelo governo com a elevação da faixa de isenção e corte de alíquotas abusivas.
                </p>
              </div>

              {/* Secondary Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-neutral-800">
                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs">
                    <Clock className="w-4 h-4 text-white" />
                    <span>Tempo Recuperado</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    {hoursSaved}h / ano
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Sem filas e burocracia de alvarás
                  </div>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl space-y-1">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs">
                    <TrendingDown className="w-4 h-4 text-white" />
                    <span>Bolsa Qualificação</span>
                  </div>
                  <div className="text-2xl font-bold font-mono text-white">
                    R$ {educationalCredit}
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Crédito anual para ensino técnico
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={onAffiliateClick}
                  className="w-full py-3.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  <span>Filie-se para Defender essa Reforma</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-xs text-neutral-500 text-center">
              Cálculo indicativo segundo os parâmetros econômicos do Instituto de Estudos PROMA.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
