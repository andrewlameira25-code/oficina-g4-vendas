# 00 — Arquitetura e Landing Page de Vendas (Oficina G4)

> **Guia Mestre do Site Público (`oficina-g4-vendas`)**
> **URL Produção**: `https://oficina-g4-vendas.vercel.app`
> **Última atualização**: 27/11/2026

---

## 1. Arquitetura Técnica
- **Stack**: React 18, TypeScript, Vite 5 (multi-page build), Tailwind CSS, Lucide Icons.
- **Hospedagem**: Vercel com rewrites multi-page em `vercel.json` + `vite.config.ts`:
  - `/` → `index.html` (Landing Principal — Planos Presenciais, Consultoria Online, Calculadora IMC, Mural dos Embaixadores e Agendamento de Diária)
  - `/suplementos` → `suplementos.html` (Catálogo de Suplementos isolado, sem link no menu principal, com OpenGraph exclusivo)
  - `/embaixador` → `embaixador.html` (Landing Page isolada do Projeto Embaixador G4 — 1ª Turma, contador regressivo até 10/12/2026, vagas dinâmicas e formulário direto para WhatsApp)
- **Configuração Centralizada**: `src/lib/config.ts` (`G4_CONFIG`, `PLANOS_PRESENCIAIS`, `buildWhatsAppLink`).
- **Tracking de Conversão**: `src/lib/tracking.ts` (`trackConversion` disparando eventos de cliques em WhatsApp, Pré-Cadastro, Consultoria e Agendamento).

---

## 2. Estrutura e Regras de Conversão da Landing Principal (`src/App.tsx`)
1. **Hero (Topo)**:
   - Proposta de valor ("A G4 mudou. Atendimento de verdade e resultado real no seu treino"), CTAs para **Planos** e **Consultoria Online 360°**, selos de confiança e **faixa de Horários de Funcionamento visível já no topo** (`Seg–Sex: 06:30–12h e 15h–22h • Sáb: 08h–12h`).
2. **Diferenciais & Planos Presenciais**:
   - Dupla conversão por plano: **Criar Conta no Portal** (`https://g4-adm.vercel.app/cadastro?plano=...`) ou **Falar no WhatsApp**.
   - Planos exibidos: Trimestral (`3x R$ 60`), Família (`R$ 60`), Mensal (`R$ 70`), Quinzenal (`R$ 45`), Semanal (`R$ 30`) e Diária (`R$ 15`).
3. **Consultoria Online 360° (`#consultoria`)**:
   - **Preço Âncora em destaque**: **`R$ 80,00 / mês`** com selo **"Direto no WhatsApp"**.
   - **Regra de negócio**: valor de caixa separado (não entra no caixa/pré-cadastro da academia), por isso o botão direciona **exclusivamente para o WhatsApp** (`Quero a Consultoria por R$ 80/mês`).
4. **Calculadora de IMC & Gasto Calórico (`src/components/ImcCalculator.tsx`)**:
   - Ferramenta interativa para engajamento e captura de leads.
5. **Mural Dinâmico dos Embaixadores G4 (`src/components/MuralEmbaixadoresSection.tsx`)**:
   - Consome `GET https://orbit-care-backend.onrender.com/api/embaixadores/publico` (`no-store`), exibe foto, turma, nível, Instagram e botão direto com o cupom pessoal (`/cadastro?cupom=SEUNOME10`), ocultando-se automaticamente enquanto não houver embaixadores publicados.
6. **Agendamento de Visita / Diária (`src/components/AgendarVisitaSection.tsx`)**:
   - Exibe endereço, **card de Horários de Funcionamento** e formulário rápido com CTA **`"Garantir minha diária de R$ 15"`**.
   - Envia diretamente para `POST https://orbit-care-backend.onrender.com/api/visitas/publica` (caindo na aba **Visitas** do painel) + fallback de confirmação imediata no WhatsApp.
6. **Canais Oficiais & WhatsApp Unificado**:
   - Divulga **exclusivamente 1 número principal** em todo o site e rodapé: **`(91) 98764-2600`** (evitando dispersão de atendimento).

---

## 3. Documentos Relacionados e Próxima Iteração
- [01_PAGINA_SUPLEMENTOS_DINAMICA.md](./01_PAGINA_SUPLEMENTOS_DINAMICA.md) — Documentação completa da subpágina `/suplementos` integrada ao CMS do painel.
- **Pendência planejada (Item B)**: Adicionar 2 fotos reais na seção **Onde Estamos** (fachada com a Sorveteria Labom visível + vista do 2º andar) assim que forem disponibilizadas pela gestão.


## 4. Landing Page Isolada — Projeto Embaixador G4 (`/embaixador`)
- **URL Produção**: `https://oficina-g4-vendas.vercel.app/embaixador` (isolada do menu principal, com `embaixador.html` + OpenGraph exclusivo).
- **Componente**: `src/pages/EmbaixadorSalesPage.tsx` (10 seções completas: Hero com contador regressivo até `10/12/2026` e vagas ao vivo via `GET /api/embaixadores/publico`, O que é, Requisitos, 3 Passos, Níveis 1/2/3, Regras claras, Suporte G4 com Grupo VIP + Cupom/Link Exclusivo, Formulário de 7 campos enviando direto ao WhatsApp `(91) 98764-2600` com tela de agradecimento, FAQ e Rodapé).
