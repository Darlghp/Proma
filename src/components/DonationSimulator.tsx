import React, { useState } from 'react';
import { QrCode, Copy, Check, ShieldCheck, HeartHandshake } from 'lucide-react';

export const DonationSimulator: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(77);
  const [donorName, setDonorName] = useState<string>('');
  const [donorCpf, setDonorCpf] = useState<string>('');
  const [showReceipt, setShowReceipt] = useState<boolean>(false);
  const [copiedPix, setCopiedPix] = useState<boolean>(false);

  const predefinedAmounts = [25, 77, 150, 300, 500];

  const handleSimulateDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donorName.trim() || selectedAmount <= 0) return;
    setShowReceipt(true);
  };

  const fakePixCode = `00020126580014BR.GOV.BCB.PIX0136pix-doacao@partidoproma.org.br520400005303986540${selectedAmount}.005802BR5920PARTIDO PROMA 776008BRASILIA62070503***630477FE`;

  const handleCopyPix = () => {
    navigator.clipboard?.writeText(fakePixCode);
    setCopiedPix(true);
    setTimeout(() => setCopiedPix(false), 2000);
  };

  return (
    <section className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Financiamento Cidadão & Transparência
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Apoie o Partido PROMA com Doação Direta
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Nossa independência política vem de cidadãos que acreditam na renovação do país.
            Simule sua contribuição voluntária via Pix legalizado com emissão instantânea de recibo partidário.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Donation Form */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-800">
              <HeartHandshake className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">
                Simulador de Contribuição Eleitoral Voluntária
              </h3>
            </div>

            {/* Quick Amount Buttons */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
                Selecione o Valor da Contribuição
              </label>
              <div className="grid grid-cols-5 gap-2 sm:gap-3">
                {predefinedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setSelectedAmount(amt)}
                    className={`py-3 text-center text-sm font-bold font-mono rounded-lg border transition-all ${
                      selectedAmount === amt
                        ? 'bg-white text-neutral-950 border-white shadow-md'
                        : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-700'
                    }`}
                  >
                    R$ {amt}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSimulateDonation} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  Nome do Doador(a)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Nome completo para emissão do recibo eleitoral"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-1.5">
                  CPF (Identificação Obrigatória pelo TSE)
                </label>
                <input
                  type="text"
                  required
                  placeholder="000.000.000-00 (simulado)"
                  value={donorCpf}
                  onChange={(e) => setDonorCpf(e.target.value)}
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-md"
                >
                  Gerar Chave Pix & Recibo Simulado (R$ {selectedAmount},00)
                </button>
              </div>
            </form>

            <div className="text-[11px] text-neutral-500 flex items-center gap-2 pt-2 border-t border-neutral-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Em conformidade com as regras do TSE (Limite de até 10% do rendimento bruto declarado).</span>
            </div>
          </div>

          {/* Budget Breakdown & Real-Time Receipt preview */}
          <div className="lg:col-span-5 space-y-6">
            
            {showReceipt ? (
              <div className="bg-neutral-950 border border-neutral-700 rounded-2xl p-6 space-y-5 animate-in fade-in duration-200">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    Recibo de Doação Simulado
                  </span>
                  <span className="font-mono text-xs text-neutral-400">CNPJ: 77.077.077/0001-77</span>
                </div>

                <div className="flex flex-col items-center justify-center p-4 bg-white text-neutral-950 rounded-xl space-y-2">
                  <QrCode className="w-28 h-28 text-neutral-950" />
                  <span className="text-[10px] font-mono font-bold tracking-tight text-center uppercase">
                    PIX CHAVE: DOACAO@PARTIDOPROMA.ORG.BR
                  </span>
                </div>

                <div className="space-y-1.5 font-mono text-xs text-neutral-300">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Doador:</span>
                    <span className="font-bold text-white uppercase">{donorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Valor:</span>
                    <span className="font-bold text-emerald-400">R$ {selectedAmount},00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Destinação:</span>
                    <span>Diretório Nacional PRO</span>
                  </div>
                </div>

                <button
                  onClick={handleCopyPix}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {copiedPix ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedPix ? 'Chave Copiada!' : 'Copiar Código Pix Copia e Cola'}</span>
                </button>
              </div>
            ) : (
              <div className="bg-neutral-950 border border-neutral-800 rounded-2xl p-6 sm:p-8 space-y-5">
                <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                  Para Onde Vai Cada Real Arrecadado?
                </h4>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Ao contrário dos partidos tradicionais que dependem exclusivamente de fundos estatais,
                  o PRO investe as doações prioritariamente na formação de lideranças de base:
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Escola de Líderes & Cidadania</span>
                      <span className="text-white font-bold">45%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-white w-[45%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Expansão de Diretórios Municipais</span>
                      <span className="text-white font-bold">35%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-300 w-[35%]" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-neutral-300">Auditoria & Tecnologia Aberta</span>
                      <span className="text-white font-bold">20%</span>
                    </div>
                    <div className="w-full h-2 bg-neutral-800 rounded-full overflow-hidden">
                      <div className="h-full bg-neutral-500 w-[20%]" />
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
