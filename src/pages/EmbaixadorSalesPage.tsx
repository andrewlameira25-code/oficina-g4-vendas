import { useEffect, useState } from "react";
import {
  Award,
  CheckCircle2,
  ChevronDown,
  Clock,
  Flame,
  Gift,
  HelpCircle,
  Instagram,
  MapPin,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  BarChart3,
  Camera,
  Link2,
} from "lucide-react";
import { G4_CONFIG, buildWhatsAppLink } from "../lib/config";
import { trackConversion } from "../lib/tracking";

const API_EMBAIXADORES_PUBLICO = "https://orbit-care-backend.onrender.com/api/embaixadores/publico";
const DATA_LIMITE_ISO = "2026-12-10T23:59:59-03:00";
const DATA_LIMITE_BR = "10/12/2026";
const TOTAL_VAGAS_TURMA = 20;

const FAQ_EMBAIXADOR = [
  {
    q: "Preciso ter muitos seguidores no Instagram?",
    a: "Não! A partir de 300 seguidores já é possível participar. O que vale é sua constância e vontade de compartilhar sua rotina real de treinos.",
  },
  {
    q: "E se eu não bater a meta no mês?",
    a: "Sem problema. Você continua aluno G4 com todos os benefícios, só perde o título de Embaixador até o próximo mês. Bora tentar de novo!",
  },
  {
    q: "Como sei que uma matrícula foi indicada por mim?",
    a: "O aluno precisa citar ou aplicar seu cupom pessoal no momento da matrícula. Sem o cupom, a indicação não entra na contagem automática da sua meta.",
  },
  {
    q: "Posso ser Embaixador e aluno ao mesmo tempo?",
    a: "Sim! O programa é exclusivo para alunos ativos da Oficina G4.",
  },
  {
    q: "Quando recebo meu cupom pessoal?",
    a: "Após a inscrição ser aprovada, você recebe seu cupom pessoal e o acesso à Comunidade VIP em até 24h pelo WhatsApp.",
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
  const [inscritosCount, setInscritosCount] = useState<number>(2);
  const [countdown, setCountdown] = useState(calcularTempoRestante);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Formulário de Inscrição (7 campos)
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [tempoTreino, setTempoTreino] = useState("");
  const [seguidores, setSeguidores] = useState("");
  const [motivacao, setMotivacao] = useState("");
  const [aceitouRegras, setAceitouRegras] = useState(false);
  const [enviado, setEnviado] = useState(false);

  useEffect(() => {
    document.title = "Treinar de Graça na G4? Seja Embaixador G4 — 1ª Turma";

    fetch(API_EMBAIXADORES_PUBLICO, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (Array.isArray(json?.data) && json.data.length > 0) {
          setInscritosCount(json.data.length);
        }
      })
      .catch(() => {});

    const timer = window.setInterval(() => setCountdown(calcularTempoRestante()), 60000);
    return () => window.clearInterval(timer);
  }, []);

  const vagasRestantes = Math.max(0, TOTAL_VAGAS_TURMA - inscritosCount);

  const buildInscricaoWhatsApp = () => {
    const igFmt = instagram.trim().startsWith("@") ? instagram.trim() : `@${instagram.trim()}`;
    return buildWhatsAppLink(
      `🚀 *NOVA INSCRIÇÃO — PROJETO EMBAIXADOR G4 (1ª TURMA)*\n\n` +
        `👤 *Nome:* ${nome.trim()}\n` +
        `📱 *WhatsApp:* ${whatsapp.trim()}\n` +
        `📸 *Instagram:* ${igFmt}\n` +
        `🏋️ *Tempo na G4:* ${tempoTreino}\n` +
        `👥 *Seguidores:* ${seguidores}\n` +
        (motivacao.trim() ? `💬 *Por que quero ser Embaixador:* ${motivacao.trim()}\n` : "") +
        `✅ *Regras do Projeto:* Li e aceito as regras do Embaixador G4!`
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || whatsapp.replace(/\D/g, "").length < 10 || !instagram.trim() || !tempoTreino || !seguidores || !aceitouRegras) {
      return;
    }
    trackConversion("Lead_Presencial", "Inscricao_Embaixador_G4");
    const waUrl = buildInscricaoWhatsApp();
    setEnviado(true);
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#ff5a00] selection:text-white">
      {/* Barra de Urgência no Topo */}
      <div className="bg-[#ff5a00] px-4 py-2 text-center text-xs font-extrabold uppercase tracking-wider text-white">
        🔥 NOVO PROJETO — 1ª TURMA EMBAIXADOR G4 •{" "}
        {vagasRestantes > 0
          ? `Restam apenas ${vagasRestantes} de ${TOTAL_VAGAS_TURMA} vagas`
          : "Turma lotada — Lista de espera aberta"}
        {!countdown.encerrado && ` • Encerra em ${countdown.dias}d ${countdown.horas}h`}
      </div>

      {/* Header Exclusivo Embaixador */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#ff5a00] font-display text-lg font-bold text-white shadow-lg shadow-[#ff5a00]/25">
              G4
            </div>
            <div className="leading-none">
              <p className="font-display text-base font-bold uppercase tracking-wider text-white">
                EMBAIXADOR <span className="text-[#ff5a00]">G4</span>
              </p>
              <p className="text-[10px] uppercase tracking-widest text-zinc-400">Oficina G4 • Coqueiro, Belém/PA</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-xs font-semibold text-zinc-300">
            <a href="#como-funciona" className="hover:text-[#ff5a00] transition-colors">Como Funciona</a>
            <a href="#niveis" className="hover:text-[#ff5a00] transition-colors">Níveis & Prêmios</a>
            <a href="#regras" className="hover:text-[#ff5a00] transition-colors">Regras</a>
            <a href="#faq" className="hover:text-[#ff5a00] transition-colors">Dúvidas</a>
          </nav>

          <a
            href="#inscricao"
            className="rounded-full bg-[#ff5a00] hover:bg-[#e55000] px-4 py-2 text-xs font-black uppercase tracking-wide text-white shadow-md shadow-[#ff5a00]/25"
          >
            Quero Participar
          </a>
        </div>
      </header>

      {/* SEÇÃO 1 — HERO */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/embaixador-hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/85 via-[#0a0a0a]/80 to-[#0a0a0a]" />
        <div className="pointer-events-none absolute -top-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#ff5a00]/20 blur-[120px]" />

        <div className="relative mx-auto max-w-4xl px-4 py-16 text-center sm:py-24 space-y-6">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#ff5a00]/45 bg-[#ff5a00]/15 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#ff5a00]">
            <Flame className="h-4 w-4" />
            NOVO PROJETO — 1ª TURMA COM VAGAS LIMITADAS
          </div>

          <h1 className="font-display text-4xl font-bold uppercase leading-[1.03] tracking-tight text-white sm:text-6xl">
            TREINAR DE GRAÇA NA <span className="text-[#ff5a00]">G4</span>?
          </h1>

          <p className="text-lg sm:text-2xl font-extrabold text-zinc-100">
            Sim, é real. E não é promoção: é um projeto.
          </p>

          <p className="mx-auto max-w-2xl text-sm sm:text-base leading-relaxed text-zinc-300">
            Seja Embaixador da <strong className="text-white">Oficina G4</strong>. Poste sua rotina, indique amigos e ganhe{" "}
            <strong className="text-white">mensalidade grátis, descontos e benefícios exclusivos</strong>.
          </p>

          {/* Gatilhos de urgência & prova social */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-zinc-950/80 px-3.5 py-2 text-xs font-bold text-zinc-200">
              <Users className="h-4 w-4 text-[#ff5a00]" />
              Já são <strong className="text-white">{inscritosCount}</strong> embaixadores na 1ª turma
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border border-[#ff5a00]/40 bg-[#ff5a00]/10 px-3.5 py-2 text-xs font-bold text-[#ff5a00]">
              <Clock className="h-4 w-4" />
              {countdown.encerrado
                ? `Inscrições até ${DATA_LIMITE_BR}`
                : `Encerra em ${countdown.dias} dias e ${countdown.horas}h (até ${DATA_LIMITE_BR})`}
            </span>
          </div>

          <div className="pt-3">
            <a
              href="#inscricao"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#ff5a00] hover:bg-[#e55000] px-8 py-4 text-sm sm:text-base font-black uppercase tracking-wider text-white shadow-2xl shadow-[#ff5a00]/30 transition-transform hover:scale-[1.02]"
            >
              👉 QUERO SER EMBAIXADOR
            </a>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-4 py-14 space-y-20">
        {/* SEÇÃO 2 — O QUE É O PROJETO */}
        <section className="grid gap-8 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">📖 O Projeto</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              Conheça o Projeto Embaixador G4
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-zinc-300">
              É o programa oficial de embaixadores da Oficina G4. Você posta sua rotina real na academia, indica novos alunos e, em troca, a G4 recompensa você com benefícios exclusivos.
            </p>
            <div className="rounded-2xl border border-[#ff5a00]/60 bg-gradient-to-r from-[#ff5a00] to-[#d94a00] p-5 shadow-xl shadow-[#ff5a00]/15">
              <p className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-white text-center sm:text-left">
                Você treina. Você posta. Você traz gente. A G4 recompensa.
              </p>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-[#ff5a00]/40 bg-[#0d0d10] shadow-2xl">
              <img
                src="/images/embaixador-projeto.jpg"
                alt="Mascote Oficial Oficina G4 — Prêmios e Benefícios do Projeto Embaixador G4"
                loading="lazy"
                className="w-full aspect-square object-cover"
              />
            </div>
          </div>
        </section>

        {/* SEÇÃO 3 — QUEM PODE PARTICIPAR */}
        <section className="rounded-3xl border border-white/10 bg-[#121216] p-6 sm:p-10 space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">👥 Requisitos</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              Quem pode ser Embaixador?
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {[
              "Alunos ativos da G4 (independente do tempo de casa)",
              "Moradores do Coqueiro e região com Instagram ativo (a partir de 300 seguidores)",
              "Gente que treina com constância e gosta de compartilhar a rotina",
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-zinc-950/90 p-5 flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                <p className="text-sm font-medium text-zinc-200 leading-relaxed">{item}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-base sm:text-lg font-extrabold text-[#ff5a00] pt-2">
            Não precisa ser influencer digital. Precisa ser constante.
          </p>
        </section>

        {/* SEÇÃO 4 — COMO FUNCIONA (3 PASSOS) */}
        <section id="como-funciona" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">🎯 Passo a Passo</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              Funciona em 3 passos simples
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                num: "01",
                icon: Ticket,
                titulo: "INSCRIÇÃO E CUPOM PESSOAL",
                texto: "Você se inscreve e recebe seu cupom pessoal (ex: SEUNOME10 = 10% OFF para seus indicados).",
              },
              {
                num: "02",
                icon: Camera,
                titulo: "PUBLICAÇÕES DA SUA ROTINA",
                texto: "Você posta sobre a G4: 2 stories por semana + 1 post por mês marcando @oficinag4_belem1.",
              },
              {
                num: "03",
                icon: BarChart3,
                titulo: "CONTAGEM NA META DO MÊS",
                texto: "Cada matrícula feita com o seu cupom entra automaticamente na sua meta mensal para desbloquear os benefícios do seu nível.",
              },
            ].map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="rounded-2xl border border-white/10 bg-[#121216] p-6 space-y-3 relative overflow-hidden">
                  <span className="absolute right-4 top-3 font-display text-5xl font-bold text-white/5 select-none">
                    {step.num}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#ff5a00]/15 border border-[#ff5a00]/30 text-[#ff5a00]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">{step.titulo}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.texto}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* SEÇÃO 5 — NÍVEIS E BENEFÍCIOS */}
        <section id="niveis" className="space-y-8 scroll-mt-20">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">🏆 Premiação Mensal</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              Quanto mais você indica, mais você ganha
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* NÍVEL 1 */}
            <div className="rounded-2xl border border-white/15 bg-[#121216] p-6 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🥉</span>
                  <span className="rounded-full bg-zinc-800 px-3 py-1 text-[11px] font-bold uppercase text-zinc-300">
                    Meta: 1 matrícula
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white">NÍVEL 1 — Iniciante</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">1 matrícula nova com seu cupom no mês</p>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-200">
                  {[
                    "1 mês de mensalidade 100% grátis",
                    "Código de desconto pessoal (10% OFF para indicados)",
                    "1 vale de diária grátis para dar a um amigo",
                    "Acesso à Comunidade VIP no WhatsApp da G4",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#inscricao"
                className="w-full rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 py-3 text-center text-xs font-black uppercase text-white transition-colors"
              >
                Começar no Nível 1
              </a>
            </div>

            {/* NÍVEL 2 */}
            <div className="rounded-2xl border border-[#ff5a00]/50 bg-gradient-to-b from-[#ff5a00]/10 via-[#121216] to-[#121216] p-6 flex flex-col justify-between gap-5">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🥈</span>
                  <span className="rounded-full bg-[#ff5a00]/20 border border-[#ff5a00]/40 px-3 py-1 text-[11px] font-bold uppercase text-[#ff5a00]">
                    Meta: 3 matrículas
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white">NÍVEL 2 — Oficial</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">3 matrículas novas com seu cupom no mês</p>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-200">
                  {[
                    "Mensalidade grátis no mês seguinte",
                    "3 vales de diária grátis para distribuir",
                    "Desconto de 15% em todos os suplementos da loja G4",
                    "1 avaliação física completa gratuita com a professora Karla Lameira",
                    "Foto no Mural dos Embaixadores da G4",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-[#ff5a00] shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#inscricao"
                className="w-full rounded-xl bg-white hover:bg-zinc-200 py-3 text-center text-xs font-black uppercase text-zinc-950 transition-colors"
              >
                Mirar no Nível 2
              </a>
            </div>

            {/* NÍVEL 3 */}
            <div className="relative rounded-2xl border-2 border-[#ff5a00] bg-gradient-to-b from-[#ff5a00]/20 via-[#141210] to-[#121216] p-6 flex flex-col justify-between gap-5 shadow-2xl shadow-[#ff5a00]/15">
              <span className="absolute -top-3 right-5 rounded-full bg-[#ff5a00] px-3 py-1 text-[10px] font-black uppercase tracking-wider text-white shadow">
                🏆 TOPO DO PROGRAMA
              </span>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">🥇</span>
                  <span className="rounded-full bg-[#ff5a00] px-3 py-1 text-[11px] font-black uppercase text-white">
                    Meta: 5+ matrículas
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white">NÍVEL 3 — Premium</h3>
                  <p className="text-xs text-zinc-300 mt-0.5">5 matrículas ou mais com seu cupom no mês</p>
                </div>
                <ul className="space-y-2.5 text-sm text-zinc-100">
                  {[
                    "Mensalidade 100% grátis",
                    "5 vales de diária grátis para distribuir",
                    "Desconto de 20% em suplementos",
                    "Camiseta exclusiva da G4 (próximo lançamento)",
                    "Consulta individual gratuita com Karla Lameira (treino + orientação)",
                    "Destaque especial no Instagram da academia",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#inscricao"
                className="w-full rounded-xl bg-[#ff5a00] hover:bg-[#e55000] py-3 text-center text-xs font-black uppercase text-white shadow-lg shadow-[#ff5a00]/25 transition-colors"
              >
                Quero Ser Nível 3
              </a>
            </div>
          </div>
        </section>

        {/* SEÇÃO 6 — REGRAS SIMPLES */}
        <section id="regras" className="rounded-3xl border border-white/10 bg-[#121216] p-6 sm:p-10 space-y-6 scroll-mt-20">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">📋 Transparência</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              Regras claras, sem letra miúda
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Frequência mínima: 2 stories por semana + 1 post por mês marcando @oficinag4_belem1",
              "Conteúdo real: seu treino de verdade, aqui dentro da academia",
              "Validação da indicação: o lead precisa usar/citar o seu cupom na matrícula para contar na sua meta",
              "Conduta: a G4 se reserva o direito de cancelar o título em caso de conteúdo ofensivo ou que desrespeite outros alunos",
            ].map((regra) => (
              <div key={regra} className="flex items-start gap-2.5 rounded-xl border border-white/5 bg-zinc-950/70 p-4 text-sm text-zinc-200">
                <ShieldCheck className="h-5 w-5 text-[#ff5a00] shrink-0 mt-0.5" />
                <span>{regra}</span>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 text-sm text-amber-100 leading-relaxed">
            <strong className="text-amber-400">Não bateu a meta?</strong> Sem problema. Você continua aluno G4 com todos os benefícios, só perde o título de Embaixador até o próximo mês. Bora tentar de novo!
          </div>
        </section>

        {/* SEÇÃO 7 — SUPORTE DA G4 (ADAPTADA: GRUPO VIP + CUPOM/LINK EXCLUSIVO) */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">🎁 Apoio Oficial</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase text-white">
              Você não posta sozinho
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              Para facilitar sua rotina e acelerar suas indicações, cada embaixador recebe acesso direto à nossa estrutura oficial:
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Grupo VIP de Embaixadores no WhatsApp</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Comunidade exclusiva da 1ª turma para trocar ideias, compartilhar suas postagens da semana, receber avisos em primeira mão e engajar junto com o time da Oficina G4.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#121216] p-6 flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#ff5a00]/15 border border-[#ff5a00]/30 text-[#ff5a00]">
                <Link2 className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">Cupom + Link Exclusivo no Portal do Aluno</h3>
                <p className="mt-1.5 text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Seu código personalizado (10% OFF), link pronto para compartilhar em 1 clique no WhatsApp, painel ao vivo da sua meta mensal e seus vales de diária grátis para presentear amigos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO 8 — FORMULÁRIO DE INSCRIÇÃO */}
        <section id="inscricao" className="scroll-mt-20">
          <div className="mx-auto max-w-3xl rounded-3xl border border-[#ff5a00]/45 bg-gradient-to-br from-[#19130f] via-[#121216] to-[#0a0a0a] p-6 sm:p-10 shadow-2xl">
            <div className="text-center space-y-2 mb-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5a00]/15 border border-[#ff5a00]/30 px-3 py-1 text-xs font-bold uppercase text-[#ff5a00]">
                <Sparkles className="h-3.5 w-3.5" /> Inscrição 1ª Turma
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase text-white">
                Garanta sua vaga na 1ª turma
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
                Preencha o formulário abaixo e entraremos em contato em até 24h com seu cupom pessoal e o acesso à Comunidade VIP.
              </p>
            </div>

            {enviado ? (
              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/25 p-8 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
                <h3 className="text-xl font-black text-white">Inscrição Recebida! 🎉</h3>
                <p className="text-sm text-zinc-300 max-w-md mx-auto">
                  Obrigado, <strong>{nome}</strong>! Entraremos em contato pelo WhatsApp em até <strong>24h</strong> com o seu cupom pessoal e o convite do Grupo VIP dos Embaixadores.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
                  <a
                    href={buildInscricaoWhatsApp()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-6 py-3 text-xs font-black uppercase text-white"
                  >
                    <MessageCircle className="h-4 w-4" /> Enviar / Reabrir no WhatsApp
                  </a>
                  <button
                    type="button"
                    onClick={() => setEnviado(false)}
                    className="rounded-xl border border-white/15 px-5 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
                  >
                    Editar resposta
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-zinc-300">1. Nome completo *</label>
                    <input
                      type="text"
                      required
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Seu nome completo"
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a00] focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-zinc-300">2. WhatsApp (com DDD) *</label>
                    <input
                      type="tel"
                      required
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(91) 99999-9999"
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a00] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-zinc-300">3. Instagram (@seuusuario) *</label>
                  <input
                    type="text"
                    required
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="@seuusuario"
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a00] focus:outline-none"
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-bold text-zinc-300">4. Há quanto tempo você treina na G4? *</label>
                    <select
                      required
                      value={tempoTreino}
                      onChange={(e) => setTempoTreino(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a00] focus:outline-none"
                    >
                      <option value="">Selecione...</option>
                      <option value="Menos de 3 meses">Menos de 3 meses</option>
                      <option value="3 a 6 meses">3 a 6 meses</option>
                      <option value="6 meses a 1 ano">6 meses a 1 ano</option>
                      <option value="Mais de 1 ano">Mais de 1 ano</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-bold text-zinc-300">5. Quantos seguidores você tem no Instagram? *</label>
                    <select
                      required
                      value={seguidores}
                      onChange={(e) => setSeguidores(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a00] focus:outline-none"
                    >
                      <option value="">Selecione...</option>
                      <option value="300 a 500">300 a 500</option>
                      <option value="500 a 1.000">500 a 1.000</option>
                      <option value="1.000 a 5.000">1.000 a 5.000</option>
                      <option value="Mais de 5.000">Mais de 5.000</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold text-zinc-300">6. Por que você quer ser Embaixador G4?</label>
                  <textarea
                    rows={3}
                    value={motivacao}
                    onChange={(e) => setMotivacao(e.target.value)}
                    placeholder="Conte um pouco da sua rotina de treinos e por que você quer representar a G4..."
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-3.5 py-2.5 text-sm text-white focus:border-[#ff5a00] focus:outline-none"
                  />
                </div>

                <label className="flex items-start gap-2.5 rounded-xl border border-white/10 bg-zinc-950/80 p-3.5 cursor-pointer text-xs text-zinc-200">
                  <input
                    type="checkbox"
                    required
                    checked={aceitouRegras}
                    onChange={(e) => setAceitouRegras(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-[#ff5a00]"
                  />
                  <span>
                    <strong>7. Li e aceito as regras do Projeto Embaixador G4 *</strong> (frequência de 2 stories/semana + 1 post/mês, conteúdo real na academia e conduta respeitosa).
                  </span>
                </label>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#ff5a00] hover:bg-[#e55000] py-4 px-6 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-[#ff5a00]/25 transition-transform active:scale-95"
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
        <section id="faq" className="mx-auto max-w-4xl space-y-6 scroll-mt-20">
          <div className="text-center">
            <span className="text-xs font-black uppercase tracking-widest text-[#ff5a00]">❓ Tire suas Dúvidas</span>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-bold uppercase text-white flex items-center justify-center gap-2">
              <HelpCircle className="h-7 w-7 text-[#ff5a00]" /> Dúvidas Frequentes
            </h2>
          </div>

          <div className="space-y-3">
            {FAQ_EMBAIXADOR.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={item.q} className="overflow-hidden rounded-xl border border-white/10 bg-[#121216]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-bold text-white hover:bg-white/5 transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#ff5a00] transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="border-t border-white/5 px-5 py-4 text-sm text-zinc-300 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* SEÇÃO 10 — RODAPÉ / CONTATO */}
        <section className="rounded-3xl border border-[#ff5a00]/40 bg-gradient-to-br from-[#ff5a00]/15 via-[#121216] to-[#0a0a0a] p-8 sm:p-10 text-center space-y-5">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#ff5a00]/20 px-3 py-1 text-xs font-bold uppercase text-[#ff5a00]">
            <Award className="h-3.5 w-3.5" /> Ficou com dúvida?
          </div>
          <h2 className="font-display text-3xl font-bold uppercase text-white">
            Fale com a gente
          </h2>
          <p className="text-sm text-zinc-300 max-w-lg mx-auto">
            Chame nossa equipe no WhatsApp ou visite a academia para tirar qualquer dúvida sobre a 1ª turma do Embaixador G4.
          </p>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 text-xs text-zinc-300 pt-2 text-left">
            <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-3.5 flex items-center gap-2.5">
              <MessageCircle className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>WhatsApp: <strong className="text-white">{G4_CONFIG.whatsappPrincipalFormatado}</strong></span>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-3.5 flex items-center gap-2.5">
              <Instagram className="h-4 w-4 text-pink-400 shrink-0" />
              <span>Instagram: <strong className="text-white">{G4_CONFIG.instagramHandle}</strong></span>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-3.5 flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-[#ff5a00] shrink-0" />
              <span>Av. São Pedro, em cima da Sorveteria Labom — Coqueiro</span>
            </div>
            <div className="rounded-xl border border-white/10 bg-zinc-950/70 p-3.5 flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#ff5a00] shrink-0" />
              <span>Seg–Sex 06:30–12h e 15h–22h | Sáb 08h–12h</span>
            </div>
          </div>

          <div className="mx-auto max-w-xs overflow-hidden rounded-2xl border border-[#ff5a00]/40 bg-[#0d0d10] shadow-xl">
            <img
              src="/images/embaixador-fachada.jpg"
              alt="Oficina G4 — Em cima da Sorveteria La Bom, Coqueiro"
              loading="lazy"
              className="w-full aspect-square object-cover"
            />
          </div>

          <div className="pt-2">
            <a
              href={buildWhatsAppLink("Olá! Vi a página do Projeto Embaixador G4 e gostaria de tirar uma dúvida.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 px-8 py-4 text-sm font-black uppercase tracking-wider text-white shadow-xl shadow-emerald-600/25"
            >
              <MessageCircle className="h-5 w-5" /> 💬 CHAMAR NO WHATSAPP
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8 text-center text-xs text-zinc-500">
        <p>© {new Date().getFullYear()} Oficina G4 Academia • Projeto Embaixador G4 — Coqueiro, Belém/PA</p>
      </footer>
    </div>
  );
}
