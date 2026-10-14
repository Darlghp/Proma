import React, { useState } from 'react';
import { PartyLogo } from './PartyLogo';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, activeSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'urna', label: 'Urna 77' },
    { id: 'filiacao', label: 'Filiação' },
    { id: 'liderancas', label: 'Lideranças' },
    { id: 'diretorios', label: 'Diretórios' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single brand wordmark element */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="flex items-center gap-3 text-left focus:outline-none group whitespace-nowrap shrink-0"
          >
            <PartyLogo size="sm" variant="horizontal" inverted={true} />
          </button>

          {/* Zone 2: 4-5 single-line navigation text links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                  activeSection === link.id
                    ? 'text-white font-semibold border-b-2 border-white'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Zone 3: Exactly 1 primary action */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            <button
              onClick={() => handleNavClick('filiacao')}
              className="px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-neutral-950 bg-white rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-sm whitespace-nowrap shrink-0"
            >
              Filie-se ao PRO
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-neutral-800 bg-neutral-950 px-6 py-5 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left text-sm font-medium py-2 transition-colors ${
                  activeSection === link.id ? 'text-white font-bold' : 'text-neutral-400'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div className="pt-3 border-t border-neutral-800">
            <button
              onClick={() => handleNavClick('filiacao')}
              className="w-full py-3 text-center text-xs font-bold tracking-wider uppercase text-neutral-950 bg-white rounded-lg hover:bg-neutral-200 transition-colors"
            >
              Filie-se ao PRO
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
