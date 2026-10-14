import React, { useState, useEffect, useRef } from 'react';
import { PartyLogo } from './PartyLogo';
import { CheckCircle2, QrCode, Download, Copy, Check, RefreshCw, UserCheck } from 'lucide-react';

interface MemberProfile {
  name: string;
  email: string;
  uf: string;
  city: string;
  nucleo: string;
  memberId: string;
  issueDate: string;
  hash: string;
}

export const MembershipSimulator: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Carlos Alberto Ferreira',
    email: 'carlos.ferreira@exemplo.com.br',
    uf: 'SP',
    city: 'São Paulo',
    nucleo: 'Inovação, Tecnologia & Liberdade Econômica',
  });

  const [affiliatedMember, setAffiliatedMember] = useState<MemberProfile | null>(null);
  const [copiedId, setCopiedId] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Load from localStorage if previously affiliated
  useEffect(() => {
    const saved = localStorage.getItem('proma_member_profile');
    if (saved) {
      try {
        setAffiliatedMember(JSON.parse(saved));
      } catch {
        // fallback
      }
    }
  }, []);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const memberId = `PRO-${formData.uf}-2026-${randomSuffix}`;
    const hash = `PROMA-${Math.random().toString(36).substring(2, 8).toUpperCase()}-${randomSuffix}`;
    const issueDate = new Date().toLocaleDateString('pt-BR');

    const newProfile: MemberProfile = {
      name: formData.name.trim().toUpperCase(),
      email: formData.email.trim(),
      uf: formData.uf,
      city: formData.city.trim(),
      nucleo: formData.nucleo,
      memberId,
      issueDate,
      hash,
    };

    setAffiliatedMember(newProfile);
    localStorage.setItem('proma_member_profile', JSON.stringify(newProfile));
  };

  const handleReset = () => {
    setAffiliatedMember(null);
    localStorage.removeItem('proma_member_profile');
  };

  const handleCopyId = () => {
    if (!affiliatedMember) return;
    navigator.clipboard?.writeText(affiliatedMember.memberId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handlePrintCard = () => {
    window.print();
  };

  const brazilianStates = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
  ];

  const nucleos = [
    'Inovação, Tecnologia & Liberdade Econômica',
    'Educação Básica & Ensino Técnico Meritocrático',
    'Segurança Pública, Inteligência & Fronteiras',
    'Agroindústria Sustentável & Infraestrutura',
    'Juventude e Lideranças Comunitárias do PRO',
    'Mulheres na Política & Gestão Pública Eficiente',
  ];

  return (
    <section id="filiacao" className="py-20 bg-neutral-950 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Campanha Nacional de Filiação 2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Filiação Digital Instantânea ao Partido PROMA
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Faça parte da renovação política que o Brasil exige. Ao preencher seu cadastro,
            sua Carteirinha Digital Oficial de Filiado é gerada imediatamente com identificador
            criptográfico e homologação partidária.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3 pb-6 border-b border-neutral-800">
              <UserCheck className="w-5 h-5 text-white" />
              <h3 className="text-lg font-bold text-white">
                Ficha de Filiação Partidária
              </h3>
            </div>

            <form onSubmit={handleRegister} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Nome Completo
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  E-mail Oficial
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu.email@exemplo.com.br"
                  className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    UF / Estado
                  </label>
                  <select
                    value={formData.uf}
                    onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
                    className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-white transition-colors"
                  >
                    {brazilianStates.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                    Município / Cidade
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Sua cidade"
                    className="w-full px-4 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-1.5">
                  Núcleo Temático de Interesse
                </label>
                <select
                  value={formData.nucleo}
                  onChange={(e) => setFormData({ ...formData, nucleo: e.target.value })}
                  className="w-full px-3 py-2.5 bg-neutral-950 border border-neutral-700 rounded-lg text-white text-sm focus:outline-none focus:border-white transition-colors"
                >
                  {nucleos.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 active:scale-[0.98] transition-all shadow-md"
                >
                  {affiliatedMember ? 'Atualizar Carteirinha Digital' : 'Homologar Filiação e Gerar Carteirinha'}
                </button>
              </div>

              <div className="text-[11px] text-neutral-400 leading-normal pt-1">
                Ao filiar-se, você declara concordância com o Manifesto Ético e Programático do PRO (Resolução 01/2026).
              </div>
            </form>
          </div>

          {/* Right Column: Virtual Member Card */}
          <div className="lg:col-span-7 flex flex-col items-center">
            {affiliatedMember ? (
              <div className="w-full space-y-6">
                
                {/* The Physical-Style Digital Membership Card */}
                <div
                  ref={cardRef}
                  className="relative w-full max-w-xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border-2 border-neutral-700 p-6 sm:p-8 shadow-2xl text-white select-none"
                >
                  {/* Watermark Eagle background in card */}
                  <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none">
                    <PartyLogo size="xl" variant="emblem-only" inverted={true} />
                  </div>

                  {/* Top Bar of the Card */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div className="flex items-center gap-3">
                      <PartyLogo size="sm" variant="horizontal" inverted={true} />
                    </div>
                    <div className="text-right">
                      <div className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold">
                        REGISTRO NACIONAL
                      </div>
                      <div className="text-xs font-mono font-bold text-white tracking-wider">
                        {affiliatedMember.memberId}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="grid grid-cols-3 gap-6 py-6 items-center">
                    <div className="col-span-2 space-y-3">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-neutral-400 font-semibold">
                          FILIADO(A)
                        </div>
                        <div className="text-lg sm:text-xl font-black text-white tracking-tight uppercase truncate">
                          {affiliatedMember.name}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                            DIRETÓRIO / CIDADE
                          </div>
                          <div className="font-semibold text-neutral-200">
                            {affiliatedMember.city} - {affiliatedMember.uf}
                          </div>
                        </div>

                        <div>
                          <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                            EMISSÃO
                          </div>
                          <div className="font-mono text-neutral-300">
                            {affiliatedMember.issueDate}
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] uppercase tracking-wider text-neutral-400 font-semibold">
                          NÚCLEO PROGRAMÁTICO
                        </div>
                        <div className="text-xs text-neutral-300 font-medium truncate">
                          {affiliatedMember.nucleo}
                        </div>
                      </div>
                    </div>

                    {/* QR Code Validation Box */}
                    <div className="flex flex-col items-center justify-center p-3 bg-white text-neutral-950 rounded-xl shadow-md border border-neutral-300">
                      <QrCode className="w-20 h-20 text-neutral-950" />
                      <div className="text-[8px] font-mono font-bold tracking-tighter text-center uppercase mt-1">
                        VALIDAÇÃO TSE
                      </div>
                    </div>
                  </div>

                  {/* Bottom Strip of Card */}
                  <div className="border-t border-neutral-800 pt-3 flex items-center justify-between text-[10px] text-neutral-400">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>STATUS: HOMOLOGADO & ATIVO</span>
                    </div>
                    <div className="font-mono text-[9px] text-neutral-500">
                      HASH: {affiliatedMember.hash}
                    </div>
                  </div>
                </div>

                {/* Card Management Actions */}
                <div className="flex flex-wrap items-center justify-center gap-4 max-w-xl mx-auto">
                  <button
                    onClick={handleCopyId}
                    className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                  >
                    {copiedId ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-neutral-400" />}
                    <span>{copiedId ? 'Matrícula Copiada!' : 'Copiar Matrícula'}</span>
                  </button>

                  <button
                    onClick={handlePrintCard}
                    className="px-4 py-2.5 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 rounded-lg text-xs font-bold uppercase tracking-wider text-white inline-flex items-center gap-2 hover:bg-neutral-800 transition-colors"
                  >
                    <Download className="w-4 h-4 text-neutral-400" />
                    <span>Imprimir / Salvar PDF</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="px-4 py-2.5 text-neutral-400 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Novo Cadastro</span>
                  </button>
                </div>

              </div>
            ) : (
              /* Placeholder preview prior to submission */
              <div className="w-full max-w-xl mx-auto rounded-2xl border-2 border-dashed border-neutral-800 p-10 text-center space-y-4 flex flex-col items-center justify-center min-h-[340px]">
                <div className="w-16 h-16 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 border border-neutral-800">
                  <UserCheck className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">
                  Sua Carteirinha de Filiado Aparecerá Aqui
                </h4>
                <p className="text-xs text-neutral-400 max-w-sm">
                  Preencha seus dados ao lado para emitir imediatamente seu documento digital oficial com QR Code e validação no Partido PROMA.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
