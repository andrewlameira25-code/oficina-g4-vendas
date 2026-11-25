import { useEffect, useState } from "react";
import {
  Flame,
  Zap,
  Dumbbell,
  ShoppingBag,
  Gift,
  HelpCircle,
  MessageCircle,
  ChevronDown,
  Bell,
  AlertTriangle,
  CheckCircle2,
  MapPin,
  Sparkles,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";
import { G4_CONFIG, buildWhatsAppLink } from "../lib/config";

interface ProdutoPublicoApi {
  id?: string;
  _id?: string;
  nome: string;
  preco_venda: number;
  estoque_atual: number;
  categoria?: string;
  imagemUrl?: string;
}

interface CatalogProduct {
  id: string;
  matchKey: string;
  badge: string;
  nome: string;
  preco: number;
  imagem: string;
  descricao: string;
  paraQuem: string;
  comoUsar?: string;
  rendimento?: string;
  destaqueDose?: string;
  alertaExtra?: string;
  featured?: boolean;
  defaultEstoque: number;
}

const CREATINAS: CatalogProduct[] = [
  {
    id: "creatina-ultra-ftw",
    matchKey: "creatina ftw",
    badge: "🥇 INICIANTE",
    nome: "Creatina Ultra 300g FTW",
    preco: 50,
    imagem: "/images/suplementos/creatina-ftw-monohidratada-300g.webp",
    descricao: "Creatina monohidratada com maltodextrina, sabor neutro, sem glúten, dose diária de 5g.",
    paraQuem: "Quem está começando e quer uma creatina sem sabor que mistura fácil em qualquer líquido.",
    comoUsar: "5g (1 dosador) por dia, todos os dias — inclusive nos dias sem treino.",
    rendimento: "60 dias",
    destaqueDose: "R$ 0,83 / dia",
    defaultEstoque: 0,
  },
  {
    id: "creatina-ftw-mono",
    matchKey: "ftw monohidratada",
    badge: "🥈 PURA 300G",
    nome: "Creatina FTW Monohidratada 300g",
    preco: 60,
    imagem: "/images/suplementos/creatina-ftw-monohidratada-300g.webp",
    descricao: "100% monohidratada — a forma mais estudada do mercado (88% creatina + 12% água), oferecendo absorção superior.",
    paraQuem: "Quem já treina há mais tempo e quer máxima pureza com excelente custo.",
    rendimento: "60 dias",
    destaqueDose: "R$ 1,00 / dia",
    defaultEstoque: 0,
  },
  {
    id: "creatina-bvs",
    matchKey: "beta alanina bvs",
    badge: "🥉 FORÇA + RESISTÊNCIA",
    nome: "Creatina + Beta Alanina BVS",
    preco: 65,
    imagem: "/images/suplementos/creatina-beta-alanina-bvs.webp",
    descricao: "Fórmula combinada: creatina para explosão de força + beta-alanina para resistência muscular.",
    paraQuem: "Quem treina musculação intensa e sente aquela 'queimação' nas últimas repetições.",
    defaultEstoque: 0,
  },
  {
    id: "creatina-dark-lab-300g",
    matchKey: "dark lab 100% pura sem sabor 300g",
    badge: "💎 PUREZA MÁXIMA",
    nome: "Dark Lab 100% Pura Sem Sabor 300g",
    preco: 85,
    imagem: "/images/suplementos/creatina-dark-lab-300g.webp",
    descricao: "Creatina monohidratada certificada 100% pura com 1 único ingrediente: sem sabor artificial, corantes, adoçantes ou enchimentos.",
    paraQuem: "Quem exige pureza máxima e não aceita misturinhas.",
    destaqueDose: "R$ 1,66 / dose",
    defaultEstoque: 5,
  },
  {
    id: "creatina-dark-lab-1kg",
    matchKey: "1kg dark lab",
    badge: "🏆 MELHOR CUSTO POR DOSE",
    nome: "Creatina Monohidratada Pura 1kg DARK LAB",
    preco: 180,
    imagem: "/images/suplementos/creatina-monohidratada-1kg-dark-lab.webp",
    descricao: "Aumenta força e resistência muscular, potencializa a recuperação após treinos intensos e eleva a energia celular.",
    paraQuem: "Quem treina pesado e quer o melhor custo por grama (200 doses = mais de 6 meses de uso).",
    rendimento: "200 doses (~6 meses)",
    destaqueDose: "💰 R$ 0,90 / dose (vs R$ 1,66 na de 300g)",
    featured: true,
    defaultEstoque: 0,
  },
];

const ENERGIA_FOCO: CatalogProduct[] = [
  {
    id: "maca-peruana-snake",
    matchKey: "maca peruana",
    badge: "🔥 4X MAIS CONCENTRADA",
    nome: "Maca Peruana Snake Dragon 120 Cáps (2g/dose)",
    preco: 48,
    imagem: "/images/suplementos/maca-peruana-snake-dragon.webp",
    descricao: "Maca peruana Lepidium Meyenii com 2g por dose: promove energia, foco, equilíbrio hormonal e resistência física e mental.",
    paraQuem: "Diferencial real: a maioria das macas entrega 500mg por dose. A Snake Dragon entrega 4x mais.",
    comoUsar: "2 cápsulas de manhã, em jejum.",
    rendimento: "60 dias",
    defaultEstoque: 1,
  },
  {
    id: "nuclear-rush",
    matchKey: "nuclear rush",
    badge: "💥 ALTA POTÊNCIA",
    nome: "Pré-Treino Nuclear Rush Body Action 100g",
    preco: 60,
    imagem: "/images/suplementos/pre-treino-nuclear-rush-2000mg.webp",
    descricao: "Fórmula completa: 400mg cafeína anidra, 2000mg beta-alanina, 1000mg taurina, arginina, isomaltulose, CoQ10, boro e complexo B.",
    paraQuem: "Quem precisa de um gás extra nos dias difíceis e treinos pesados.",
    comoUsar: "1 dosador (8g) 30 min antes do treino.",
    alertaExtra: "⚠️ Não usar à noite (cafeína alta).",
    defaultEstoque: 0,
  },
];

const MASSA_RECUPERACAO: CatalogProduct[] = [
  {
    id: "whey-1kg",
    matchKey: "whey protein concentrado",
    badge: "🥛 PROTEÍNA DIÁRIA",
    nome: "Whey Protein Concentrado 1kg",
    preco: 110,
    imagem: "/images/suplementos/whey-protein-concentrado-1kg.webp",
    descricao: "Proteína concentrada do soro do leite (WPC) oferecendo 15–24g de proteína por dose para ganho de massa muscular e recuperação.",
    paraQuem: "Quem quer bater a meta diária de proteína sem precisar comer 6 ovos e 3 peitos de frango todo dia.",
    comoUsar: "1 dosador (30g) com água ou leite, pós-treino ou entre refeições.",
    rendimento: "33 doses (~1 mês)",
    defaultEstoque: 0,
  },
  {
    id: "creamass-3kg",
    matchKey: "creamass",
    badge: "🍰 609 KCAL + CREATINA",
    nome: "Integralmédica Creamass Hipercalórico 3kg",
    preco: 120,
    imagem: "/images/suplementos/integralmedica-creamass-hipercalorico.webp",
    descricao: "Hipercalórico com 609 kcal por porção de 160g + creatina, ideal para ectomorfos e treinos intensos.",
    paraQuem: "Quem come muito e não engorda — o clássico 'magrelo que quer crescer' com consistência.",
    comoUsar: "1 a 2 porções ao dia (café da manhã e pós-treino).",
    defaultEstoque: 0,
  },
];

const ACESSORIOS = [
  {
    id: "coqueteleira-meme",
    matchKey: "coqueteleira",
    nome: "Coqueteleira Meme 500ML",
    preco: 20,
    imagem: "/images/suplementos/coqueteleira-meme.webp",
    porque: "Todo mundo que compra Whey ou Creatina precisa. Prática, resistente e estilosa.",
    defaultEstoque: 5,
  },
  {
    id: "luva-silicone",
    matchKey: "luva academia",
    nome: "Luva Academia Silicone Anti-calo",
    preco: 36,
    imagem: "/images/suplementos/luva-academia-silicone-anti-calo.webp",
    porque: "Resolve a dor real de quem machuca a mão na barra e melhora a pegada nos treinos.",
    defaultEstoque: 0,
  },
  {
    id: "camiseta-dry-fit",
    matchKey: "camiseta dry fit",
    nome: "Camiseta Dry Fit Alpha",
    preco: 40,
    imagem: "/images/suplementos/camiseta-dry-fit-alpha.webp",
    porque: "Identidade G4. Tecido leve, respirável e caimento perfeito para treinar.",
    defaultEstoque: 0,
  },
];

const COMBOS = [
  {
    nome: "COMBO INICIANTE",
    tag: "COMECE CERTO",
    itens: "Creatina Ultra FTW 300g + Coqueteleira Meme 500ML",
    precoAvulso: 70,
    precoCombo: 65,
    economia: 5,
  },
  {
    nome: "COMBO FORÇA TOTAL",
    tag: "ENERGIA & FOCO",
    itens: "Maca Peruana Snake Dragon + Pré-Treino Nuclear Rush",
    precoAvulso: 108,
    precoCombo: 98,
    economia: 10,
  },
  {
    nome: "COMBO MASSA MONSTRO",
    tag: "GANHO DE PESO",
    itens: "Whey Protein 1kg + Creamass Integralmédica 3kg",
    precoAvulso: 230,
    precoCombo: 210,
    economia: 20,
  },
  {
    nome: "COMBO PERFORMANCE G4",
    tag: "🏆 MAIS PEDIDO",
    itens: "Creatina FTW 300g + Maca Peruana Snake Dragon + Coqueteleira Meme",
    precoAvulso: 128,
    precoCombo: 115,
    economia: 13,
    featured: true,
  },
];

const FAQ_SUPLEMENTOS = [
  {
    q: "Tem taxa de matrícula para comprar suplemento?",
    a: "Não. Aqui você paga só o produto. Zero taxa de adesão, zero pegadinha — qualquer pessoa pode comprar ou retirar na recepção.",
  },
  {
    q: "Posso parcelar?",
    a: "Sim. Aceitamos PIX, cartão de crédito (parcelado), débito e dinheiro.",
  },
  {
    q: "É doping? Faz mal?",
    a: "Não. Creatina, maca e whey são alimentos/suplementos reconhecidos pela ANVISA. Não afetam exames antidoping, não sobem pressão e não fazem mal. Quem tem condição de saúde específica deve consultar o médico — como faria com qualquer alimento.",
  },
  {
    q: "Nunca usei suplemento, vou me sentir perdido?",
    a: "Aqui ninguém compra sozinho. O Leonidas ou o Andrew explicam exatamente como tomar, quando tomar e o que esperar. Sem pressa e sem julgamento.",
  },
  {
    q: "Funciona mesmo ou é enrolação?",
    a: "Vamos ser honestos: não é mágica. Se você dorme 4h e come mal, nenhum suplemento resolve. Mas se você já treina e se alimenta, o suplemento potencializa o que você já faz — é o 'combustível extra'.",
  },
  {
    q: "Vocês entregam?",
    a: "Retirada imediata na recepção da Oficina G4 (Coqueiro, em cima da Sorveteria Labom — rua segura e movimentada) ou entrega combinada diretamente pelo WhatsApp.",
  },
  {
    q: "E se eu tiver dúvida ou não gostar?",
    a: "Fale com a gente. Produto lacrado não trocamos após aberto, mas qualquer dúvida de uso ou adaptação a gente resolve em 2 minutos no WhatsApp.",
  },
];

function formatBRL(v: number) {
  return `R$ ${v.toFixed(2).replace(".", ",")}`;
}

export function SuplementosSalesPage() {
  const [estoqueMap, setEstoqueMap] = useState<Record<string, number>>({});
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Suplementos Oficina G4 — Creatina, Whey, Pré-Treino e Combos em Belém";
    fetch("https://g4-adm.vercel.app/api/produtos/publico")
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (!json?.data || !Array.isArray(json.data)) return;
        const map: Record<string, number> = {};
        (json.data as ProdutoPublicoApi[]).forEach((p) => {
          map[p.nome.toLowerCase()] = Number(p.estoque_atual ?? 0);
        });
        setEstoqueMap(map);
      })
      .catch(() => {});
  }, []);

  const getEstoqueReal = (matchKey: string, fallback: number): number => {
    const keys = Object.keys(estoqueMap);
    if (keys.length === 0) return fallback;
    const found = keys.find((k) => k.includes(matchKey.toLowerCase()));
    return found !== undefined ? estoqueMap[found] : fallback;
  };

  const renderProductCard = (p: CatalogProduct) => {
    const estoque = getEstoqueReal(p.matchKey, p.defaultEstoque);
    const isEsgotado = estoque <= 0;
    const isUltimaUnidade = estoque === 1;

    const waMsg = isEsgotado
      ? `Olá Leonidas! Vi a página de suplementos da Oficina G4 e quero entrar na lista de espera (AVISE-ME QUANDO CHEGAR) do produto: ${p.nome} (${formatBRL(p.preco)}).`
      : isUltimaUnidade
      ? `Olá Leonidas! Quero garantir a ÚLTIMA UNIDADE do produto ${p.nome} (${formatBRL(p.preco)}) na Oficina G4!`
      : `Olá Leonidas! Quero reservar o produto ${p.nome} (${formatBRL(p.preco)}) na Oficina G4!`;

    return (
      <div
        key={p.id}
        className={`group relative rounded-2xl border bg-zinc-950/90 overflow-hidden flex flex-col transition-all duration-300 ${
          p.featured
            ? "border-[#FF6B00] shadow-[0_0_30px_rgba(255,107,0,0.18)]"
            : "border-zinc-800 hover:border-zinc-700"
        }`}
      >
        {/* Imagem */}
        <div className="relative aspect-[4/3] bg-white/95 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={p.imagem}
            alt={p.nome}
            loading="lazy"
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
          <span className="absolute top-3 left-3 rounded-full bg-zinc-950/90 border border-zinc-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
            {p.badge}
          </span>
          {isUltimaUnidade && (
            <span className="absolute top-3 right-3 rounded-full bg-red-600 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white animate-pulse shadow-lg shadow-red-600/40">
              ⚠️ ÚLTIMA UNIDADE
            </span>
          )}
          {isEsgotado && (
            <span className="absolute top-3 right-3 rounded-full bg-amber-500/95 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-zinc-950">
              LISTA DE ESPERA
            </span>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-5 flex-1 flex flex-col justify-between gap-4">
          <div className="space-y-2.5">
            <h3 className="text-lg font-extrabold text-white leading-snug">{p.nome}</h3>

            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-2xl font-black text-[#FF6B00]">{formatBRL(p.preco)}</span>
              {p.destaqueDose && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                  <TrendingDown className="h-3 w-3" /> {p.destaqueDose}
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">{p.descricao}</p>

            <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-3 space-y-1.5 text-xs">
              <p className="text-zinc-300">
                <strong className="text-white">Para quem é:</strong> {p.paraQuem}
              </p>
              {p.comoUsar && (
                <p className="text-zinc-400">
                  <strong className="text-zinc-200">Como usar:</strong> {p.comoUsar}
                </p>
              )}
              {p.rendimento && (
                <p className="text-emerald-400 font-semibold">✓ Rendimento: {p.rendimento}</p>
              )}
              {p.alertaExtra && (
                <p className="text-amber-400 font-semibold">{p.alertaExtra}</p>
              )}
            </div>
          </div>

          <a
            href={buildWhatsAppLink(waMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full rounded-xl py-3 px-4 text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all active:scale-95 ${
              isEsgotado
                ? "bg-amber-400 hover:bg-amber-300 text-zinc-950"
                : isUltimaUnidade
                ? "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30"
                : "bg-[#FF6B00] hover:bg-[#e55f00] text-white shadow-lg shadow-[#FF6B00]/25"
            }`}
          >
            {isEsgotado ? (
              <>
                <Bell className="h-4 w-4" /> Avise-me quando chegar
              </>
            ) : isUltimaUnidade ? (
              <>
                <AlertTriangle className="h-4 w-4" /> Garantir Última Unidade
              </>
            ) : (
              <>
                <MessageCircle className="h-4 w-4" /> Reservar no WhatsApp
              </>
            )}
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-zinc-100 selection:bg-[#FF6B00] selection:text-white">
      {/* Header Exclusivo Suplementos */}
      <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#09090B]/90 backdrop-blur-md">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-[#FF6B00] flex items-center justify-center font-black text-white text-sm">
              G4
            </div>
            <div>
              <p className="text-sm font-black tracking-tight text-white leading-none">
                OFICINA G4 <span className="text-[#FF6B00]">SUPLEMENTOS</span>
              </p>
              <p className="text-[11px] text-zinc-400">Coqueiro • Belém/PA</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-zinc-300">
            <a href="#creatinas" className="hover:text-[#FF6B00] transition-colors">Creatinas</a>
            <a href="#energia" className="hover:text-[#FF6B00] transition-colors">Energia & Foco</a>
            <a href="#massa" className="hover:text-[#FF6B00] transition-colors">Massa & Whey</a>
            <a href="#acessorios" className="hover:text-[#FF6B00] transition-colors">Acessórios</a>
            <a href="#combos" className="hover:text-[#FF6B00] transition-colors">Combos</a>
            <a href="#faq" className="hover:text-[#FF6B00] transition-colors">Dúvidas</a>
          </nav>

          <a
            href={buildWhatsAppLink("Olá Leonidas! Vim pela página de Suplementos da Oficina G4 e quero ajuda para escolher o suplemento ideal pro meu objetivo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#FF6B00] hover:bg-[#e55f00] px-4 py-2 text-xs font-black text-white flex items-center gap-1.5 shadow-md"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Falar com Leonidas
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-[#FF6B00]/10 via-[#09090B] to-[#09090B]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 text-center space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-bold text-[#FF6B00]">
            <ShieldCheck className="h-4 w-4" /> Procedência Garantida • Orientação Real com Professor
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Suplementos originais com <span className="text-[#FF6B00]">preço justo</span> e orientação de quem entende de treino.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Aqui você não compra no escuro. O Leonidas e o Andrew explicam exatamente o que tomar, quanto tomar e como encaixar no seu objetivo — sem taxa oculta e com retirada rápida na recepção da Oficina G4.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#creatinas"
              className="rounded-full bg-[#FF6B00] hover:bg-[#e55f00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#FF6B00]/25"
            >
              Ver Catálogo Completo
            </a>
            <a
              href="#combos"
              className="rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 px-6 py-3 text-sm font-bold text-white"
            >
              🎁 Ver Combos com Desconto
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-20">
        {/* SEÇÃO 1 — CREATINAS */}
        <section id="creatinas" className="space-y-6 scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">📦 Seção 1 — O Carro-Chefe</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-[#FF6B00]" /> Creatinas
              </h2>
            </div>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-300">
              💡 <strong>Dica de Economia:</strong> Dark Lab 1kg sai por <strong>R$ 0,90/dose</strong> vs <strong>R$ 1,66/dose</strong> na de 300g!
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CREATINAS.map(renderProductCard)}
          </div>
        </section>

        {/* SEÇÃO 2 — ENERGIA E FOCO */}
        <section id="energia" className="space-y-6 scroll-mt-20">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">⚡ Seção 2</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#FF6B00]" /> Energia e Foco
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ENERGIA_FOCO.map(renderProductCard)}
          </div>
        </section>

        {/* SEÇÃO 3 — MASSA E RECUPERAÇÃO */}
        <section id="massa" className="space-y-6 scroll-mt-20">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">💪 Seção 3</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
              <Flame className="h-6 w-6 text-[#FF6B00]" /> Massa e Recuperação
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MASSA_RECUPERACAO.map(renderProductCard)}
          </div>
        </section>

        {/* SEÇÃO 4 — ACESSÓRIOS */}
        <section id="acessorios" className="space-y-6 scroll-mt-20">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">🎒 Seção 4</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-[#FF6B00]" /> Acessórios G4
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ACESSORIOS.map((ac) => {
              const est = getEstoqueReal(ac.matchKey, ac.defaultEstoque);
              const isOut = est <= 0;
              const msg = isOut
                ? `Olá Leonidas! Quero entrar na lista de espera do acessório ${ac.nome} (${formatBRL(ac.preco)}) quando chegar na Oficina G4.`
                : `Olá Leonidas! Quero reservar o acessório ${ac.nome} (${formatBRL(ac.preco)}) na Oficina G4!`;
              return (
                <div key={ac.id} className="rounded-2xl border border-zinc-800 bg-zinc-950/90 overflow-hidden flex flex-col">
                  <div className="relative aspect-[4/3] bg-white/95 p-4 flex items-center justify-center">
                    <img src={ac.imagem} alt={ac.nome} loading="lazy" className="max-h-full max-w-full object-contain" />
                    {isOut && (
                      <span className="absolute top-3 right-3 rounded-full bg-amber-500 px-2.5 py-1 text-[10px] font-black text-zinc-950">
                        LISTA DE ESPERA
                      </span>
                    )}
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between gap-4">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{ac.nome}</h3>
                      <p className="text-2xl font-black text-[#FF6B00] mt-1">{formatBRL(ac.preco)}</p>
                      <p className="text-xs text-zinc-400 mt-2">{ac.porque}</p>
                    </div>
                    <a
                      href={buildWhatsAppLink(msg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full rounded-xl py-2.5 px-4 text-xs font-black uppercase flex items-center justify-center gap-2 ${
                        isOut
                          ? "bg-amber-400 hover:bg-amber-300 text-zinc-950"
                          : "bg-[#FF6B00] hover:bg-[#e55f00] text-white"
                      }`}
                    >
                      {isOut ? (
                        <>
                          <Bell className="h-4 w-4" /> Avise-me quando chegar
                        </>
                      ) : (
                        <>
                          <MessageCircle className="h-4 w-4" /> Quero este acessório
                        </>
                      )}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEÇÃO 5 — COMBOS ESTRATÉGICOS */}
        <section id="combos" className="space-y-6 scroll-mt-20">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">🎁 Seção 5 — Economize Mais</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
              <Gift className="h-6 w-6 text-[#FF6B00]" /> Combos Estratégicos G4
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {COMBOS.map((c) => (
              <div
                key={c.nome}
                className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 ${
                  c.featured
                    ? "border-[#FF6B00] bg-gradient-to-br from-[#FF6B00]/15 via-zinc-950 to-zinc-950 shadow-[0_0_30px_rgba(255,107,0,0.18)]"
                    : "border-zinc-800 bg-zinc-950/90"
                }`}
              >
                <div className="space-y-2">
                  <span className="inline-block rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 px-3 py-0.5 text-[10px] font-black uppercase text-[#FF6B00]">
                    {c.tag}
                  </span>
                  <h3 className="text-xl font-black text-white">{c.nome}</h3>
                  <p className="text-sm text-zinc-300">{c.itens}</p>
                  <div className="flex items-baseline gap-2.5 pt-2">
                    <span className="text-sm text-zinc-500 line-through">{formatBRL(c.precoAvulso)}</span>
                    <span className="text-3xl font-black text-[#FF6B00]">{formatBRL(c.precoCombo)}</span>
                    <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                      Economia de {formatBRL(c.economia)}
                    </span>
                  </div>
                </div>
                <a
                  href={buildWhatsAppLink(`Olá Leonidas! Quero reservar o *${c.nome}* (${c.itens}) por ${formatBRL(c.precoCombo)} na Oficina G4!`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full rounded-xl bg-[#FF6B00] hover:bg-[#e55f00] py-3 px-4 text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" /> Quero esse Combo no WhatsApp
                </a>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-5 flex items-center justify-center gap-3 text-center">
            <Sparkles className="h-5 w-5 text-emerald-400 shrink-0" />
            <p className="text-sm font-bold text-emerald-300">
              🎁 BÔNUS EXCLUSIVO: Avaliação física trimestral grátis para alunos ativos da Oficina G4!
            </p>
          </div>
        </section>

        {/* SEÇÃO 6 — FAQ PROTOCOLO G4 */}
        <section id="faq" className="space-y-6 scroll-mt-20">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">❓ Seção 6 — Transparência Total</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-[#FF6B00]" /> Dúvidas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_SUPLEMENTOS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between gap-3 text-left"
                  >
                    <span className="text-sm sm:text-base font-bold text-white">{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#FF6B00] shrink-0 transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-sm text-zinc-300 leading-relaxed border-t border-zinc-900 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* CTA FINAL (RODAPÉ) */}
      <footer className="border-t border-zinc-800 bg-gradient-to-t from-[#FF6B00]/15 via-zinc-950 to-zinc-950">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center space-y-5">
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Ficou com vontade de começar?
          </h2>
          <p className="text-sm sm:text-base text-zinc-300 max-w-xl mx-auto">
            Chama o <strong>Leonidas</strong> no WhatsApp e ele te ajuda a escolher o suplemento certo pro seu objetivo — sem enrolação.
          </p>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("Olá Leonidas! Vi a página de Suplementos da Oficina G4 e quero ajuda para escolher o suplemento certo pro meu objetivo 💪")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#FF6B00] hover:bg-[#e55f00] px-8 py-4 text-sm sm:text-base font-black text-white shadow-[0_0_30px_rgba(255,107,0,0.35)] transition-all active:scale-95"
            >
              <MessageCircle className="h-5 w-5" /> QUERO FALAR COM O LEONIDAS
            </a>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> WhatsApp: {G4_CONFIG.whatsappPrincipalFormatado}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-[#FF6B00]" /> Oficina G4 — Coqueiro, Belém/PA
            </span>
          </div>
          <p className="text-[11px] text-zinc-500">
            Atendimento via WhatsApp. Se preferir, passe na recepção — estamos aqui todos os dias.
          </p>
        </div>
      </footer>
    </div>
  );
}
