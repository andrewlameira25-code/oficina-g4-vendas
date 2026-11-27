import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Flame,
  Headphones,
  Instagram,
  Link2,
  MapPin,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Users,
  AlertCircle,
  CalendarClock,
} from "lucide-react";
import { G4_CONFIG, buildWhatsAppLink } from "../lib/config";
import { trackConversion } from "../lib/tracking";

const API_EMBAIXADORES_PUBLICO = "https://orbit-care-backend.onrender.com/api/embaixadores/publico";
const DATA_LIMITE_ISO = "2026-12-10T23:59:59-03:00";
const DATA_LIMITE_BR = "10/12/2026";
const TOTAL_VAGAS_TURMA = 20;

const NIVEIS = [
  {
    medalha: "🥉",
    nivel: "NÍVEL 1 — Embaixador Iniciante",
    meta: "1 matrícula nova com seu cupom",
    featured: false,
    beneficios: [
      "1 mês de mensalidade 100% grátis",
      "Código de desconto pessoal (10% OFF para seus indicados)",
      "1 vale de diária grátis para dar a um amigo",
      "Acesso ao Grupo VIP no WhatsApp da G4",
    ],
  },
  {
    medalha: "🥈",
    nivel: "NÍVEL 2 — Embaixador Oficial",
    meta: "3 matrículas novas com seu cupom",
    featured: true,
    destaqueTag: "MAIS PROCURADO",
    beneficios: [
      "Mensalidade grátis no mês seguinte",
      "3 vales de diária grátis para distribuir",
      "Desconto de 15% em todos os suplementos da loja G4",
      "1 avaliação física completa gratuita com a professora Karla Lameira",
      "Foto no Mural dos Embaixadores da G4",
    ],
  },
  {
    medalha: "🥇",
    nivel: "NÍVEL 3 — Embaixador Premium",
    meta: "5 matrículas ou mais com seu cupom",
    featured: false,
    beneficios: [
      "Mensalidade grátis",
      "5 vales de diária grátis para distribuir",
      "Desconto de 20% em suplementos",
      "Camiseta exclusiva da G4 (próximo lançamento)",
      "Consulta individual gratuita com Karla Lameira (treino + orientação)",
      "Destaque especial no Instagram da academia",
    ],
  },
];

const SUPORTE_ITENS = [
  {
    icon: Users,
    titulo: "Grupo VIP de Embaixadores no WhatsApp",
    desc: "Comunidade exclusiva da 1ª turma para trocar ideias, compartilhar suas postagens e receber novidades em primeira mão.",
  },
  {
    icon: Link2,
    titulo: "Cupom e Link Exclusivo com seu nome",
    desc: "Identificação personalizada (ex.: SEUNOME10) com link direto de matrícula para agilizar indicações e contar automaticamente na sua meta.",
  },
  {
    icon: Headphones,
    titulo: "Suporte G4 em horário comercial",
    desc: "Atendimento direto da nossa equipe em horário comercial para tirar dúvidas sobre suas indicações, vales de diária e benefícios.",
  },
];

const FAQ_EMBAIXADOR = [
  {
    q: "Preciso ter muitos seguidores no Instagram?",
    a: "Não! A partir de 300 seguidores já é possível participar. O que vale é sua constância e vontade de compartilhar a rotina.",
  },
  {
    q: "E se eu não bater a meta no mês?",
    a: "Sem problema. Você continua aluno G4 com todos os benefícios, só perde o título de Embaixador até o próximo mês. Bora tentar de novo!",
  },
  {
    q: "Como sei que uma matrícula foi indicada por mim?",
    a: "O aluno precisa citar ou aplicar o seu cupom pessoal no momento da matrícula. Sem o cupom, a indicação não entra na contagem da meta.",
  },
  {
    q: "Posso ser Embaixador e aluno ao mesmo tempo?",
    a: "Sim! O programa é exclusivo para alunos ativos da Oficina G4.",
  },
  {
    q: "Quando recebo meu cupom pessoal?",
    a: "Após a inscrição ser aprovada, você recebe seu cupom exclusivo e o acesso ao Grupo VIP em até 24h pelo WhatsApp.",
  },
  {
    q: "Posso cancelar minha participação?",
    a: "Sim, a qualquer momento. Sem multa, sem cobrança e sem burocracia.",
  },
];

