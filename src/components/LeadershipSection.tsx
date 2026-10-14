import React, { useState } from 'react';
import { Quote, Send, Check } from 'lucide-react';

export const LeadershipSection: React.FC = () => {
  const [messageSent, setMessageSent] = useState(false);
  const [citizenMessage, setCitizenMessage] = useState('');
  const [citizenAuthor, setCitizenAuthor] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!citizenMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setCitizenMessage('');
      setCitizenAuthor('');
      setMessageSent(false);
    }, 4000);
  };

  return (
    <section id="liderancas" className="py-20 bg-neutral-950 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Executiva Nacional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Liderança Firme, Visão de Longo Prazo
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Conheça as pessoas à frente da construção do Partido PROMA: profissionais experientes,
            jovens ativistas e acadêmicos unidos pelo compromisso com o futuro da nação.
          </p>
        </div>

        {/* Feature 1: Helena Vasconcelos (Presidente Nacional) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full">
            <img
              src="/src/assets/images/proma_leadership_speech_1791869916616.jpg"
              alt="Dra. Helena Vasconcelos discursando na bancada oficial do Partido PROMA"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent lg:hidden" />
          </div>

          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <span>Presidente Nacional</span>
                <span aria-hidden="true">·</span>
                <span>Mandato 2025–2028</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Dra. Helena Vasconcelos
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Jurista e economista com mais de 20 anos dedicados à desburocratização de políticas
                públicas e integridade governamental. Fundou o Partido PROMA com a convicção de que
                o Brasil precisa de liderança técnica, firmeza institucional e coragem moral para
                romper com velhos acordos de bastidor.
              </p>

              {/* Quote block without thick left border */}
              <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl space-y-2">
                <Quote className="w-5 h-5 text-neutral-400" />
                <p className="text-sm italic text-neutral-200">
                  "O povo brasileiro cansou de escolher entre a estagnação e o descontrole.
                  O PRO nasceu para provar que a ordem e a modernidade caminham lado a lado."
                </p>
              </div>
            </div>

            {/* Direct message to the president box */}
            <div className="pt-4 border-t border-neutral-800">
              <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 mb-2">
                Envie uma Proposta Direta à Presidência do PRO
              </h4>
              {messageSent ? (
                <div className="p-3 bg-emerald-950/50 border border-emerald-800 text-emerald-300 rounded-lg text-xs flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Mensagem protocolada na Ouvidoria Nacional do PRO com sucesso!</span>
                </div>
              ) : (
                <form onSubmit={handleSendMessage} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Seu nome"
                    value={citizenAuthor}
                    onChange={(e) => setCitizenAuthor(e.target.value)}
                    className="sm:w-1/3 px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Sua sugestão ou crítica para o partido..."
                    value={citizenMessage}
                    onChange={(e) => setCitizenMessage(e.target.value)}
                    className="flex-1 px-3 py-2 bg-neutral-950 border border-neutral-700 rounded-lg text-xs text-white focus:outline-none focus:border-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-white text-neutral-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-neutral-200 transition-colors inline-flex items-center justify-center gap-1.5 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Feature 2: Juventude e Ação Cívica */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
          <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-widest">
                <span>Juventude PRO & Cidadania</span>
                <span aria-hidden="true">·</span>
                <span>Mais de 42.000 voluntários</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Juventude PRO: A Próxima Geração no Comando
              </h3>

              <p className="text-neutral-300 text-sm sm:text-base leading-relaxed">
                Nossos núcleos jovens não são meros figurantes de palanque. Na sede de campanha
                e nos diretórios municipais, lideranças universitárias, empreendedores sociais e
                desenvolvedores desenham projetos de lei, fiscalizam licitações públicas locais
                e mobilizam suas comunidades em debates abertos.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
                  <div className="text-xl font-bold font-mono text-white">42.800+</div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase mt-0.5">Jovens Líderes</div>
                  <p className="text-[11px] text-neutral-500 mt-1">Capacitados em escolas de gestão cívica</p>
                </div>
                <div className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl">
                  <div className="text-xl font-bold font-mono text-white">314</div>
                  <div className="text-xs text-neutral-400 font-semibold uppercase mt-0.5">Projetos de Bairro</div>
                  <p className="text-[11px] text-neutral-500 mt-1">Implementados por iniciativa voluntária</p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-xs text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white" />
              <span>Inscrições abertas para o Programa de Formação de Líderes PROMA 2026.</span>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full order-1 lg:order-2">
            <img
              src="/src/assets/images/proma_civic_action_1791869916880.jpg"
              alt="Voluntários e jovens lideranças do PRO reunidos planejando ações cívicas e propostas"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
