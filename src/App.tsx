import { useState } from "react";
import {
  Dumbbell,
  Flame,
  Wrench,
  Users,
  Smartphone,
  CheckCircle2,
  MessageCircle,
  ClipboardList,
  Utensils,
  Ruler,
  MessagesSquare,
  MapPin,
  Clock,
  Instagram,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Trophy,
  Menu,
  X,
  Phone,
} from "lucide-react";
import { G4_CONFIG, PLANOS_PRESENCIAIS, buildWhatsAppLink } from "./lib/config";
import { trackConversion } from "./lib/tracking";

const PILARES = [
  {
    icon: Dumbbell,
    titulo: "Musculação + Cardio",
    descricao: "Foco total em hipertrofia, emagrecimento, força e condicionamento.",
  },
  {
    icon: Users,
    titulo: "Atendimento Real",
    descricao: "Professores sempre presentes e atentos no salão — você nunca treina sozinho.",
  },
  {
    icon: Wrench,
    titulo: "Manutenção Diária",
    descricao: "Revisão e lubrificação todos os dias. Zero máquinas quebradas no seu treino.",
  },
  {
    icon: Smartphone,
    titulo: "Portal do Aluno G4",
    descricao: "Ficha de treino, avaliação física, recibos e lembretes direto no celular.",
  },
];

const DIFERENCIAIS = [
  {
    tag: "ATENDIMENTO",
    titulo: "Suporte que faz a diferença",
    descricao:
      "Aqui você não é só um número na catraca. Nossos professores acompanham postura, carga e evolução em um ambiente que acolhe iniciantes e desafia avançados.",
    imagem: "/images/suporte.jpg",
    itens: [
      "Professores sempre presentes no salão",
      "Acompanhamento próximo desde o 1º dia",
      "Acompanhamento digital e lembretes inteligentes",
    ],
  },
  {
    tag: "EMAGRECIMENTO & CARDIO",
    titulo: "Queima de gordura com musculação inteligente",
    descricao:
      "Estrutura pensada para quem busca emagrecer com saúde, definindo o corpo com a combinação certa de musculação e cardio — sem dietas malucas ou treinos genéricos.",
    imagem: "/images/cardio.jpg",
    itens: [
      "Musculação + cardio integrados ao seu objetivo",
      "Treino adaptado ao seu nível e ritmo",
      "Evolução monitorada passo a passo",
    ],
  },
  {
    tag: "ESTRUTURA",
    titulo: "Mais espaço, menos espera",
    descricao:
      "Ampliamos nossa área de treino com layout inteligente para maior circulação. Mais conforto e fluidez para você focar no que realmente importa: seu resultado.",
    imagem: "/images/espaco.jpg",
    itens: [
      "Área de treino recém-ampliada",
      "Layout inteligente com ótima circulação",
      "Treino fluido sem perder tempo em fila",
    ],
  },
  {
    tag: "SEGURANÇA",
    titulo: "Manutenção diária e segurança",
    descricao:
      "Todos os aparelhos passam por revisão e lubrificação diária. Equipamentos macios, seguros e 100% operacionais para o seu treino render ao máximo.",
    imagem: "/images/manutencao.jpg",
    itens: [
      "Revisão e lubrificação diária",
      "Zero máquinas quebradas",
      "Segurança e biomecânica em dia",
    ],
  },
];

const ENTREGAVEIS_CONSULTORIA = [
  {
    icon: ClipboardList,
    titulo: "Anamnese com Educador Físico",
    descricao:
      "Análise individual completa dos seus objetivos, rotina, histórico de treino, lesões e restrições antes de prescrever qualquer exercício.",
  },
  {
    icon: Dumbbell,
    titulo: "Protocolo de Treino Personalizado",
    descricao:
      "Divisão estratégica de musculação e cardio feita sob medida para o seu corpo e tempo disponível, direto no celular.",
  },
  {
    icon: Utensils,
    titulo: "Protocolo Alimentar",
    descricao:
      "Direcionamento alimentar alinhado ao seu protocolo de treino para acelerar emagrecimento, definição ou ganho de massa magra.",
  },
  {
    icon: Ruler,
    titulo: "Avaliação Física",
    descricao:
      "Acompanhamento contínuo de medidas, indicadores e evolução corporal para garantir resultados reais e mensuráveis.",
  },
  {
    icon: MessagesSquare,
    titulo: "Chat Semanal com o Professor",
    descricao:
      "Check-in toda semana para tirar dúvidas, ajustar cargas, corrigir rota e manter sua disciplina em alta.",
  },
];