function calcularTempoRestante() {
  const diff = new Date(DATA_LIMITE_ISO).getTime() - Date.now();
  if (diff <= 0) return { encerrado: true, dias: 0, horas: 0, minutos: 0 };
  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  return { encerrado: false, dias, horas, minutos };
}

export function EmbaixadorSalesPage() {
  const [inscritosAtivos, setInscritosAtivos] = useState<number>(2);
  const [tempo, setTempo] = useState(calcularTempoRestante);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Formulário de inscrição (7 campos)
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tempoTreino, setTempoTreino] = useState("Menos de 3 meses");
  const [seguidores, setSeguidores] = useState("300 a 500");
  const [motivacao, setMotivacao] = useState("");
  const [aceitoRegras, setAceitoRegras] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    document.title = "Projeto Embaixador G4 — Treinar de Graça na Oficina G4 (1ª Turma)";
    fetch(API_EMBAIXADORES_PUBLICO, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (Array.isArray(json?.data) && json.data.length > 0) {
          setInscritosAtivos(json.data.length);
        }
      })
      .catch(() => {});

    const timer = window.setInterval(() => setTempo(calcularTempoRestante()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const vagasRestantes = Math.max(0, TOTAL_VAGAS_TURMA - inscritosAtivos);

  const buildInscricaoMessage = () =>
    `🚀 *INSCRIÇÃO — PROJETO EMBAIXADOR G4 (1ª TURMA)*\n\n` +
    `👤 *Nome:* ${nome.trim()}\n` +
    `📱 *WhatsApp:* ${whatsapp.trim()}\n` +
    `📸 *Instagram:* ${instagram.trim().startsWith("@") ? instagram.trim() : `@${instagram.trim()}`}\n` +
    `🏋️ *Tempo na G4:* ${tempoTreino}\n` +
    `📊 *Seguidores:* ${seguidores}\n` +
    (motivacao.trim() ? `💬 *Por que quero ser Embaixador:* ${motivacao.trim()}\n` : "") +
    `✅ Li e aceito as regras do Projeto Embaixador G4.`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || whatsapp.replace(/\D/g, "").length < 10 || !instagram.trim() || !aceitoRegras) {
      return;
    }
    trackConversion("Lead_Embaixador", "Formulario_Inscricao_Embaixador");
    setEnviado(true);
    const waUrl = buildWhatsAppLink(buildInscricaoMessage());
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div id="topo" className="min-h-screen bg-[#0A0A0A] text-white selection:bg-[#FF5A00] selection:text-white">
      {/* Barra superior de urgência */}
      <div className="bg-[#FF5A00] px-4 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-white">
        🔥 1ª Turma Embaixador G4 •{" "}
        {vagasRestantes > 0
          ? `Restam apenas ${vagasRestantes} de ${TOTAL_VAGAS_TURMA} vagas`
          : "Turma cheia — Lista de espera aberta"}{" "}
        • Inscrições até {DATA_LIMITE_BR}
      </div>

      {/* Header Isolado */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#topo" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FF5A00] font-display text-lg font-black text-white shadow-lg shadow-[#FF5A00]/25">
              G4
            </div>
            <div className="leading-none">
              <span className="block text-sm font-black uppercase tracking-tight text-white">
                EMBAIXADOR <span className="text-[#FF5A00]">G4</span>
              </span>
              <span className="block text-[10px] font-medium uppercase tracking-widest text-zinc-400">
                1ª Turma Oficial • Coqueiro
              </span>
            </div>
          </a>

          <nav className="hidden items-center gap-6 text-xs font-semibold text-zinc-300 md:flex">
            <a href="#sobre" className="hover:text-[#FF5A00] transition-colors">O Projeto</a>
            <a href="#como-funciona" className="hover:text-[#FF5A00] transition-colors">Como Funciona</a>
            <a href="#niveis" className="hover:text-[#FF5A00] transition-colors">Níveis & Benefícios</a>
            <a href="#regras" className="hover:text-[#FF5A00] transition-colors">Regras</a>
            <a href="#faq" className="hover:text-[#FF5A00] transition-colors">Dúvidas</a>
          </nav>

          <a
            href="#inscricao"
            className="rounded-full bg-[#FF5A00] hover:bg-[#e55000] px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-md shadow-[#FF5A00]/25 transition-colors"
          >
            Quero Participar
          </a>
        </div>
      </header>

      {/* SEÇÃO 1 — HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero-g4.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0A]/85 via-[#0A0A0A]/80 to-[#0A0A0A]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF5A00]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 md:py-24">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#FF5A00]/45 bg-[#FF5A00]/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#FF5A00]">
            <Flame className="h-3.5 w-3.5" />
            NOVO PROJETO — 1ª TURMA COM VAGAS LIMITADAS
          </div>

          <h1 className="mt-6 font-display text-4xl font-black uppercase leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
            TREINAR DE GRAÇA NA <span className="text-[#FF5A00]">G4</span>?
          </h1>

          <p className="mt-4 text-xl font-bold text-white sm:text-2xl">
            Sim, é real. E não é promoção: é um projeto.
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
            Seja Embaixador da Oficina G4. Poste sua rotina, indique amigos e ganhe mensalidade grátis,
            descontos e benefícios exclusivos.
          </p>

          {/* Urgência: Contador Regressivo + Vagas Restantes */}
          <div className="mx-auto mt-7 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-950/90 px-4 py-2.5 text-xs">
              <CalendarClock className="h-4 w-4 text-[#FF5A00]" />
              {tempo.encerrado ? (
                <span className="font-bold text-amber-400">Inscrições da 1ª turma encerradas</span>
              ) : (
                <span className="text-zinc-300">
                  Encerra em{" "}
                  <strong className="font-mono text-white">
                    {tempo.dias}d {String(tempo.horas).padStart(2, "0")}h {String(tempo.minutos).padStart(2, "0")}m
                  </strong>{" "}
                  ({DATA_LIMITE_BR})
                </span>
              )}
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/35 bg-emerald-500/10 px-4 py-2.5 text-xs font-bold text-emerald-400">
              <Users className="h-4 w-4" />
              {vagasRestantes > 0
                ? `Restam ${vagasRestantes} vagas • ${inscritosAtivos} já inscritos`
                : "20/20 vagas preenchidas (Lista de Espera)"}
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#inscricao"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF5A00] hover:bg-[#e55000] px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-[#FF5A00]/30 transition-transform hover:scale-[1.02] sm:w-auto"
            >
              👉 QUERO SER EMBAIXADOR
            </a>
            <a
              href="#niveis"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 hover:border-[#FF5A00] px-6 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors sm:w-auto"
            >
              Ver Níveis e Benefícios
            </a>
          </div>
        </div>
      </section>

      {/* SEÇÃO 2 — O QUE É O PROJETO */}
      <section id="sobre" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
        <div className="grid gap-8 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7 space-y-5">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
              📖 O Projeto Oficial
            </span>
            <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Conheça o Projeto Embaixador G4
            </h2>
            <p className="text-sm leading-relaxed text-zinc-300 sm:text-base">
              É o programa oficial de embaixadores da Oficina G4. Você posta sua rotina real na academia,
              indica novos alunos e, em troca, a G4 recompensa você com benefícios exclusivos.
            </p>
            <div className="rounded-2xl bg-[#FF5A00] p-5 text-center shadow-lg shadow-[#FF5A00]/25">
              <p className="font-display text-lg font-black uppercase tracking-wide text-white sm:text-xl">
                Você treina. Você posta. Você traz gente. A G4 recompensa.
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl">
              <img
                src="/images/suporte.jpg"
                alt="Equipe e alunos na Oficina G4"
                loading="lazy"
                className="h-72 w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO 3 — QUEM PODE PARTICIPAR */}
      <section className="border-y border-white/10 bg-[#111114] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-8">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
              👥 Critérios de Entrada
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Quem pode ser Embaixador?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 text-left">
            {[
              "Alunos ativos da G4 (independente do tempo de casa)",
              "Moradores do Coqueiro e região com Instagram ativo (a partir de 300 seguidores)",
              "Gente que treina com constância e gosta de compartilhar a rotina",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-[#18181D] p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-[#FF5A00] mt-0.5" />
                <p className="text-sm font-medium text-zinc-200 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p className="inline-block rounded-full border border-[#FF5A00]/35 bg-[#FF5A00]/10 px-6 py-2.5 text-sm font-extrabold text-white">
            Não precisa ser influencer digital. <span className="text-[#FF5A00]">Precisa ser constante.</span>
          </p>
        </div>
      </section>

      {/* SEÇÃO 4 — COMO FUNCIONA (3 PASSOS) */}
      <section id="como-funciona" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 md:py-20">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
            🎯 Passo a Passo
          </span>
          <h2 className="mt-2 font-display text-3xl font-black uppercase text-white sm:text-4xl">
            Funciona em 3 passos simples
          </h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            {
              num: "01",
              emoji: "🎟️",
              titulo: "Inscrição e Cupom Pessoal",
              texto: "Você se inscreve e recebe seu cupom pessoal (ex: SEUNOME10 = 10% OFF para seus indicados).",
            },
            {
              num: "02",
              emoji: "📸",
              titulo: "Publicações da sua Rotina",
              texto: "Você posta sobre a G4: 2 stories por semana + 1 post por mês marcando @oficinag4_belem.",
            },
            {
              num: "03",
              emoji: "📊",
              titulo: "Contagem na Meta do Mês",
              texto: "Cada matrícula feita com o seu cupom entra automaticamente na sua meta mensal para desbloquear os benefícios do seu nível.",
            },
          ].map((passo) => (
            <div
              key={passo.num}
              className="relative rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-3 hover:border-[#FF5A00]/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl">{passo.emoji}</span>
                <span className="font-display text-3xl font-black text-[#FF5A00]/30">{passo.num}</span>
              </div>
              <h3 className="text-base font-black uppercase text-white">{passo.titulo}</h3>
              <p className="text-sm leading-relaxed text-zinc-400">{passo.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEÇÃO 5 — NÍVEIS E BENEFÍCIOS */}
      <section id="niveis" className="border-y border-white/10 bg-[#111114] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
              🏆 Premiação Mensal
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Quanto mais você indica, mais você ganha
            </h2>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {NIVEIS.map((n) => (
              <div
                key={n.nivel}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 ${
                  n.featured
                    ? "border-[#FF5A00] bg-gradient-to-b from-[#FF5A00]/15 via-[#18181D] to-[#18181D] shadow-xl shadow-[#FF5A00]/15"
                    : "border-white/10 bg-[#18181D]"
                }`}
              >
                {n.destaqueTag && (
                  <span className="absolute -top-3 right-5 rounded-full bg-[#FF5A00] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                    {n.destaqueTag}
                  </span>
                )}

                <div>
                  <div className="text-3xl">{n.medalha}</div>
                  <h3 className="mt-2 font-display text-xl font-black uppercase text-white">{n.nivel}</h3>
                  <div className="mt-3 rounded-xl border border-[#FF5A00]/30 bg-[#FF5A00]/10 px-3.5 py-2 text-xs font-bold text-[#FF5A00]">
                    Meta: {n.meta}
                  </div>

                  <p className="mt-5 text-xs font-bold uppercase tracking-wider text-zinc-400">Você ganha:</p>
                  <ul className="mt-3 space-y-2.5">
                    {n.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-zinc-200">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF5A00]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#inscricao"
                  className={`mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl py-3 px-4 text-xs font-black uppercase tracking-wider transition-colors ${
                    n.featured
                      ? "bg-[#FF5A00] hover:bg-[#e55000] text-white"
                      : "bg-white/10 hover:bg-[#FF5A00] text-white"
                  }`}
                >
                  Quero alcançar este nível
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEÇÃO 6 — REGRAS SIMPLES */}
      <section id="regras" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20 space-y-8">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
            📋 Transparência Total
          </span>
          <h2 className="mt-2 font-display text-3xl font-black uppercase text-white sm:text-4xl">
            Regras claras, sem letra miúda
          </h2>
        </div>

        <div className="grid gap-3">
          {[
            { titulo: "Frequência mínima", desc: "2 stories por semana + 1 post por mês marcando @oficinag4_belem" },
            { titulo: "Conteúdo real", desc: "Seu treino de verdade, aqui dentro da academia" },
            { titulo: "Validação da indicação", desc: "O lead precisa citar ou usar o seu cupom na matrícula para contar na sua meta" },
            { titulo: "Conduta", desc: "A G4 se reserva o direito de cancelar o título em caso de conteúdo ofensivo ou que desrespeite outros alunos" },
          ].map((r) => (
            <div key={r.titulo} className="rounded-xl border border-white/10 bg-[#121216] p-4 flex items-start gap-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-[#FF5A00] mt-0.5" />
              <p className="text-sm text-zinc-300">
                <strong className="text-white">{r.titulo}:</strong> {r.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 flex items-start gap-3">
          <AlertCircle className="h-5 w-5 shrink-0 text-amber-400 mt-0.5" />
          <p className="text-sm text-zinc-200 leading-relaxed">
            <strong className="text-amber-300">Não bateu a meta? Sem problema.</strong> Você continua aluno G4 com
            todos os benefícios, só perde o título de Embaixador até o próximo mês. Bora tentar de novo!
          </p>
        </div>
      </section>

      {/* SEÇÃO 7 — SUPORTE DA G4 (Adaptada: Grupo VIP + Cupom/Link + Suporte Horário Comercial) */}
      <section className="border-y border-white/10 bg-[#111114] py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
              🎁 Estrutura de Apoio
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Você não caminha sozinho
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Todo embaixador da 1ª turma conta com estrutura direta da Oficina G4 para divulgar com facilidade e acompanhar seus resultados:
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {SUPORTE_ITENS.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.titulo} className="rounded-2xl border border-white/10 bg-[#18181D] p-6 space-y-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5A00]/15 text-[#FF5A00]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">{item.titulo}</h3>
                  <p className="text-xs leading-relaxed text-zinc-400 sm:text-sm">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 8 — FORMULÁRIO DE INSCRIÇÃO */}
      <section id="inscricao" className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20">
        <div className="rounded-3xl border border-[#FF5A00]/45 bg-gradient-to-br from-[#191310] via-[#121216] to-[#0A0A0A] p-6 sm:p-10 shadow-2xl">
          <div className="text-center space-y-2 mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FF5A00]/15 border border-[#FF5A00]/40 px-3 py-1 text-xs font-bold uppercase text-[#FF5A00]">
              <Sparkles className="h-3.5 w-3.5" /> 1ª Turma • 20 Vagas
            </span>
            <h2 className="font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Garanta sua vaga na 1ª turma
            </h2>
            <p className="text-sm text-zinc-400">
              Preencha o formulário abaixo e entraremos em contato em até 24h com seu cupom pessoal e o acesso ao Grupo VIP.
            </p>
          </div>

          {enviado ? (
            <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-8 text-center space-y-4">
              <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
              <h3 className="text-2xl font-black text-white">Inscrição recebida! 🎉</h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Sua solicitação para o <strong>Projeto Embaixador G4</strong> foi gerada! Se o WhatsApp não abriu
                automaticamente, clique no botão abaixo para enviar seus dados agora e entraremos em contato em até 24h.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                <a
                  href={buildWhatsAppLink(buildInscricaoMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white"
                >
                  <MessageCircle className="h-4 w-4" /> Enviar Inscrição no WhatsApp
                </a>
                <button
                  type="button"
                  onClick={() => setEnviado(false)}
                  className="rounded-xl border border-white/15 px-5 py-3.5 text-xs font-bold text-zinc-300 hover:text-white"
                >
                  Editar dados
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-zinc-300">Nome completo *</label>
                <input
                  type="text"
                  required
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  placeholder="Seu nome completo"
                  className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF5A00] focus:outline-none"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-zinc-300">WhatsApp (com DDD) *</label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="(91) 99999-9999"
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF5A00] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-zinc-300">Instagram (@seuusuario) *</label>
                  <input
                    type="text"
                    required
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@seuusuario"
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF5A00] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-zinc-300">
                    Há quanto tempo você treina na G4? *
                  </label>
                  <select
                    value={tempoTreino}
                    onChange={(e) => setTempoTreino(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF5A00] focus:outline-none"
                  >
                    <option value="Menos de 3 meses">Menos de 3 meses</option>
                    <option value="3 a 6 meses">3 a 6 meses</option>
                    <option value="6 meses a 1 ano">6 meses a 1 ano</option>
                    <option value="Mais de 1 ano">Mais de 1 ano</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-bold uppercase text-zinc-300">
                    Quantos seguidores no Instagram? *
                  </label>
                  <select
                    value={seguidores}
                    onChange={(e) => setSeguidores(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF5A00] focus:outline-none"
                  >
                    <option value="300 a 500">300 a 500</option>
                    <option value="500 a 1.000">500 a 1.000</option>
                    <option value="1.000 a 5.000">1.000 a 5.000</option>
                    <option value="Mais de 5.000">Mais de 5.000</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase text-zinc-300">
                  Por que você quer ser Embaixador G4? (opcional)
                </label>
                <textarea
                  rows={3}
                  value={motivacao}
                  onChange={(e) => setMotivacao(e.target.value)}
                  placeholder="Conte um pouco sobre sua rotina de treino na G4..."
                  className="w-full rounded-xl border border-white/10 bg-[#0A0A0A] px-4 py-3 text-sm text-white focus:border-[#FF5A00] focus:outline-none"
                />
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-white/10 bg-[#0A0A0A] p-3.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={aceitoRegras}
                  onChange={(e) => setAceitoRegras(e.target.checked)}
                  className="mt-0.5 h-4 w-4 accent-[#FF5A00]"
                />
                <span className="text-xs text-zinc-300">
                  Li e aceito as regras do <strong className="text-white">Projeto Embaixador G4</strong> *
                </span>
              </label>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF5A00] hover:bg-[#e55000] py-4 px-6 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-[#FF5A00]/30 transition-all active:scale-[0.99]"
              >
                <Rocket className="h-4 w-4" /> 🚀 QUERO SER EMBAIXADOR
              </button>

              <p className="text-center text-xs text-amber-400 font-semibold pt-1">
                ⚠️ Vagas limitadas: apenas {TOTAL_VAGAS_TURMA} alunos na 1ª turma. Inscrições até {DATA_LIMITE_BR}.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* SEÇÃO 9 — FAQ */}
      <section id="faq" className="border-t border-white/10 bg-[#111114] py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#FF5A00]">
              ❓ Tire suas Dúvidas
            </span>
            <h2 className="mt-2 font-display text-3xl font-black uppercase text-white sm:text-4xl">
              Dúvidas frequentes
            </h2>
          </div>

          <div className="mt-10 space-y-3">
            {FAQ_EMBAIXADOR.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="overflow-hidden rounded-xl border border-white/10 bg-[#18181D]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-white hover:bg-white/5 sm:text-base"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#FF5A00] transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-zinc-300">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SEÇÃO 10 — RODAPÉ */}
      <footer className="border-t border-white/10 bg-[#0A0A0A] py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center space-y-6">
          <div>
            <h2 className="font-display text-2xl font-black uppercase text-white sm:text-3xl">
              Ficou com dúvida? Fale com a gente
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Chame nossa equipe no WhatsApp em horário comercial ou visite a academia.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 text-left text-xs text-zinc-300 max-w-2xl mx-auto">
            <div className="rounded-xl border border-white/10 bg-[#121216] p-3.5 flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: <strong className="text-white">{G4_CONFIG.whatsappPrincipalFormatado}</strong></span>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#121216] p-3.5 flex items-center gap-2.5">
              <Instagram className="h-4 w-4 text-pink-400 shrink-0" />
              <span>Instagram: <strong className="text-white">@oficinag4_belem</strong></span>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#121216] p-3.5 flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[#FF5A00] shrink-0" />
              <span>{G4_CONFIG.endereco}</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-[#121216] p-3.5 flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#FF5A00] shrink-0" />
              <span>Seg–Sex 06:30–12h e 15h–22h | Sáb 08h–12h</span>
            </div>
          </div>

          <a
            href={buildWhatsAppLink("Olá! Tenho uma dúvida sobre o Projeto Embaixador G4 (1ª Turma).")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversion("Lead_Embaixador", "Rodape_WhatsApp")}
            className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg"
          >
            <MessageCircle className="h-4 w-4" /> 💬 CHAMAR NO WHATSAPP
          </a>

          <p className="pt-4 text-[11px] text-zinc-500">
            © {new Date().getFullYear()} Oficina G4 Academia • Projeto Embaixador G4 • Coqueiro, Belém - PA
          </p>
        </div>
      </footer>
    </div>
  );
}
