import { useState } from "react";
import { Calculator, Flame, Sparkles, ArrowRight } from "lucide-react";
import { buildWhatsAppLink } from "../lib/config";
import { trackConversion } from "../lib/tracking";

export function ImcCalculator() {
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState<"M" | "F">("M");
  const [atividade, setAtividade] = useState("1.375");
  const [resultado, setResultado] = useState<{
    imc: number;
    classificacao: string;
    cor: string;
    kcalManutencao: number;
    kcalEmagrecimento: number;
    kcalHipertrofia: number;
    recomendacao: string;
  } | null>(null);

  const calcular = (e: React.FormEvent) => {
    e.preventDefault();
    const p = Number(peso.replace(",", "."));
    const aCm = Number(altura.replace(",", "."));
    const id = Number(idade);
    if (!p || !aCm || !id || p < 30 || aCm < 100 || id < 12) return;

    const aM = aCm / 100;
    const imc = p / (aM * aM);
    const tmb =
      sexo === "M"
        ? 10 * p + 6.25 * aCm - 5 * id + 5
        : 10 * p + 6.25 * aCm - 5 * id - 161;
    const kcalManutencao = Math.round(tmb * Number(atividade));

    let classificacao = "Peso Adequado";
    let cor = "text-emerald-400";
    let recomendacao =
      "Você está em uma ótima faixa para focar em definição e ganho de massa magra com musculação orientada.";

    if (imc < 18.5) {
      classificacao = "Abaixo do Peso";
      cor = "text-sky-400";
      recomendacao =
        "Nosso foco ideal para você é Hipertrofia + Protocolo Alimentar com superávit calórico controlado.";
    } else if (imc >= 25 && imc < 30) {
      classificacao = "Sobrepeso";
      cor = "text-amber-400";
      recomendacao =
        "A combinação de Musculação + Cardio inteligente na Oficina G4 (ou Consultoria Online 360°) acelera muito a perda de gordura preservando massa magra.";
    } else if (imc >= 30) {
      classificacao = "Obesidade";
      cor = "text-rose-400";
      recomendacao =
        "Recomendamos começar com acompanhamento próximo dos nossos professores + Anamnese na Consultoria Online 360° para emagrecer com saúde e segurança.";
    }

    setResultado({
      imc: Number(imc.toFixed(1)),
      classificacao,
      cor,
      kcalManutencao,
      kcalEmagrecimento: Math.max(1200, kcalManutencao - 400),
      kcalHipertrofia: kcalManutencao + 300,
      recomendacao,
    });
  };

  return (
    <section id="calculadora" className="border-t border-white/10 bg-[#0D0D11] py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#FF6B00]">
            <Calculator className="h-4 w-4" />
            Ferramenta Gratuita Oficina G4
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold uppercase text-white sm:text-4xl">
            Calcule seu IMC e Gasto Calórico Diário
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Descubra em 10 segundos sua meta calórica para emagrecimento ou hipertrofia.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-12">
          <form
            onSubmit={calcular}
            className="space-y-4 rounded-2xl border border-white/10 bg-[#141419] p-6 lg:col-span-6"
          >
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  placeholder="Ex: 78"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300">Altura (cm)</label>
                <input
                  type="number"
                  required
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  placeholder="Ex: 175"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-zinc-300">Idade</label>
                <input
                  type="number"
                  required
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                  placeholder="Ex: 28"
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-semibold text-zinc-300">Sexo</label>
                <select
                  value={sexo}
                  onChange={(e) => setSexo(e.target.value as "M" | "F")}
                  className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-zinc-300">Nível de Atividade Atual</label>
              <select
                value={atividade}
                onChange={(e) => setAtividade(e.target.value)}
                className="mt-1 w-full rounded-xl border border-white/10 bg-[#09090B] px-3 py-2.5 text-sm text-white focus:border-[#FF6B00] focus:outline-none"
              >
                <option value="1.2">Sedentário (sem treinar)</option>
                <option value="1.375">Leve (1 a 3x por semana)</option>
                <option value="1.55">Moderado (3 a 5x por semana)</option>
                <option value="1.725">Intenso (6 a 7x por semana)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#FF6B00] px-6 py-3.5 text-sm font-extrabold uppercase tracking-wide text-white shadow-lg shadow-[#FF6B00]/20 hover:bg-[#E55F00] transition-colors"
            >
              <Flame className="h-4 w-4" />
              Calcular Meu Resultado
            </button>
          </form>

          <div className="flex flex-col justify-center rounded-2xl border border-white/10 bg-[#141419] p-6 lg:col-span-6">
            {!resultado ? (
              <div className="text-center space-y-2 py-8">
                <Calculator className="mx-auto h-10 w-10 text-[#FF6B00]/60" />
                <p className="text-sm font-semibold text-zinc-300">Preencha seus dados ao lado</p>
                <p className="text-xs text-zinc-500">
                  Vamos calcular seu IMC e sua faixa ideal de calorias para emagrecer ou ganhar massa muscular.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-zinc-400">Seu IMC</span>
                    <p className="font-display text-4xl font-bold text-white">{resultado.imc}</p>
                  </div>
                  <span className={`rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold ${resultado.cor}`}>
                    {resultado.classificacao}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-xl bg-[#09090B] p-3 border border-white/5">
                    <span className="block text-[10px] uppercase text-zinc-400">Emagrecer</span>
                    <strong className="text-sm text-emerald-400">{resultado.kcalEmagrecimento} kcal</strong>
                  </div>
                  <div className="rounded-xl bg-[#09090B] p-3 border border-white/5">
                    <span className="block text-[10px] uppercase text-zinc-400">Manter</span>
                    <strong className="text-sm text-white">{resultado.kcalManutencao} kcal</strong>
                  </div>
                  <div className="rounded-xl bg-[#09090B] p-3 border border-white/5">
                    <span className="block text-[10px] uppercase text-zinc-400">Hipertrofia</span>
                    <strong className="text-sm text-[#FF6B00]">{resultado.kcalHipertrofia} kcal</strong>
                  </div>
                </div>

                <p className="text-xs leading-relaxed text-zinc-300">{resultado.recomendacao}</p>

                <div className="flex flex-col gap-2 sm:flex-row pt-1">
                  <a
                    href={buildWhatsAppLink(
                      `Olá! Fiz o cálculo no site da Oficina G4 (IMC ${resultado.imc} — ${resultado.classificacao}, meta ~${resultado.kcalEmagrecimento} a ${resultado.kcalManutencao} kcal) e quero saber sobre a Consultoria Online 360°!`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackConversion("Lead_Consultoria", "Calculadora_IMC")}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#FF6B00] px-4 py-3 text-xs font-extrabold uppercase text-white hover:bg-[#E55F00]"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Consultoria 360°
                  </a>
                  <a
                    href="#planos"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-bold uppercase text-white hover:border-[#FF6B00]"
                  >
                    Ver Planos <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
