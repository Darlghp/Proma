import React, { useState } from 'react';
import { PartyLogo } from './PartyLogo';
import { playCampaignJingle, stopCampaignJingle } from '../utils/audio';
import { Play, Square, Download, FileText, Check, Music2 } from 'lucide-react';

export const CampaignKitsSection: React.FC = () => {
  const [isPlayingJingle, setIsPlayingJingle] = useState<boolean>(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleToggleJingle = () => {
    if (isPlayingJingle) {
      stopCampaignJingle();
      setIsPlayingJingle(false);
    } else {
      setIsPlayingJingle(true);
      playCampaignJingle(() => {
        setIsPlayingJingle(false);
      });
    }
  };

  const handleDownloadItem = (itemName: string) => {
    setDownloadSuccess(itemName);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <section className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Mobilização de Base & Comunicação
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Central de Materiais de Campanha & Jingle Oficial
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Multiplique a mensagem do Partido PROMA nas ruas e nas redes sociais. Baixe artes
            oficiais em alta resolução, pacotes de figurinhas e escute o jingle da chapa 77.
          </p>
        </div>

        {/* Jingle Player Hero Card */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shrink-0">
              <Music2 className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold tracking-widest text-neutral-400">
                HINO & JINGLE OFICIAL 2026
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                "Vem com o PRO, o 77 é Renovação!"
              </h3>
              <p className="text-xs text-neutral-400">
                Fanfarra cívica e ritmo patriótico para caminhadas e convenções municipais.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={handleToggleJingle}
              className={`flex-1 md:flex-initial px-6 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md ${
                isPlayingJingle
                  ? 'bg-amber-500 text-neutral-950 hover:bg-amber-400'
                  : 'bg-white text-neutral-950 hover:bg-neutral-200'
              }`}
            >
              {isPlayingJingle ? <Square className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
              <span>{isPlayingJingle ? 'Pausar Jingle' : 'Ouvir Jingle 77'}</span>
            </button>

            <button
              onClick={() => handleDownloadItem('Jingle')}
              className="px-4 py-3.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
              title="Baixar áudio"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {downloadSuccess && (
          <div className="mb-8 p-4 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Material "{downloadSuccess}" preparado e pronto para uso oficial!</span>
          </div>
        )}

        {/* Grid of Kits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Kit 1: Adesivos & Bandeiras */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-6">
            <div className="space-y-4">
              <div className="h-32 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-center p-4">
                <PartyLogo size="sm" variant="horizontal" inverted={true} />
              </div>
              <h4 className="text-base font-bold text-white">
                Kit de Vetores & Identidade Visual
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Logotipo original em SVG, monograma PRO, guia de cores oficiais e gabaritos para impressão de bandeiras e adesivos perfurados para veículos.
              </p>
            </div>
            <button
              onClick={() => handleDownloadItem('Kit de Vetores')}
              className="w-full py-2.5 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Pacote Gráfico</span>
            </button>
          </div>

          {/* Kit 2: WhatsApp Stickers */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-6">
            <div className="space-y-4">
              <div className="h-32 bg-neutral-900 rounded-lg border border-neutral-800 p-3 grid grid-cols-3 gap-2 items-center justify-items-center">
                <div className="w-16 h-12 bg-neutral-800 border border-neutral-700 rounded text-[9px] font-bold text-center flex items-center justify-center p-1 text-white">
                  77 É PRO!
                </div>
                <div className="w-16 h-12 bg-white text-neutral-950 rounded text-[9px] font-black text-center flex items-center justify-center p-1">
                  ORDEM & PROGRESSO
                </div>
                <div className="w-16 h-12 bg-neutral-800 border border-neutral-700 rounded text-[9px] font-bold text-center flex items-center justify-center p-1 text-white">
                  ONDA 77
                </div>
              </div>
              <h4 className="text-base font-bold text-white">
                Figurinhas para WhatsApp & Telegram
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Pack completo com 24 figurinhas animadas para grupos comunitários, família e amigos promoverem a chapa 77 com bom humor e clareza.
              </p>
            </div>
            <button
              onClick={() => handleDownloadItem('Figurinhas de WhatsApp')}
              className="w-full py-2.5 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Adicionar ao WhatsApp</span>
            </button>
          </div>

          {/* Kit 3: Cartilha de Diretrizes */}
          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-6">
            <div className="space-y-4">
              <div className="h-32 bg-neutral-900 rounded-lg border border-neutral-800 flex flex-col items-center justify-center text-neutral-400 gap-2">
                <FileText className="w-10 h-10 text-white" />
                <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                  MANUAL PROGRAMÁTICO 2026
                </span>
              </div>
              <h4 className="text-base font-bold text-white">
                Cartilha de Propostas & Estatuto Completo
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Documento de 64 páginas com o detalhamento artigo por artigo de todas as medidas econômicas, de segurança, saúde e educação do PRO.
              </p>
            </div>
            <button
              onClick={() => handleDownloadItem('Cartilha de Propostas')}
              className="w-full py-2.5 bg-neutral-900 border border-neutral-700 hover:bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Cartilha (PDF)</span>
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
