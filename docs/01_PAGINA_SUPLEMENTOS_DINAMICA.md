# 01 — Página de Suplementos 100% Dinâmica (`/suplementos`)

> **URL Produção**: `https://oficina-g4-vendas.vercel.app/suplementos`
> **Componente**: `src/pages/SuplementosSalesPage.tsx`
> **Última atualização**: 27/11/2026

---

## 1. Isolamento e Compartilhamento (OpenGraph Exclusivo)
- A página `/suplementos` é **isolada do menu principal** da landing page para divulgação direta em campanhas, grupos de alunos e WhatsApp.
- Possui entrada HTML dedicada (`suplementos.html`) configurada no `vite.config.ts` e `vercel.json` com meta tags OpenGraph exclusivas e imagem dedicada (`public/images/og-suplementos.jpg`), garantindo preview de suplementos ao colar o link no WhatsApp/Instagram.
- Comunicação institucional padronizada para **recepção / atendentes / professores** (sem nomes pessoais).

---

## 2. Integração 100% Dinâmica com o CMS do Painel (`orbit-care-panel`)
- **Fonte Única da Verdade**: `GET https://orbit-care-backend.onrender.com/api/produtos/publico` (com `cache: "no-store"`, refresh automático a cada 60s e ao retornar foco para a aba).
- **Zero código para gerenciar catálogo**:
  - Não existem listas estáticas de produtos no frontend.
  - Todo produto ativo com `exibirNoSite !== false` cadastrado no painel aparece automaticamente agrupado por `secaoSite` (`creatinas`, `energia`, `massa`, `acessorios`, `combos`, `outros`) e ordenado por `ordemSite`.
  - Seções vazias são ocultadas automaticamente (inclusive no menu superior da página).
- **Recursos renderizados dinamicamente**:
  - Selo **`● Estoque Ao Vivo`** no Hero.
  - Fotos via Base64 (enviadas pelo recorte do painel), URL relativa (`/images/suplementos/...`) ou URL externa, com placeholder limpo se não houver foto.
  - **Status de Estoque Automático**:
    - `estoque_atual <= 0`: badge `LISTA DE ESPERA` + botão amarelo **"Avise-me quando chegar"** (WhatsApp).
    - `estoque_atual === 1`: badge pulsante `⚠️ ÚLTIMA UNIDADE` + botão vermelho **"Garantir Última Unidade"**.
    - `estoque_atual > 1`: botão laranja **"Reservar no WhatsApp"**.
  - **Combos Estratégicos**: exibem preço avulso riscado (`precoAvulsoCombo` ou soma dos itens), preço do combo em destaque, badge automática de **`Economia de R$ X,XX`** e lista dos itens inclusos.
- **Direcionamento**: todos os botões de reserva/lista de espera abrem mensagem pré-preenchida no WhatsApp principal **`(91) 98764-2600`**.
