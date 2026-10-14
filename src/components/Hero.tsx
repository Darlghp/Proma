import React from 'react';
import { ArrowRight, CheckCircle2, Vote, ShieldCheck, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 text-white border-b border-neutral-800">
      {/* Background Graphic / Scrim with generated Convention photograph */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/proma_national_convention_1791869901927.jpg"
          alt="Convenção Nacional do Partido PROMA com milhares de delegados e bandeiras PRO"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-neutral-950/60" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-white/5 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 lg:pt-24 lg:pb-28">
        <div className="max-w-3xl space-y-8">
          
          {/* Unboxed clean metadata kicker (no pill badge) */}
          <div className="flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-neutral-400">
            <span>Partido Registrado</span>
            <span aria-hidden="true">·</span>
            <span>Número Oficial 77</span>
            <span aria-hidden="true">·</span>
            <span>Convenção 2026</span>
          </div>

          {/* Marquee Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white text-balance">
            Coragem para avançar, <br className="hidden sm:inline" />
            ordem para prosperar.
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal max-w-2xl">
            O <strong className="text-white font-semibold">PRO - Partido PROMA</strong> surge
            como a força de renovação cidadã, compromissada com a liberdade econômica, desburocratização
            radical, ética pública inegociável e tecnologia a serviço da população.
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('filiacao')}
              className="px-6 py-3.5 text-sm font-bold tracking-wide uppercase text-neutral-950 bg-white rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all inline-flex items-center gap-2 shadow-lg shadow-white/5 whitespace-nowrap"
            >
              <span>Emitir Filiação Digital</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate('urna')}
              className="px-6 py-3.5 text-sm font-bold tracking-wide uppercase text-white bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg hover:bg-neutral-800 active:scale-[0.98] transition-all inline-flex items-center gap-2 whitespace-nowrap"
            >
              <Vote className="w-4 h-4 text-neutral-400" />
              <span>Simular Voto 77 na Urna</span>
            </button>
          </div>

          {/* Compact Trust Signals */}
          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs text-neutral-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-white" />
              <span>Estatuto Homologado</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Prestação de Contas Aberta</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-white" />
              <span>Presença nos 26 Estados e DF</span>
            </div>
          </div>
        </div>

        {/* 4-Item Proof KPI strip below hero split */}
        <div className="mt-16 pt-10 border-t border-neutral-800 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              184.250+
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">
              Filiados Ativos
            </div>
            <p className="text-xs text-neutral-500 mt-1">Presentes em mais de 1.400 municípios</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              77
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">
              Número da Legenda
            </div>
            <p className="text-xs text-neutral-500 mt-1">Voto no PRO em âmbito federal e estadual</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              27 / 27
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">
              Diretórios no Brasil
            </div>
            <p className="text-xs text-neutral-500 mt-1">Estrutura organizada de norte a sul</p>
          </div>

          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
              100%
            </div>
            <div className="text-xs uppercase tracking-wider text-neutral-400 font-semibold mt-1">
              Auditoria Pública
            </div>
            <p className="text-xs text-neutral-500 mt-1">Transparência em tempo real de doações</p>
          </div>
        </div>
      </div>
    </section>
  );
};
