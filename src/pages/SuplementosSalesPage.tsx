import { useEffect, useMemo, useState } from "react";
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
  Package,
} from "lucide-react";
import { G4_CONFIG, buildWhatsAppLink } from "../lib/config";

type SecaoSite = "creatinas" | "energia" | "massa" | "acessorios" | "combos" | "outros";

interface ComboItemApi {
  produtoId?: {
    id?: string;
    _id?: string;
    nome?: string;
    preco_venda?: number;
    estoque_atual?: number;
  } | string;
  quantidade: number;
}

interface ProdutoPublicoApi {
  id?: string;
  _id?: string;
  nome: string;
  preco_venda: number;
  estoque_atual: number;
  categoria?: string;
  imagemUrl?: string | null;
  isCombo?: boolean;
  comboItens?: ComboItemApi[];
  exibirNoSite?: boolean;
  secaoSite?: SecaoSite;
  badge?: string;
  descricao?: string;
  paraQuem?: string;
  comoUsar?: string;
  rendimento?: string;
  destaqueDose?: string;
  alertaExtra?: string;
  destaqueVitrine?: boolean;
  ordemSite?: number;
  precoAvulsoCombo?: number;
}

const API_PRODUTOS_PUBLICO_URL = "https://orbit-care-backend.onrender.com/api/produtos/publico";

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
    a: "Aqui ninguém compra sozinho. Nossa equipe de atendentes e professores na recepção explica exatamente como tomar, quando tomar e o que esperar. Sem pressa e sem julgamento.",
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
  return `R$ ${Number(v || 0).toFixed(2).replace(".", ",")}`;
}

function resolveSecao(p: ProdutoPublicoApi): SecaoSite {
  if (p.isCombo || p.secaoSite === "combos") return "combos";
  if (p.secaoSite && ["creatinas", "energia", "massa", "acessorios", "outros"].includes(p.secaoSite)) {
    return p.secaoSite;
  }
  const n = (p.nome || "").toLowerCase();
  if (n.includes("creatina")) return "creatinas";
  if (n.includes("maca") || n.includes("pré-treino") || n.includes("pre-treino") || n.includes("cafeina")) return "energia";
  if (n.includes("whey") || n.includes("hipercal") || n.includes("creamass") || n.includes("massa")) return "massa";
  if (p.categoria === "Acessório" || n.includes("coqueleira") || n.includes("coqueteleira") || n.includes("luva") || n.includes("camiseta")) {
    return "acessorios";
  }
  return "outros";
}

function resolveImagem(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("data:") || url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) {
    return url;
  }
  return `/${url}`;
}

