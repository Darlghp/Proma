import React from 'react';
import { PartyLogo } from './PartyLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 text-xs py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-neutral-800">
          <div className="space-y-2">
            <PartyLogo size="sm" variant="horizontal" inverted={true} />
            <p className="text-neutral-500 max-w-md text-xs mt-2">
              Partido Republicano de Ordem e Modernização Avançada (PRO).
              Legenda registrada sob o número 77 no Tribunal Superior Eleitoral.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-neutral-300 font-medium">
            <button onClick={() => onNavigate('inicio')} className="hover:text-white transition-colors">
              Início
            </button>
            <button onClick={() => onNavigate('manifesto')} className="hover:text-white transition-colors">
              Manifesto
            </button>
            <button onClick={() => onNavigate('urna')} className="hover:text-white transition-colors">
              Urna 77
            </button>
            <button onClick={() => onNavigate('filiacao')} className="hover:text-white transition-colors">
              Filiação
            </button>
            <button onClick={() => onNavigate('liderancas')} className="hover:text-white transition-colors">
              Lideranças
            </button>
            <button onClick={() => onNavigate('diretorios')} className="hover:text-white transition-colors">
              Diretórios
            </button>
          </div>
        </div>

        {/* Legal and Disclaimer Strip */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <div>
            © 2026 Partido PROMA (PRO) - Todos os direitos reservados. CNPJ: 77.077.077/0001-77.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer">Estatuto Partidário</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Prestação de Contas Aberta</span>
            <span>·</span>
            <span className="hover:text-neutral-400 cursor-pointer">Código de Ética e Compliance</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
