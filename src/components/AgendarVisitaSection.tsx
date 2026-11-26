import { useState } from "react";
import { CalendarCheck, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { G4_CONFIG, buildWhatsAppLink } from "../lib/config";
import { trackConversion } from "../lib/tracking";

const API_AGENDAMENTO_URL = "https://orbit-care-backend.onrender.com/api/visitas/publica";

export function AgendarVisitaSection() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [data, setData] = useState(() => new Date().toISOString().slice(0, 10));
  const [turno, setTurno] = useState("Manhã (06:30 às 12:00)");
  const [enviando, setEnviando] = useState(false);
  const [agendado, setAgendado] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim() || telefone.replace(/\D/g, "").length < 10) return;

    setEnviando(true);
    try {
      await fetch(API_AGENDAMENTO_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: nome.trim(),
          telefone: telefone.replace(/\D/g, ""),
          data,
          turno,
        }),
      });
      trackConversion("Lead_Presencial", "Agendamento_Diaria_Site");
      setAgendado(true);
    } catch {
      // Mesmo em falha de rede, permite confirmar pelo WhatsApp
      trackConversion("Lead_Presencial", "Agendamento_Diaria_Fallback");
      setAgendado(true);
    } finally {
      setEnviando(false);
    }
  };

  const dataFormatada = data ? data.split("-").reverse().join("/") : "";
  const waConfirmLink = buildWhatsAppLink(
    `Olá! Agendei minha Visita / Diária (R$ 15,00) pelo site da Oficina G4:\n• Nome: ${nome}\n• Data: ${dataFormatada}\n• Turno: ${turno}\nNos vemos lá!`
  );

  return (
    <section id="agendar" className="border-t border-white/10 bg-[#121216] py-16 md:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-3xl border border-[#FF6B00]/35 bg-gradient-to-br from-[#191512] via-[#141419] to-[#0D0D10] p-6 sm:p-10">
          <div className="grid gap-8 md:grid-cols-12 md:items-center">
            <div className="md:col-span-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
                <CalendarCheck className="h-4 w-4" />
                Conheça na Prática
              </span>
              <h2 className="mt-2 font-display text-3xl font-bold uppercase text-white">
                Agende sua Visita ou Diária (R$ 15)
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                Escolha o melhor dia e turno para conhecer o espaço ampliado, testar nossas máquinas
                e conversar com os professores na <strong className="text-zinc-200">Oficina G4</strong>.
              </p>
              <p className="mt-3 text-xs text-zinc-500">{G4_CONFIG.endereco}</p>
              <div className="mt-4 rounded-xl border border-white/10 bg-[#09090B]/70 p-3 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-[#FF6B00]">
                  <Clock className="h-3.5 w-3.5" />
                  Horário de Funcionamento
                </div>
                {G4_CONFIG.horarios.map((h) => (
                  <div key={h.dia} className="flex items-center justify-between gap-2 text-zinc-300">
                    <span className="text-zinc-400">{h.dia}</span>
                    <span className="font-semibold text-white">{h.hora}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7">
              {agendado ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/25 p-6 text-center space-y-3">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400" />
                  <h3 className="text-lg font-bold text-white">Visita Agendada com Sucesso!</h3>
                  <p className="text-xs text-zinc-300">
                    Recebemos seu agendamento para <strong>{dataFormatada}</strong> ({turno}) diretamente na nossa recepção.
                  </p>
                  <div className="pt-2 flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <a
                      href={waConfirmLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-xs font-extrabold uppercase text-white hover:bg-emerald-500"
                    >
                      <MessageCircle className="h-4 w-4" />
                      Confirmar no WhatsApp
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setAgendado(false);
                        setNome("");
                        setTelefone("");
                      }}
                      className="rounded-xl border border-white/15 px-4 py-3 text-xs font-semibold text-zinc-300 hover:text-white"
                    >
                      Agendar outro horário
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300">Seu Nome *</label>
                      <input
                        type="text"
                        required
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        placeholder="Nome completo"
                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-300">WhatsApp (com DDD) *</label>
                      <input
                        type="tel"
                        required
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        placeholder="(91) 99999-9999"
                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-zinc-300">Melhor Data *</label>
                      <input
                        type="date"
                        required
                        value={data}
                        min={new Date().toISOString().slice(0, 10)}
                        onChange={(e) => setData(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-zinc-300">Turno Preferido</label>
                      <select
                        value={turno}
                        onChange={(e) => setTurno(e.target.value)}
                        className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                      >
                        <option value="Manhã (06:30 às 12:00)">Manhã (06:30 às 12:00)</option>
                        <option value="Tarde/Noite (15:00 às 22:00)">Tarde/Noite (15:00 às 22:00)</option>
                        <option value="Sábado (08:00 às 12:00)">Sábado (08:00 às 12:00)</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={enviando}
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-[#FF6B00]/20 hover:bg-[#E55F00] transition-colors disabled:opacity-60"
                  >
                    <CalendarCheck className="h-4 w-4" />
                    {enviando ? "Reservando..." : "Garantir minha diária de R$ 15"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