export function SuplementosSalesPage() {
  const [produtos, setProdutos] = useState<ProdutoPublicoApi[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erroRede, setErroRede] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    document.title = "Suplementos Oficina G4 — Creatina, Whey, Pré-Treino e Combos em Belém";

    let active = true;
    const fetchCatalogo = () => {
      fetch(API_PRODUTOS_PUBLICO_URL, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((json) => {
          if (!active) return;
          if (json?.data && Array.isArray(json.data)) {
            setProdutos(json.data as ProdutoPublicoApi[]);
            setErroRede(false);
          } else {
            setErroRede(true);
          }
          setCarregando(false);
        })
        .catch(() => {
          if (!active) return;
          setErroRede(true);
          setCarregando(false);
        });
    };

    fetchCatalogo();
    const interval = window.setInterval(fetchCatalogo, 60000);
    window.addEventListener("focus", fetchCatalogo);
    return () => {
      active = false;
      window.clearInterval(interval);
      window.removeEventListener("focus", fetchCatalogo);
    };
  }, []);

  const secoes = useMemo(() => {
    const grupos: Record<SecaoSite, ProdutoPublicoApi[]> = {
      creatinas: [],
      energia: [],
      massa: [],
      acessorios: [],
      combos: [],
      outros: [],
    };
    const ordenados = [...produtos].sort((a, b) => {
      const oa = Number(a.ordemSite ?? 100);
      const ob = Number(b.ordemSite ?? 100);
      if (oa !== ob) return oa - ob;
      return a.nome.localeCompare(b.nome);
    });
    for (const p of ordenados) {
      if (p.exibirNoSite === false) continue;
      grupos[resolveSecao(p)].push(p);
    }
    return grupos;
  }, [produtos]);

  const renderProductCard = (p: ProdutoPublicoApi) => {
    const pid = p.id || p._id || p.nome;
    const estoque = Number(p.estoque_atual ?? 0);
    const precoReal = Number(p.preco_venda ?? 0);
    const isEsgotado = estoque <= 0;
    const isUltimaUnidade = estoque === 1;
    const imgSrc = resolveImagem(p.imagemUrl);

    const waMsg = isEsgotado
      ? `Olá! Vi a página de suplementos da Oficina G4 e quero entrar na lista de espera (AVISE-ME QUANDO CHEGAR) do produto: ${p.nome} (${formatBRL(precoReal)}).`
      : isUltimaUnidade
      ? `Olá! Quero garantir a ÚLTIMA UNIDADE do produto ${p.nome} (${formatBRL(precoReal)}) na recepção da Oficina G4!`
      : `Olá! Quero reservar o produto ${p.nome} (${formatBRL(precoReal)}) na recepção da Oficina G4!`;

    const temDetalhes = Boolean(p.paraQuem || p.comoUsar || p.rendimento || p.alertaExtra);

    return (
      <div
        key={pid}
        className={`group relative rounded-2xl border bg-zinc-950/90 overflow-hidden flex flex-col transition-all duration-300 ${
          p.destaqueVitrine
            ? "border-[#FF6B00] shadow-[0_0_30px_rgba(255,107,0,0.18)]"
            : "border-zinc-800 hover:border-zinc-700"
        }`}
      >
        {/* Imagem */}
        <div className="relative aspect-[4/3] bg-white/95 flex items-center justify-center p-4 overflow-hidden">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={p.nome}
              loading="lazy"
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-zinc-400 gap-2">
              <Package className="h-12 w-12 text-zinc-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Oficina G4</span>
            </div>
          )}
          {p.badge && (
            <span className="absolute top-3 left-3 rounded-full bg-zinc-950/90 border border-zinc-700 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
              {p.badge}
            </span>
          )}
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
              <span className="text-2xl font-black text-[#FF6B00]">{formatBRL(precoReal)}</span>
              {p.destaqueDose && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-[11px] font-bold text-emerald-400">
                  <TrendingDown className="h-3 w-3" /> {p.destaqueDose}
                </span>
              )}
            </div>

            {p.descricao && <p className="text-xs text-zinc-300 leading-relaxed">{p.descricao}</p>}

            {temDetalhes && (
              <div className="rounded-xl bg-zinc-900/80 border border-zinc-800/80 p-3 space-y-1.5 text-xs">
                {p.paraQuem && (
                  <p className="text-zinc-300">
                    <strong className="text-white">Para quem é:</strong> {p.paraQuem}
                  </p>
                )}
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
            )}
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
            {secoes.creatinas.length > 0 && <a href="#creatinas" className="hover:text-[#FF6B00] transition-colors">Creatinas</a>}
            {secoes.energia.length > 0 && <a href="#energia" className="hover:text-[#FF6B00] transition-colors">Energia & Foco</a>}
            {secoes.massa.length > 0 && <a href="#massa" className="hover:text-[#FF6B00] transition-colors">Massa & Whey</a>}
            {secoes.acessorios.length > 0 && <a href="#acessorios" className="hover:text-[#FF6B00] transition-colors">Acessórios</a>}
            {secoes.combos.length > 0 && <a href="#combos" className="hover:text-[#FF6B00] transition-colors">Combos</a>}
            {secoes.outros.length > 0 && <a href="#novidades" className="hover:text-[#FF6B00] transition-colors">Novidades</a>}
            <a href="#faq" className="hover:text-[#FF6B00] transition-colors">Dúvidas</a>
          </nav>

          <a
            href={buildWhatsAppLink("Olá! Vim pela página de Suplementos da Oficina G4 e quero ajuda da recepção para escolher o suplemento ideal pro meu objetivo.")}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#FF6B00] hover:bg-[#e55f00] px-4 py-2 text-xs font-black text-white flex items-center gap-1.5 shadow-md"
          >
            <MessageCircle className="h-3.5 w-3.5" /> Falar com a Recepção
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-zinc-900 bg-gradient-to-b from-[#FF6B00]/10 via-[#09090B] to-[#09090B]">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:py-20 text-center space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-4 py-1.5 text-xs font-bold text-[#FF6B00]">
            <ShieldCheck className="h-4 w-4" /> Procedência Garantida • Orientação Real com Professor
            {!carregando && !erroRede && (
              <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                ● Estoque Ao Vivo
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Suplementos originais com <span className="text-[#FF6B00]">preço justo</span> e orientação de quem entende de treino.
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto">
            Aqui você não compra no escuro. Nossos atendentes e professores explicam exatamente o que tomar, quanto tomar e como encaixar no seu objetivo — sem taxa oculta e com retirada rápida na recepção da Oficina G4.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <a
              href="#catalogo"
              className="rounded-full bg-[#FF6B00] hover:bg-[#e55f00] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#FF6B00]/25"
            >
              Ver Catálogo Completo
            </a>
            {secoes.combos.length > 0 && (
              <a
                href="#combos"
                className="rounded-full border border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 px-6 py-3 text-sm font-bold text-white"
              >
                🎁 Ver Combos com Desconto
              </a>
            )}
          </div>
        </div>
      </section>

      <main id="catalogo" className="mx-auto max-w-6xl px-4 py-12 space-y-20">
        {carregando ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="rounded-2xl border border-zinc-800 bg-zinc-950/80 h-96 animate-pulse" />
            ))}
          </div>
        ) : erroRede && produtos.length === 0 ? (
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-8 text-center space-y-4">
            <p className="text-base font-bold text-white">Estamos atualizando o estoque em tempo real.</p>
            <p className="text-xs text-zinc-300">Chame nossa recepção no WhatsApp para consultar disponibilidade imediata.</p>
            <a
              href={buildWhatsAppLink("Olá! Gostaria de consultar o catálogo e estoque atual de suplementos da Oficina G4.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B00] px-6 py-3 text-xs font-black uppercase text-white"
            >
              <MessageCircle className="h-4 w-4" /> Consultar no WhatsApp
            </a>
          </div>
        ) : (
          <>
            {/* SEÇÃO 1 — CREATINAS */}
            {secoes.creatinas.length > 0 && (
              <section id="creatinas" className="space-y-6 scroll-mt-20">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-800 pb-4">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">📦 O Carro-Chefe</span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                      <Dumbbell className="h-6 w-6 text-[#FF6B00]" /> Creatinas
                    </h2>
                  </div>
                  <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2 text-xs text-emerald-300">
                    💡 <strong>Dica de Economia:</strong> Compare o custo por dose para escolher o melhor rendimento!
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secoes.creatinas.map(renderProductCard)}
                </div>
              </section>
            )}

            {/* SEÇÃO 2 — ENERGIA E FOCO */}
            {secoes.energia.length > 0 && (
              <section id="energia" className="space-y-6 scroll-mt-20">
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">⚡ Performance</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                    <Zap className="h-6 w-6 text-[#FF6B00]" /> Energia e Foco
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secoes.energia.map(renderProductCard)}
                </div>
              </section>
            )}

            {/* SEÇÃO 3 — MASSA E RECUPERAÇÃO */}
            {secoes.massa.length > 0 && (
              <section id="massa" className="space-y-6 scroll-mt-20">
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">💪 Hipertrofia</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                    <Flame className="h-6 w-6 text-[#FF6B00]" /> Massa e Recuperação
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secoes.massa.map(renderProductCard)}
                </div>
              </section>
            )}

            {/* SEÇÃO 4 — ACESSÓRIOS */}
            {secoes.acessorios.length > 0 && (
              <section id="acessorios" className="space-y-6 scroll-mt-20">
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">🎒 Equipamentos</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-[#FF6B00]" /> Acessórios G4
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secoes.acessorios.map(renderProductCard)}
                </div>
              </section>
            )}

            {/* SEÇÃO 5 — COMBOS ESTRATÉGICOS */}
            {secoes.combos.length > 0 && (
              <section id="combos" className="space-y-6 scroll-mt-20">
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">🎁 Economize Mais</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                    <Gift className="h-6 w-6 text-[#FF6B00]" /> Combos Estratégicos G4
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {secoes.combos.map((c) => {
                    const cid = c.id || c._id || c.nome;
                    const precoCombo = Number(c.preco_venda || 0);
                    const somaItens = (c.comboItens || []).reduce((acc, item) => {
                      const p = typeof item.produtoId === "object" ? item.produtoId : null;
                      return acc + Number(p?.preco_venda || 0) * Number(item.quantidade || 1);
                    }, 0);
                    const precoAvulso = Number(c.precoAvulsoCombo || somaItens || 0);
                    const economia = precoAvulso > precoCombo ? Number((precoAvulso - precoCombo).toFixed(2)) : 0;
                    const textoItens =
                      c.descricao ||
                      (c.comboItens || [])
                        .map((item) => {
                          const p = typeof item.produtoId === "object" ? item.produtoId : null;
                          return p?.nome ? `${item.quantidade > 1 ? `${item.quantidade}x ` : ""}${p.nome}` : null;
                        })
                        .filter(Boolean)
                        .join(" + ");

                    return (
                      <div
                        key={cid}
                        className={`rounded-2xl border p-6 flex flex-col justify-between gap-4 ${
                          c.destaqueVitrine
                            ? "border-[#FF6B00] bg-gradient-to-br from-[#FF6B00]/15 via-zinc-950 to-zinc-950 shadow-[0_0_30px_rgba(255,107,0,0.18)]"
                            : "border-zinc-800 bg-zinc-950/90"
                        }`}
                      >
                        <div className="space-y-2">
                          {c.badge && (
                            <span className="inline-block rounded-full bg-[#FF6B00]/20 border border-[#FF6B00]/40 px-3 py-0.5 text-[10px] font-black uppercase text-[#FF6B00]">
                              {c.badge}
                            </span>
                          )}
                          <h3 className="text-xl font-black text-white">{c.nome}</h3>
                          {textoItens && <p className="text-sm text-zinc-300">{textoItens}</p>}
                          <div className="flex flex-wrap items-baseline gap-2.5 pt-2">
                            {precoAvulso > precoCombo && (
                              <span className="text-sm text-zinc-500 line-through">{formatBRL(precoAvulso)}</span>
                            )}
                            <span className="text-3xl font-black text-[#FF6B00]">{formatBRL(precoCombo)}</span>
                            {economia > 0 && (
                              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs font-bold text-emerald-400">
                                Economia de {formatBRL(economia)}
                              </span>
                            )}
                          </div>
                        </div>
                        <a
                          href={buildWhatsAppLink(
                            `Olá! Quero reservar o *${c.nome}* (${textoItens || "Combo G4"}) por ${formatBRL(precoCombo)} na recepção da Oficina G4!`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full rounded-xl bg-[#FF6B00] hover:bg-[#e55f00] py-3 px-4 text-xs font-black uppercase tracking-wider text-white flex items-center justify-center gap-2"
                        >
                          <MessageCircle className="h-4 w-4" /> Quero esse Combo no WhatsApp
                        </a>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* SEÇÃO 6 — NOVIDADES / OUTROS (exibe automaticamente qualquer produto novo cadastrado sem seção específica) */}
            {secoes.outros.length > 0 && (
              <section id="novidades" className="space-y-6 scroll-mt-20">
                <div className="border-b border-zinc-800 pb-4">
                  <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">✨ Catálogo G4</span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-[#FF6B00]" /> Novidades & Outros Produtos
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {secoes.outros.map(renderProductCard)}
                </div>
              </section>
            )}
          </>
        )}

        {/* SEÇÃO 7 — FAQ DE SUPLEMENTOS */}
        <section id="faq" className="space-y-6 scroll-mt-20">
          <div className="border-b border-zinc-800 pb-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF6B00]">❓ Tire suas Dúvidas</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 flex items-center gap-2">
              <HelpCircle className="h-6 w-6 text-[#FF6B00]" /> Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_SUPLEMENTOS.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="rounded-xl border border-zinc-800 bg-zinc-950/80 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left gap-3 hover:bg-zinc-900/50 transition-colors"
                  >
                    <span className="text-sm font-bold text-white">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 text-[#FF6B00] shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/70 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Final — Retirada na Oficina G4 */}
        <section className="rounded-3xl border border-[#FF6B00]/40 bg-gradient-to-br from-[#FF6B00]/15 via-zinc-950 to-zinc-950 p-8 sm:p-10 text-center space-y-5">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF6B00]/20 px-3 py-1 text-xs font-bold text-[#FF6B00]">
            <Sparkles className="h-3.5 w-3.5" /> Atendimento Humanizado na Recepção
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white max-w-2xl mx-auto">
            Ficou na dúvida de qual suplemento escolher para o seu objetivo?
          </h2>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto">
            Chame nossa equipe no WhatsApp — em 2 minutos indicamos o melhor custo-benefício para o seu treino e separamos na recepção para você retirar hoje mesmo!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4 text-[#FF6B00]" /> {G4_CONFIG.endereco}</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> PIX, Cartão e Dinheiro</span>
          </div>
          <div className="pt-2">
            <a
              href={buildWhatsAppLink("Olá! Vi a página de Suplementos da Oficina G4 e quero ajuda para escolher o suplemento ideal para o meu treino.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#FF6B00] hover:bg-[#e55f00] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-[#FF6B00]/30"
            >
              <MessageCircle className="h-5 w-5" /> Falar com a Recepção no WhatsApp
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-900 py-8 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Oficina G4 Academia • Coqueiro, Belém - PA</p>
      </footer>
    </div>
  );
}
