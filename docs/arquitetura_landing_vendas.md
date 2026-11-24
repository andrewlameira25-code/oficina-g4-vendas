# Documentação Técnica: Landing Page de Conversão — Oficina G4 (`oficina-g4-vendas`)

## 1. Visão Geral
Projeto standalone (independente do painel administrativo `orbit-care-panel`) focado exclusivamente em **conversão de vendas** para a **Academia Oficina G4** (Belém - PA) e para a **Consultoria Online G4 (360°)**.

---

## 2. Stack e Arquitetura
- **Framework**: React 18 + TypeScript + Vite 5
- **Estilização**: Tailwind CSS 3 (Dark Performance `#09090B` + Laranja Oficial `#FF6B00`)
- **Ícones**: `lucide-react`
- **Hospedagem alvo**: Vercel (`vercel.json` já configurado para SPA)

---

## 3. Estrutura de Arquivos
- `src/lib/config.ts`: Fonte única de verdade para telefones WhatsApp, URL de Criação de Conta no Portal do Aluno (`https://g4-adm.vercel.app/cadastro`), acesso ao Portal (`https://g4-adm.vercel.app/portal/login`), endereço, horários e lista dos 6 planos presenciais.
- `src/lib/tracking.ts`: Camada de rastreamento de conversão preparada para **Meta Pixel (`fbq`)** e **Google Analytics (`gtag`)**, com eventos separados:
  - `Lead_Presencial`
  - `Lead_PreCadastro`
  - `Lead_Consultoria`
  - `Lead_WhatsApp_Flutuante`
- `src/App.tsx`: Página completa com 8 seções de funil (Hero, 4 Pilares, Diferenciais com fotos reais, 6 Planos Presenciais com dupla conversão, Consultoria Online 360°, Cultura/Autoridade, FAQ interativo, Localização/Horários + Barra fixa mobile).
- `public/images/`: Fotos oficiais otimizadas da Oficina G4 (`hero-g4.jpg`, `espaco.jpg`, `manutencao.jpg`, `suporte.jpg`, `evolucao.jpg`, `planos.jpg`).

---

## 4. Como Alterar Preços, Horários ou WhatsApp
Basta editar o arquivo `src/lib/config.ts` — todos os cards, links de WhatsApp com mensagem pré-preenchida e rodapé são atualizados automaticamente.

---

## 5. Como Publicar na Vercel (Custo R$ 0)
1. Subir a pasta `oficina-g4-vendas` para um repositório novo no GitHub (ex: `oficina-g4-vendas`).
2. Na Vercel, clicar em **Add New → Project**, selecionar o repositório e clicar em **Deploy** (Build Command: `npm run build`, Output Directory: `dist`).
3. Para ativar Meta Pixel ou Google Analytics, colar os scripts oficiais no `<head>` de `index.html` — os eventos de clique já serão disparados automaticamente por `src/lib/tracking.ts`.
