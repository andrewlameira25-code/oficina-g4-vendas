import { useEffect, useState } from "react";
import { Award, ExternalLink, Instagram, Sparkles } from "lucide-react";
import { G4_CONFIG } from "../lib/config";

interface EmbaixadorPublico {
  id: string;
  nome: string;
  turma: string;
  nivelAtual: number;
  cupomCodigo: string;
  instagramHandle?: string;
  bioPublica?: string;
  fotoPublicaUrl?: string | null;
}

const API_EMBAIXADORES_PUBLICO = "https://orbit-care-backend.onrender.com/api/embaixadores/publico";

export function MuralEmbaixadoresSection() {
  const [lista, setLista] = useState<EmbaixadorPublico[]>([]);

  useEffect(() => {
    fetch(API_EMBAIXADORES_PUBLICO, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((json) => {
        if (Array.isArray(json?.data)) {
          setLista(json.data);
        }
      })
      .catch(() => {});
  }, []);

  if (lista.length === 0) return null;

  return (
    <section id="embaixadores" className="border-t border-white/10 bg-[#09090B] py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            <Award className="h-4 w-4" />
            Comunidade Oficial • Time G4
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl">
            Mural dos Embaixadores G4
          </h2>
          <p className="mt-3 text-sm text-zinc-400 sm:text-base">
            Conheça quem representa a cultura da Oficina G4 todos os dias. Use o cupom de um embaixador na matrícula e ganhe desconto especial!
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {lista.map((emb) => {
            const igClean = (emb.instagramHandle || "").replace(/^@/, "");
            const cadastroComCupom = emb.cupomCodigo
              ? `${G4_CONFIG.preCadastroUrl}?cupom=${encodeURIComponent(emb.cupomCodigo)}`
              : G4_CONFIG.preCadastroUrl;

            return (
              <div
                key={emb.id}
                className="rounded-2xl border border-white/10 bg-[#121216] p-5 flex flex-col justify-between gap-4 hover:border-[#FF6B00]/50 transition-colors"
              >
                <div className="flex items-start gap-3.5">
                  {emb.fotoPublicaUrl ? (
                    <img
                      src={emb.fotoPublicaUrl}
                      alt={emb.nome}
                      loading="lazy"
                      className="h-14 w-14 rounded-full object-cover border-2 border-[#FF6B00]/60 shrink-0"
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-[#FF6B00]/15 border border-[#FF6B00]/40 flex items-center justify-center font-display text-xl font-bold text-[#FF6B00] shrink-0">
                      {(emb.nome || "G").charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="min-w-0">
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#FF6B00]/15 px-2 py-0.5 text-[10px] font-bold uppercase text-[#FF6B00]">
                      <Sparkles className="h-2.5 w-2.5" /> {emb.turma}
                      {emb.nivelAtual > 0 ? ` • Nível ${emb.nivelAtual}` : ""}
                    </span>
                    <h3 className="mt-1 text-base font-bold text-white truncate">{emb.nome}</h3>
                    {igClean && (
                      <a
                        href={`https://instagram.com/${igClean}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-[#FF6B00]"
                      >
                        <Instagram className="h-3 w-3 text-pink-400" /> @{igClean}
                      </a>
                    )}
                  </div>
                </div>

                {emb.bioPublica && (
                  <p className="text-xs leading-relaxed text-zinc-300">{emb.bioPublica}</p>
                )}

                {emb.cupomCodigo && (
                  <a
                    href={cadastroComCupom}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#FF6B00]/40 bg-[#FF6B00]/10 hover:bg-[#FF6B00] py-2.5 px-4 text-xs font-extrabold uppercase tracking-wide text-[#FF6B00] hover:text-white transition-colors"
                  >
                    Usar Cupom {emb.cupomCodigo}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