const FAQ_ITEMS = [
  {
    pergunta: "Nunca treinei antes. Vou ter acompanhamento de verdade?",
    resposta:
      "Sim! Esse é o maior diferencial da Oficina G4. Nossos professores ficam presentes no salão orientando execução, postura e evolução desde o primeiro dia, além de você ter sua ficha organizada no Portal do Aluno no celular.",
  },
  {
    pergunta: "A academia ajuda no emagrecimento? Tem área de cardio?",
    resposta:
      "Com certeza. Trabalhamos com foco total em Musculação, Cardio e Emagrecimento — a combinação mais eficiente para perder gordura mantendo firmeza muscular e saúde.",
  },
  {
    pergunta: "Como funciona a Consultoria Online G4? Preciso treinar na G4?",
    resposta:
      "Não precisa! A Consultoria Online funciona tanto para alunos presenciais da Oficina G4 quanto para quem treina em qualquer outra academia. Inclui Anamnese com Educador Físico, Protocolo de Treino, Protocolo Alimentar, Avaliação Física e Chat Semanal com o professor.",
  },
  {
    pergunta: "Como funciona o Plano Família (R$ 60,00)?",
    resposta:
      "No Plano Família, cada integrante da mesma família paga apenas R$ 60,00/mês com acesso completo à musculação, cardio e Portal do Aluno. Fale conosco no WhatsApp para cadastrar sua família.",
  },
  {
    pergunta: "Posso fazer uma diária para conhecer antes de fechar o mensal ou trimestral?",
    resposta:
      "Sim! A Diária custa apenas R$ 15,00. Você conhece o espaço ampliado, testa nossas máquinas revisadas diariamente e sente na prática o atendimento da equipe.",
  },
  {
    pergunta: "Quais formas de pagamento vocês aceitam?",
    resposta:
      "Aceitamos PIX (inclusive integrado ao seu Portal do Aluno), cartão e dinheiro diretamente na recepção.",
  },
];

function G4Logo() {
  return (
    <a href="#topo" className="flex items-center gap-2.5 group">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF6B00] font-display text-xl font-bold tracking-tight text-white shadow-lg shadow-[#FF6B00]/25 transition-transform group-hover:scale-105">
        G4
      </div>
      <div className="leading-none">
        <span className="block font-display text-lg font-bold uppercase tracking-wider text-white">
          Oficina <span className="text-[#FF6B00]">G4</span>
        </span>
        <span className="block text-[10px] font-medium uppercase tracking-widest text-zinc-400">
          Musculação • Belém/PA
        </span>
      </div>
    </a>
  );
}

