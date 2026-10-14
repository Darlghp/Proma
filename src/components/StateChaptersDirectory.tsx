import React, { useState } from 'react';
import { MapPin, Phone, Mail, Search, CheckCircle } from 'lucide-react';

interface DirectoryInfo {
  uf: string;
  stateName: string;
  region: 'Sudeste' | 'Sul' | 'Nordeste' | 'Centro-Oeste' | 'Norte';
  president: string;
  address: string;
  city: string;
  email: string;
  phone: string;
  activeAffiliates: number;
}

export const StateChaptersDirectory: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string>('todas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [copiedContact, setCopiedContact] = useState<string | null>(null);

  const directories: DirectoryInfo[] = [
    {
      uf: 'SP',
      stateName: 'São Paulo',
      region: 'Sudeste',
      president: 'Dr. Leonardo Albuquerque',
      city: 'São Paulo',
      address: 'Av. Paulista, 1842 - Conjunto 1401, Bela Vista',
      email: 'sp@partidoproma.org.br',
      phone: '(11) 3280-7700',
      activeAffiliates: 48920,
    },
    {
      uf: 'RJ',
      stateName: 'Rio de Janeiro',
      region: 'Sudeste',
      president: 'Eng. Mariana Castello',
      city: 'Rio de Janeiro',
      address: 'Rua da Assembleia, 10 - Sala 2201, Centro',
      email: 'rj@partidoproma.org.br',
      phone: '(21) 2530-7700',
      activeAffiliates: 26400,
    },
    {
      uf: 'MG',
      stateName: 'Minas Gerais',
      region: 'Sudeste',
      president: 'Prof. Gilberto Silveira',
      city: 'Belo Horizonte',
      address: 'Av. Afonso Pena, 3130 - Funcionários',
      email: 'mg@partidoproma.org.br',
      phone: '(31) 3340-7700',
      activeAffiliates: 31200,
    },
    {
      uf: 'DF',
      stateName: 'Distrito Federal (Sede Nacional)',
      region: 'Centro-Oeste',
      president: 'Dra. Helena Vasconcelos',
      city: 'Brasília',
      address: 'Setor Comercial Sul (SCS), Quadra 4, Bloco A, Ed. PROMA 77',
      email: 'nacional@partidoproma.org.br',
      phone: '(61) 3040-7700',
      activeAffiliates: 18900,
    },
    {
      uf: 'RS',
      stateName: 'Rio Grande do Sul',
      region: 'Sul',
      president: 'Carlos Eduardo Ritter',
      city: 'Porto Alegre',
      address: 'Rua dos Andradas, 1234 - Centro Histórico',
      email: 'rs@partidoproma.org.br',
      phone: '(51) 3220-7700',
      activeAffiliates: 19500,
    },
    {
      uf: 'PR',
      stateName: 'Paraná',
      region: 'Sul',
      president: 'Patrícia Guimarães',
      city: 'Curitiba',
      address: 'Rua XV de Novembro, 800 - Centro',
      email: 'pr@partidoproma.org.br',
      phone: '(41) 3190-7700',
      activeAffiliates: 16800,
    },
    {
      uf: 'BA',
      stateName: 'Bahia',
      region: 'Nordeste',
      president: 'Dr. Valter Coutinho',
      city: 'Salvador',
      address: 'Av. Tancredo Neves, 1632 - Ed. Salvador Trade, Caminho das Árvores',
      email: 'ba@partidoproma.org.br',
      phone: '(71) 3360-7700',
      activeAffiliates: 21300,
    },
    {
      uf: 'PE',
      stateName: 'Pernambuco',
      region: 'Nordeste',
      president: 'Dra. Luiza Dantas',
      city: 'Recife',
      address: 'Av. Agamenon Magalhães, 2650 - Espinheiro',
      email: 'pe@partidoproma.org.br',
      phone: '(81) 3410-7700',
      activeAffiliates: 14200,
    },
    {
      uf: 'GO',
      stateName: 'Goiás',
      region: 'Centro-Oeste',
      president: 'Renato Morais de Castro',
      city: 'Goiânia',
      address: 'Av. 85, 1420 - Setor Sul',
      email: 'go@partidoproma.org.br',
      phone: '(62) 3250-7700',
      activeAffiliates: 12100,
    },
    {
      uf: 'SC',
      stateName: 'Santa Catarina',
      region: 'Sul',
      president: 'Henrique Schramm',
      city: 'Florianópolis',
      address: 'Av. Beira-Mar Norte, 2200 - Centro',
      email: 'sc@partidoproma.org.br',
      phone: '(48) 3290-7700',
      activeAffiliates: 15400,
    },
    {
      uf: 'AM',
      stateName: 'Amazonas',
      region: 'Norte',
      president: 'Biol. Thiago Brandão',
      city: 'Manaus',
      address: 'Av. Djalma Batista, 1661 - Chapada',
      email: 'am@partidoproma.org.br',
      phone: '(92) 3640-7700',
      activeAffiliates: 9300,
    },
    {
      uf: 'PA',
      stateName: 'Pará',
      region: 'Norte',
      president: 'Dra. Vanessa Meireles',
      city: 'Belém',
      address: 'Av. Nazaré, 890 - Nazaré',
      email: 'pa@partidoproma.org.br',
      phone: '(91) 3210-7700',
      activeAffiliates: 11200,
    },
  ];

  const handleCopyEmail = (email: string) => {
    navigator.clipboard?.writeText(email);
    setCopiedContact(email);
    setTimeout(() => setCopiedContact(null), 2000);
  };

  const filtered = directories.filter((item) => {
    const matchesRegion = selectedRegion === 'todas' || item.region === selectedRegion;
    const matchesSearch =
      item.stateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.uf.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.president.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <section id="diretorios" className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-2">
            Rede Federativa Nacional
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Diretórios Regionais do PRO em Todo o Brasil
          </h2>
          <p className="text-neutral-300 mt-3 text-base leading-relaxed">
            Estamos organizados em todos os estados da federação. Encontre a sede do Partido PROMA
            mais próxima de você para participar das convenções municipais e núcleos de base.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          {/* Region Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-950 rounded-lg border border-neutral-800">
            {['todas', 'Sudeste', 'Sul', 'Nordeste', 'Centro-Oeste', 'Norte'].map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                  selectedRegion === region
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {region === 'todas' ? 'Todas as Regiões' : region}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative max-w-xs w-full">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por estado, UF ou cidade..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-neutral-950 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
            />
          </div>
        </div>

        {/* Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.uf}
              className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 flex flex-col justify-between hover:border-neutral-700 transition-colors space-y-5"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-neutral-800 border border-neutral-700 font-mono font-bold text-white text-xs flex items-center justify-center">
                      {item.uf}
                    </span>
                    <div>
                      <h3 className="font-bold text-base text-white">{item.stateName}</h3>
                      <div className="text-[11px] text-neutral-400">{item.region}</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400 tabular-nums">
                    {item.activeAffiliates.toLocaleString('pt-BR')} filiados
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-800/80 space-y-2.5 text-xs text-neutral-300">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-3.5 h-3.5 text-neutral-500 mt-0.5 shrink-0" />
                    <span className="line-clamp-2">{item.address} - {item.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="font-mono">{item.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span className="truncate">{item.email}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-800/60 flex items-center justify-between text-xs">
                <span className="text-neutral-400 text-[11px]">Presidência: {item.president}</span>
                <button
                  onClick={() => handleCopyEmail(item.email)}
                  className="text-white hover:underline text-[11px] font-semibold flex items-center gap-1"
                >
                  {copiedContact === item.email ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Copiado
                    </span>
                  ) : (
                    <span>Copiar E-mail</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
