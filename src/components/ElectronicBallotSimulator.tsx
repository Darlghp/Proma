import React, { useState, useEffect, useRef } from 'react';
import { PartyLogo } from './PartyLogo';
import { Check, RotateCcw, Volume2, VolumeX, Shield, Award } from 'lucide-react';

interface CandidateData {
  digits: number;
  office: string;
  number: string;
  name: string;
  viceName?: string;
  party: string;
  coalition: string;
  photoUrl: string;
}

export const ElectronicBallotSimulator: React.FC = () => {
  const [selectedOffice, setSelectedOffice] = useState<'presidente' | 'governador' | 'deputado'>('presidente');
  const [enteredDigits, setEnteredDigits] = useState<string>('');
  const [isBlankVote, setIsBlankVote] = useState<boolean>(false);
  const [isVotedFinished, setIsVotedFinished] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [voteCount, setVoteCount] = useState<number>(1429);
  const [showProofModal, setShowProofModal] = useState<boolean>(false);

  // Audio Context Ref for synthesized TSE urna sounds
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  };

  const playKeyBeep = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch {
      // Audio fallback silent
    }
  };

  const playUrnaConfirmation = () => {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      // Synthesize the characteristic TSE Urna confirmation tone sequence
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      
      // Sequence: 880Hz beep then sustained 1200Hz confirmation chime
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.setValueAtTime(900, now + 0.15);
      osc.frequency.setValueAtTime(1180, now + 0.2);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.setValueAtTime(0.12, now + 0.2);
      gain.gain.linearRampToValueAtTime(0.15, now + 0.35);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.25);
    } catch {
      // Audio fallback silent
    }
  };

  const officesMap: Record<string, CandidateData> = {
    presidente: {
      digits: 2,
      office: 'PRESIDENTE DA REPÚBLICA',
      number: '77',
      name: 'HELENA VASCONCELOS',
      viceName: 'MARCOS VALÉRIO',
      party: 'PRO - PARTIDO PROMA',
      coalition: 'COLIGAÇÃO CORAGEM PARA AVANÇAR',
      photoUrl: '/src/assets/images/proma_leadership_speech_1791869916616.jpg',
    },
    governador: {
      digits: 2,
      office: 'GOVERNADOR DO ESTADO',
      number: '77',
      name: 'RODRIGO MENDES',
      viceName: 'DRA. CLÁUDIA FERRARI',
      party: 'PRO - PARTIDO PROMA',
      coalition: 'PROMA / ALIANÇA CIVICA',
      photoUrl: '/src/assets/images/proma_leadership_speech_1791869916616.jpg',
    },
    deputado: {
      digits: 4,
      office: 'DEPUTADO FEDERAL',
      number: '7700',
      name: 'BANCADA DA RENOVAÇÃO PROMA',
      party: 'PRO - PARTIDO PROMA',
      coalition: 'CHAPA PROMA PURO',
      photoUrl: '/src/assets/images/proma_civic_action_1791869916880.jpg',
    },
  };

  const currentOfficeData = officesMap[selectedOffice];
  const maxDigits = currentOfficeData.digits;

  // Handle number click
  const handleDigitPress = (digit: string) => {
    if (isVotedFinished || isBlankVote) return;
    if (enteredDigits.length < maxDigits) {
      playKeyBeep();
      setEnteredDigits((prev) => prev + digit);
    }
  };

  // Handle Corrige
  const handleCorrige = () => {
    playKeyBeep();
    setEnteredDigits('');
    setIsBlankVote(false);
  };

  // Handle Branco
  const handleBranco = () => {
    if (isVotedFinished) return;
    playKeyBeep();
    setEnteredDigits('');
    setIsBlankVote(true);
  };

  // Handle Confirma
  const handleConfirma = () => {
    if (isVotedFinished) return;
    if (isBlankVote || enteredDigits.length === maxDigits) {
      playUrnaConfirmation();
      setIsVotedFinished(true);
      setVoteCount((prev) => prev + 1);
    }
  };

  const handleResetVote = () => {
    playKeyBeep();
    setEnteredDigits('');
    setIsBlankVote(false);
    setIsVotedFinished(false);
    setShowProofModal(false);
  };

  const isMatchingParty = enteredDigits === currentOfficeData.number;
  const isCompleteNumber = enteredDigits.length === maxDigits;
  const isInvalidNumber = isCompleteNumber && !isMatchingParty;

  // Keyboard navigation for real numbers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isVotedFinished) return;
      if (/^[0-9]$/.test(e.key)) {
        handleDigitPress(e.key);
      } else if (e.key === 'Backspace' || e.key === 'Delete') {
        handleCorrige();
      } else if (e.key === 'Enter') {
        handleConfirma();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enteredDigits, isBlankVote, isVotedFinished, maxDigits]);

  return (
    <section id="urna" className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Simulador Interativo Oficial
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Teste a Urna Eletrônica Oficial: Digite 77
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Experimente a interface real de votação eletrônica. Na hora da decisão cívica,
            o número do Partido PROMA é <strong>77</strong>. Digite os números e aperte <strong>CONFIRMA</strong>.
          </p>
        </div>

        {/* Office switcher tabs & sound toggle */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
            <button
              onClick={() => {
                setSelectedOffice('presidente');
                handleCorrige();
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedOffice === 'presidente'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Presidente (77)
            </button>
            <button
              onClick={() => {
                setSelectedOffice('governador');
                handleCorrige();
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedOffice === 'governador'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Governador (77)
            </button>
            <button
              onClick={() => {
                setSelectedOffice('deputado');
                handleCorrige();
              }}
              className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                selectedOffice === 'deputado'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Deputado Federal (7700)
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-neutral-950 border border-neutral-800 hover:text-white transition-colors"
              title="Ativar/Desativar áudio da urna"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-neutral-500" />}
              <span>{soundEnabled ? 'Sons Ativos' : 'Silencioso'}</span>
            </button>
            <span className="hidden sm:inline">Votos simulados hoje: <strong className="text-white font-mono">{voteCount}</strong></span>
          </div>
        </div>

        {/* Urna Case Container (Realistic Machine Layout) */}
        <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-4 sm:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            
            {/* Left Screen Area (LCD Screen of the Urna) */}
            <div className="lg:col-span-7 bg-[#d9e2ec] text-[#0f172a] rounded-xl p-6 sm:p-8 flex flex-col justify-between border-4 border-neutral-800 min-h-[460px] relative shadow-inner font-sans select-none overflow-hidden">
              
              {isVotedFinished ? (
                /* FIM SCREEN */
                <div className="flex-1 flex flex-col items-center justify-center text-center py-10 space-y-4 animate-in fade-in zoom-in duration-300">
                  <div className="w-20 h-20 rounded-full bg-neutral-900 text-white flex items-center justify-center shadow-lg">
                    <Check className="w-12 h-12" />
                  </div>
                  <h3 className="text-6xl sm:text-7xl font-black tracking-widest text-neutral-900 font-mono">
                    FIM
                  </h3>
                  <p className="text-sm font-semibold tracking-wider uppercase text-neutral-700">
                    GRAVAÇÃO DIGITAL CONCLUÍDA
                  </p>
                  <p className="text-xs text-neutral-600 max-w-sm">
                    Seu voto simulado na legenda do <strong>PRO - Partido PROMA</strong> foi computado com sucesso!
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => setShowProofModal(true)}
                      className="px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase rounded hover:bg-neutral-800 transition-colors shadow-sm inline-flex items-center gap-1.5"
                    >
                      <Award className="w-4 h-4" />
                      <span>Ver Comprovante</span>
                    </button>
                    <button
                      onClick={handleResetVote}
                      className="px-4 py-2 bg-neutral-300 text-neutral-900 text-xs font-bold uppercase rounded hover:bg-neutral-400 transition-colors inline-flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Votar Novamente</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* ACTIVE VOTING SCREEN */
                <div className="flex flex-col justify-between h-full space-y-6">
                  {/* Top Header */}
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-widest text-neutral-600">
                      SEU VOTO PARA
                    </div>
                    <div className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight mt-0.5">
                      {currentOfficeData.office}
                    </div>
                  </div>

                  {/* Main Display Area */}
                  {isBlankVote ? (
                    <div className="py-12 text-center space-y-2">
                      <div className="text-3xl font-black tracking-widest text-neutral-900">
                        VOTO EM BRANCO
                      </div>
                      <p className="text-xs text-neutral-600">Aperte CONFIRMA para validar ou CORRIGE para reiniciar</p>
                    </div>
                  ) : (
                    <div className="space-y-5">
                      {/* Digits row */}
                      <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-neutral-700">Número:</span>
                        <div className="flex items-center gap-2">
                          {Array.from({ length: maxDigits }).map((_, idx) => {
                            const digit = enteredDigits[idx] || '';
                            const isCurrentSlot = enteredDigits.length === idx;
                            return (
                              <div
                                key={idx}
                                className={`w-12 h-14 border-2 flex items-center justify-center text-3xl font-mono font-bold ${
                                  isCurrentSlot
                                    ? 'border-neutral-900 bg-white shadow-sm ring-2 ring-neutral-900/20 animate-pulse'
                                    : digit
                                    ? 'border-neutral-800 bg-white text-neutral-950'
                                    : 'border-neutral-400 bg-neutral-200/50 text-transparent'
                                }`}
                              >
                                {digit}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Candidate info if PRO matched */}
                      {isMatchingParty && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-neutral-300 items-center">
                          <div className="sm:col-span-2 space-y-1.5 text-xs">
                            <div>
                              <span className="text-neutral-500 font-semibold">Nome: </span>
                              <strong className="text-neutral-900 font-bold text-sm">
                                {currentOfficeData.name}
                              </strong>
                            </div>
                            <div>
                              <span className="text-neutral-500 font-semibold">Partido: </span>
                              <strong className="text-neutral-900 font-bold">
                                {currentOfficeData.party}
                              </strong>
                            </div>
                            {currentOfficeData.viceName && (
                              <div>
                                <span className="text-neutral-500 font-semibold">Vice: </span>
                                <strong className="text-neutral-900 font-bold">
                                  {currentOfficeData.viceName}
                                </strong>
                              </div>
                            )}
                            <div className="text-[11px] text-neutral-600 pt-0.5">
                              {currentOfficeData.coalition}
                            </div>
                          </div>

                          {/* Candidate Photo */}
                          <div className="flex flex-col items-center sm:items-end">
                            <div className="w-24 h-28 border border-neutral-400 bg-white overflow-hidden shadow-sm">
                              <img
                                src={currentOfficeData.photoUrl}
                                alt={currentOfficeData.name}
                                referrerPolicy="no-referrer"
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <span className="text-[9px] uppercase font-bold text-neutral-500 mt-1">Candidato(a)</span>
                          </div>
                        </div>
                      )}

                      {/* Invalid vote warning */}
                      {isInvalidNumber && (
                        <div className="p-3 bg-red-100 border border-red-300 rounded text-red-900 text-xs space-y-1">
                          <div className="font-bold uppercase">NÚMERO ERRADO / VOTO NULO</div>
                          <div>Para votar no Partido PROMA, digite <strong>{currentOfficeData.number}</strong>.</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Urna Instructions strip */}
                  <div className="border-t border-neutral-400 pt-3 text-[11px] text-neutral-600 flex flex-col space-y-1 font-mono">
                    <div>Aperte a tecla:</div>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-sans">
                      <span><strong>CONFIRMA</strong> para GRAVAR este voto</span>
                      <span><strong>CORRIGE</strong> para REINICIAR este voto</span>
                      <span><strong>BRANCO</strong> para votar em branco</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Keypad Area (Simulated TSE Urna Keypad) */}
            <div className="lg:col-span-5 bg-neutral-900 rounded-xl p-6 flex flex-col justify-between border border-neutral-800">
              {/* Official Seal / Party Emblem header */}
              <div className="flex items-center justify-between pb-5 border-b border-neutral-800">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-neutral-400" />
                  <span className="text-xs uppercase font-extrabold tracking-widest text-neutral-300">
                    JUSTIÇA ELEITORAL SIMULADA
                  </span>
                </div>
                <div className="text-[11px] text-neutral-400 font-mono">PRO-77</div>
              </div>

              {/* Number Buttons Grid */}
              <div className="grid grid-cols-3 gap-3 my-6 max-w-[280px] mx-auto w-full">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
                  <button
                    key={digit}
                    onClick={() => handleDigitPress(digit)}
                    disabled={isVotedFinished}
                    className="h-14 bg-neutral-950 text-white font-mono text-2xl font-bold rounded-lg border border-neutral-700 hover:bg-neutral-800 active:scale-95 transition-all shadow-md flex items-center justify-center disabled:opacity-50"
                  >
                    {digit}
                  </button>
                ))}
                {/* Empty left spot */}
                <div />
                <button
                  onClick={() => handleDigitPress('0')}
                  disabled={isVotedFinished}
                  className="h-14 bg-neutral-950 text-white font-mono text-2xl font-bold rounded-lg border border-neutral-700 hover:bg-neutral-800 active:scale-95 transition-all shadow-md flex items-center justify-center disabled:opacity-50"
                >
                  0
                </button>
                <div />
              </div>

              {/* Action Buttons (BRANCO, CORRIGE, CONFIRMA) */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-neutral-800">
                <button
                  onClick={handleBranco}
                  disabled={isVotedFinished}
                  className="py-3 px-2 bg-neutral-100 text-neutral-950 hover:bg-white text-[11px] font-black uppercase tracking-wider rounded border border-neutral-300 active:scale-95 transition-all shadow disabled:opacity-50"
                >
                  Branco
                </button>
                <button
                  onClick={handleCorrige}
                  disabled={isVotedFinished}
                  className="py-3 px-2 bg-amber-600 text-white hover:bg-amber-500 text-[11px] font-black uppercase tracking-wider rounded border border-amber-700 active:scale-95 transition-all shadow disabled:opacity-50"
                >
                  Corrige
                </button>
                <button
                  onClick={handleConfirma}
                  disabled={isVotedFinished || (!isBlankVote && !isCompleteNumber)}
                  className="py-3 px-2 bg-emerald-600 text-white hover:bg-emerald-500 text-[11px] font-black uppercase tracking-wider rounded border border-emerald-700 active:scale-95 transition-all shadow disabled:opacity-50"
                >
                  Confirma
                </button>
              </div>

              {/* Helpful Hint */}
              <div className="mt-4 pt-4 border-t border-neutral-800 text-center">
                <p className="text-xs text-neutral-400">
                  Dica: Você também pode usar as teclas numéricas e Enter do seu teclado!
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Voting Certificate Modal */}
        {showProofModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-neutral-900 border border-neutral-700 rounded-xl max-w-md w-full p-6 text-white space-y-5 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-white" />
                  <span className="font-bold text-sm uppercase tracking-wider">Comprovante de Voto Cívico</span>
                </div>
                <button
                  onClick={() => setShowProofModal(false)}
                  className="text-neutral-400 hover:text-white text-xs px-2 py-1 rounded bg-neutral-800"
                >
                  Fechar
                </button>
              </div>

              <div className="bg-neutral-950 p-5 rounded-lg border border-neutral-800 space-y-3 font-mono text-xs">
                <div className="flex justify-center py-2">
                  <PartyLogo size="sm" variant="horizontal" inverted={true} />
                </div>
                <div className="border-t border-neutral-800 pt-3 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Eleição:</span>
                    <span>Nacional 2026 (Simulada)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Opção:</span>
                    <span className="text-emerald-400 font-bold">PRO - PARTIDO PROMA (77)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Autenticação:</span>
                    <span className="text-neutral-300">PROMA-ELEC-9482-TX8</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Data/Hora:</span>
                    <span>{new Date().toLocaleDateString('pt-BR')} {new Date().toLocaleTimeString('pt-BR')}</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-neutral-400 text-center">
                Compartilhe com amigos para testar a urna do PRO 77.
              </p>

              <button
                onClick={() => {
                  navigator.clipboard?.writeText('Acabei de simular meu voto no PRO - Partido PROMA (77)! Acesse e conheça as diretrizes.');
                  alert('Texto copiado para a área de transferência!');
                }}
                className="w-full py-2.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors"
              >
                Copiar Comprovante
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