export default function App() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const consultoriaWaLink = buildWhatsAppLink(
    "Olá! Vi o site da Oficina G4 e quero consultar vagas para a Consultoria Online 360° (Anamnese + Protocolo de Treino + Protocolo Alimentar + Avaliação Física + Chat Semanal)."
  );

  const geralWaLink = buildWhatsAppLink(
    "Olá! Vim pelo site da Oficina G4 e gostaria de mais informações sobre os planos e horários."
  );

  return (
    <div id="topo" className="min-h-screen bg-[#09090B] text-white pb-20 md:pb-0">
      {/* Barra superior de destaque */}
      <div className="bg-[#FF6B00] px-4 py-2 text-center text-xs font-bold uppercase tracking-wider text-white">
        🔥 Nova Oficina G4 no Coqueiro — Planos a partir de R$ 60/mês • Consultoria Online com vagas limitadas
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <G4Logo />

          <nav className="hidden items-center gap-7 text-sm font-medium text-zinc-300 md:flex">
            <a href="#diferenciais" className="transition-colors hover:text-[#FF6B00]">
              Diferenciais
            </a>
            <a href="#planos" className="transition-colors hover:text-[#FF6B00]">
              Planos
            </a>
            <a href="#consultoria" className="transition-colors hover:text-[#FF6B00]">
              Consultoria Online
            </a>
            <a href="#faq" className="transition-colors hover:text-[#FF6B00]">
              Dúvidas
            </a>
            <a href="#localizacao" className="transition-colors hover:text-[#FF6B00]">
              Localização
            </a>
          </nav>

          <div className="hidden items-center gap-2.5 md:flex">
            <a
              href={G4_CONFIG.preCadastroUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion("Lead_PreCadastro", "Header_CriarConta")}
              className="rounded-lg border border-white/15 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-[#FF6B00] hover:text-white"
            >
              Criar Conta
            </a>
            <a
              href={geralWaLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackConversion("Lead_Presencial", "Header_WhatsApp")}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#FF6B00] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-[#FF6B00]/20 transition-all hover:bg-[#E55F00]"
            >
              <MessageCircle className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="rounded-lg border border-white/10 p-2 text-zinc-300 md:hidden"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#121216] px-4 py-4 md:hidden">
            <div className="flex flex-col gap-3 text-sm font-medium text-zinc-200">
              <a href="#diferenciais" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Diferenciais
              </a>
              <a href="#planos" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Planos Presenciais
              </a>
              <a href="#consultoria" onClick={() => setMobileMenuOpen(false)} className="py-1.5 text-[#FF6B00]">
                Consultoria Online 360°
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Perguntas Frequentes
              </a>
              <a href="#localizacao" onClick={() => setMobileMenuOpen(false)} className="py-1.5">
                Endereço e Horários
              </a>
              <a
                href={G4_CONFIG.preCadastroUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion("Lead_PreCadastro", "MobileMenu_PreMatricula")}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg border border-[#FF6B00]/40 bg-[#FF6B00]/10 py-2.5 text-center font-bold text-[#FF6B00]"
              >
                Fazer Pré-Matrícula Online <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('/images/hero-g4.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090B]/85 via-[#09090B]/80 to-[#09090B]" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#FF6B00]/20 blur-[120px]" />

        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 md:grid-cols-12 md:py-20">
          <div className="md:col-span-7">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
              <Flame className="h-3.5 w-3.5" />
              Musculação • Cardio • Emagrecimento • Coqueiro - Belém/PA
            </div>

            <h1 className="font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              A G4 mudou.{" "}
              <span className="text-[#FF6B00]">Atendimento de verdade</span> e resultado real no seu treino.
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
              A academia de musculação e cardio onde você <strong>nunca treina sozinho</strong>.
              Espaço ampliado, professores sempre presentes, manutenção diária em todas as máquinas e
              seu treino completo na palma da mão — a partir de{" "}
              <strong className="text-white">R$ 60/mês</strong>.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#planos"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-xl shadow-[#FF6B00]/25 transition-all hover:scale-[1.01] hover:bg-[#E55F00]"
              >
                Quero Treinar na G4
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#consultoria"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-4 text-sm font-bold uppercase tracking-wide text-white backdrop-blur transition-colors hover:border-[#FF6B00] hover:bg-[#FF6B00]/10"
              >
                <Sparkles className="h-4 w-4 text-[#FF6B00]" />
                Consultoria Online 360°
              </a>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-zinc-400">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                Sem fidelidade abusiva
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                Zero máquinas quebradas
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-[#FF6B00]" />
                Portal do Aluno no celular
              </span>
            </div>
          </div>

          {/* Card visual Hero */}
          <div className="md:col-span-5">
            <div className="relative mx-auto max-w-sm overflow-hidden rounded-2xl border border-white/15 bg-[#121216] shadow-2xl shadow-black/60">
              <img
                src="/images/hero-g4.jpg"
                alt="Nova Oficina G4 — Um novo padrão de evolução para o seu treino"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/80 to-transparent p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                  Diária experimental
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white">
                  Venha conhecer a estrutura por apenas R$ 15,00
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FAIXA DE 4 PILARES */}
      <section className="border-b border-white/10 bg-[#121216]">
        <div className="mx-auto grid max-w-6xl gap-4 px-4 py-8 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {PILARES.map((pilar) => {
            const Icon = pilar.icon;
            return (
              <div
                key={pilar.titulo}
                className="flex items-start gap-3.5 rounded-xl border border-white/5 bg-[#18181D] p-4"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF6B00]/15 text-[#FF6B00]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-white">{pilar.titulo}</h2>
                  <p className="mt-1 text-xs leading-relaxed text-zinc-400">{pilar.descricao}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. DIFERENCIAIS — POR QUE A OFICINA G4? */}
      <section id="diferenciais" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            Por que treinar na Oficina G4?
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Mais do que uma academia. Um novo padrão de evolução.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400 sm:text-base">
            Resolvemos os maiores problemas das academias comuns: abandono de professor, fila longa e
            aparelhos sem manutenção.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {DIFERENCIAIS.map((item) => (
            <article
              key={item.titulo}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#121216] transition-colors hover:border-[#FF6B00]/50"
            >
              <div className="relative h-64 overflow-hidden bg-black">
                <img
                  src={item.imagem}
                  alt={item.titulo}
                  loading="lazy"
                  className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    item.imagem === "/images/cardio.jpg" ? "object-[50%_20%]" : "object-center"
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121216] via-[#121216]/30 to-transparent" />
                <span className="absolute left-4 top-4 rounded-md bg-[#FF6B00] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow">
                  {item.tag}
                </span>
              </div>

              <div className="p-6">
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  {item.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{item.descricao}</p>

                <ul className="mt-4 space-y-2">
                  {item.itens.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2 text-sm text-zinc-200">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FF6B00]" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. PLANOS PRESENCIAIS (DUPLA CONVERSÃO) */}
      <section id="planos" className="border-y border-white/10 bg-[#121216] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              Planos Presenciais • Coqueiro — Belém/PA
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
              Escolha o plano ideal para começar hoje
            </h2>
            <p className="mt-3 text-sm text-zinc-400 sm:text-base">
              Preços transparentes, sem pegadinha. Escolha abaixo para falar direto no{" "}
              <strong className="text-white">WhatsApp</strong> ou adiantar sua{" "}
              <strong className="text-white">Pré-Matrícula Online</strong>.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PLANOS_PRESENCIAIS.map((plano) => (
              <div
                key={plano.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-6 transition-all ${
                  plano.featured
                    ? "border-[#FF6B00] bg-gradient-to-b from-[#FF6B00]/10 via-[#18181D] to-[#18181D] shadow-xl shadow-[#FF6B00]/10"
                    : "border-white/10 bg-[#18181D] hover:border-white/25"
                }`}
              >
                {plano.destaque && (
                  <span className="absolute -top-3 right-5 rounded-full bg-[#FF6B00] px-3 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white shadow">
                    {plano.destaque}
                  </span>
                )}

                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-white">
                    {plano.nome}
                  </h3>
                  <p className="mt-1 text-xs text-zinc-400">{plano.subtitulo}</p>

                  <div className="mt-4 border-y border-white/10 py-4">
                    <span className="font-display text-4xl font-bold text-[#FF6B00]">
                      {plano.preco}
                    </span>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {plano.beneficios.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FF6B00]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-7 flex flex-col gap-2.5">
                  <a
                    href={`${G4_CONFIG.preCadastroUrl}?plano=${encodeURIComponent(plano.id)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("Lead_PreCadastro", `Plano_${plano.nome}`)}
                    className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-extrabold uppercase tracking-wide transition-all ${
                      plano.featured
                        ? "bg-[#FF6B00] text-white shadow-lg shadow-[#FF6B00]/25 hover:bg-[#E55F00]"
                        : "bg-white text-zinc-950 hover:bg-zinc-200"
                    }`}
                  >
                    Criar Conta no Portal
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>

                  <a
                    href={buildWhatsAppLink(plano.mensagemWhatsApp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("Lead_Presencial", `Plano_${plano.nome}`)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-xs font-semibold text-zinc-200 transition-colors hover:border-[#FF6B00]/60 hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4 text-emerald-400" />
                    Falar no WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. OFERTA PREMIUM — CONSULTORIA ONLINE G4 */}
      <section id="consultoria" className="relative overflow-hidden py-16 md:py-24">
        <div className="pointer-events-none absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-[#FF6B00]/15 blur-[140px]" />

        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-3xl border border-[#FF6B00]/40 bg-gradient-to-br from-[#1A1410] via-[#121216] to-[#0D0D10] p-6 sm:p-10 md:p-12">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#FF6B00]/40 bg-[#FF6B00]/15 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Acompanhamento 360° • Vagas Limitadas
                </div>

                <h2 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
                  Consultoria Online <span className="text-[#FF6B00]">Oficina G4</span>
                </h2>

                <p className="mt-4 text-sm leading-relaxed text-zinc-300 sm:text-base">
                  Quer acelerar o emagrecimento, destravar sua evolução ou ter um planejamento
                  completo feito especificamente para a sua rotina? Tenha o time G4 acompanhando você
                  de perto — <strong>treinando na G4 ou em qualquer academia</strong>.
                </p>

                {/* Como funciona em 3 passos */}
                <div className="mt-6 space-y-3 rounded-2xl border border-white/10 bg-black/40 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
                    Como funciona:
                  </p>
                  <div className="flex items-center gap-3 text-sm text-zinc-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-xs font-bold text-white">
                      1
                    </span>
                    <span>Consulte disponibilidade de vagas no WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-xs font-bold text-white">
                      2
                    </span>
                    <span>Anamnese individual com Educador Físico</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-200">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#FF6B00] text-xs font-bold text-white">
                      3
                    </span>
                    <span>Receba seu protocolo completo + Chat Semanal</span>
                  </div>
                </div>

                <div className="mt-7">
                  <a
                    href={consultoriaWaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("Lead_Consultoria", "Botao_ConsultarVagas")}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white shadow-xl shadow-[#FF6B00]/25 transition-all hover:scale-[1.01] hover:bg-[#E55F00] sm:w-auto"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Consultar Vagas no WhatsApp
                  </a>
                  <p className="mt-2.5 text-xs text-zinc-400">
                    Atendimento individualizado • Vagas controladas para manter a qualidade do chat semanal.
                  </p>
                </div>
              </div>

              {/* 5 Entregáveis */}
              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
                {ENTREGAVEIS_CONSULTORIA.map((entregavel, idx) => {
                  const Icon = entregavel.icon;
                  return (
                    <div
                      key={entregavel.titulo}
                      className={`rounded-2xl border border-white/10 bg-[#18181D]/90 p-5 ${
                        idx === ENTREGAVEIS_CONSULTORIA.length - 1 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FF6B00]/15 text-[#FF6B00]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 text-base font-bold text-white">{entregavel.titulo}</h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-zinc-400 sm:text-sm">
                        {entregavel.descricao}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PARA QUEM É + AUTORIDADE REAL */}
      <section className="border-t border-white/10 bg-[#121216] py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
              <img
                src="/images/evolucao.jpg"
                alt="Equipe e troféus da Oficina G4"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
              <Trophy className="h-4 w-4" />
              Cultura de Resultado & Acolhimento
            </span>
            <h2 className="mt-2 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
              Feita para quem está começando e para quem treina sério
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#18181D] p-5">
                <h3 className="text-base font-bold text-white">Para Iniciantes & Emagrecimento</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Nunca pisou numa academia ou está voltando agora? Nossa equipe monta seu treino,
                  ensina cada movimento sem pressa e acompanha sua evolução no aplicativo.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-[#18181D] p-5">
                <h3 className="text-base font-bold text-white">Para Quem Já Treina Pesado</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  Ambiente focado em musculação de verdade, máquinas lubrificadas diariamente, mais
                  espaço para treinar e suplementação disponível na própria academia.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 rounded-2xl border border-[#FF6B00]/30 bg-[#FF6B00]/10 p-4">
              <ShieldCheck className="h-8 w-8 shrink-0 text-[#FF6B00]" />
              <div className="flex-1 text-sm text-zinc-200">
                <strong className="text-white">Portal do Aluno G4 incluso:</strong> acesse sua ficha
                de treino, avaliações físicas, recibos e chave PIX direto do celular, sem baixar nada
                pesado.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-20">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            Tire suas dúvidas
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            Perguntas Frequentes
          </h2>
        </div>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={item.pergunta}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#121216]"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-bold text-white transition-colors hover:bg-white/5 sm:text-base"
                >
                  <span>{item.pergunta}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-[#FF6B00] transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="border-t border-white/5 px-5 py-4 text-sm leading-relaxed text-zinc-300">
                    {item.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8. CTA FINAL + LOCALIZAÇÃO E HORÁRIOS */}
      <section id="localizacao" className="border-t border-white/10 bg-[#121216] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Banner CTA Final */}
          <div className="mb-14 rounded-3xl bg-gradient-to-r from-[#FF6B00] to-[#D94E00] p-8 text-center shadow-2xl shadow-[#FF6B00]/20 sm:p-12">
            <h2 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
              E isso é só o começo. Garanta seu lugar nessa evolução!
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-white/90 sm:text-base">
              Chame nossa equipe no WhatsApp agora mesmo ou faça sua pré-matrícula online em menos de
              1 minuto.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={G4_CONFIG.preCadastroUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion("Lead_PreCadastro", "CTAFinal_CriarConta")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white transition-transform hover:scale-[1.02]"
              >
                Criar Minha Conta no Portal
                <ExternalLink className="h-4 w-4 text-[#FF6B00]" />
              </a>
              <a
                href={geralWaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackConversion("Lead_Presencial", "CTAFinal_WhatsApp")}
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white bg-white/10 px-7 py-4 text-sm font-extrabold uppercase tracking-wide text-white backdrop-blur transition-colors hover:bg-white hover:text-zinc-950"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp Agora
              </a>
            </div>
          </div>

          {/* Grid Localização + Horários + Contatos */}
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-[#18181D] p-6">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <MapPin className="h-5 w-5" />
                <h3 className="font-display text-xl font-bold uppercase text-white">Onde Estamos</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{G4_CONFIG.endereco}</p>
              <a
                href={G4_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#FF6B00] hover:underline"
              >
                Abrir no Google Maps <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#18181D] p-6">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <Clock className="h-5 w-5" />
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Horário de Funcionamento
                </h3>
              </div>
              <ul className="mt-3 space-y-2.5 text-sm">
                {G4_CONFIG.horarios.map((h) => (
                  <li key={h.dia} className="flex items-center justify-between gap-2 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                    <span className="text-zinc-400">{h.dia}</span>
                    <span className="font-semibold text-white">{h.hora}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#18181D] p-6">
              <div className="flex items-center gap-2.5 text-[#FF6B00]">
                <Phone className="h-5 w-5" />
                <h3 className="font-display text-xl font-bold uppercase text-white">
                  Canais Oficiais
                </h3>
              </div>
              <div className="mt-4 space-y-3 text-sm">
                <a
                  href={buildWhatsAppLink("Olá! Vim pelo site da Oficina G4.", G4_CONFIG.whatsappPrincipal)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-200 hover:text-[#FF6B00]"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp 1: {G4_CONFIG.whatsappPrincipalFormatado}</span>
                </a>
                <a
                  href={buildWhatsAppLink("Olá! Vim pelo site da Oficina G4.", G4_CONFIG.whatsappSecundario)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-200 hover:text-[#FF6B00]"
                >
                  <MessageCircle className="h-4 w-4 text-emerald-400" />
                  <span>WhatsApp 2: {G4_CONFIG.whatsappSecundarioFormatado}</span>
                </a>
                <a
                  href={G4_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-zinc-200 hover:text-[#FF6B00]"
                >
                  <Instagram className="h-4 w-4 text-pink-400" />
                  <span>{G4_CONFIG.instagramHandle}</span>
                </a>
                <a
                  href={G4_CONFIG.portalLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 pt-1 text-xs font-bold uppercase tracking-wider text-[#FF6B00] hover:underline"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Já sou aluno — Acessar Portal</span>
                </a>
              </div>
            </div>
          </div>

          <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-zinc-500">
            © {new Date().getFullYear()} Oficina G4 — Musculação, Cardio, Emagrecimento e Consultoria Online. Todos os direitos reservados.
          </footer>
        </div>
      </section>

      {/* Botão Flutuante de WhatsApp (Desktop) */}
      <a
        href={geralWaLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackConversion("Lead_WhatsApp_Flutuante", "Botao_Flutuante")}
        aria-label="Falar no WhatsApp da Oficina G4"
        className="fixed bottom-6 right-6 z-50 hidden items-center gap-2 rounded-full bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white shadow-2xl shadow-emerald-500/30 transition-transform hover:scale-105 hover:bg-emerald-600 md:inline-flex"
      >
        <MessageCircle className="h-5 w-5" />
        WhatsApp G4
      </a>

      {/* Barra Fixa Mobile de Alta Conversão */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex items-center gap-2 border-t border-white/10 bg-[#09090B]/95 p-3 backdrop-blur-md md:hidden">
        <a
          href={geralWaLink}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion("Lead_WhatsApp_Flutuante", "MobileBar_WhatsApp")}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 py-3 text-center text-xs font-bold uppercase text-white"
        >
          <MessageCircle className="h-4 w-4 text-emerald-400" />
          WhatsApp
        </a>
        <a
          href={G4_CONFIG.preCadastroUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion("Lead_PreCadastro", "MobileBar_CriarConta")}
          className="flex flex-[1.4] items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] py-3 text-center text-xs font-extrabold uppercase text-white shadow-lg shadow-[#FF6B00]/25"
        >
          Criar Conta no Portal
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  );
}
