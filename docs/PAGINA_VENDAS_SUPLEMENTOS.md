# Subpágina Isolada de Vendas de Suplementos (`/suplementos`)

## Visão Geral
- **Rota**: `/suplementos` (roteamento isolado em `src/main.tsx`, **sem link** no menu principal da página inicial da academia).
- **Componente**: `src/pages/SuplementosSalesPage.tsx`.
- **Sincronização de Estoque**: Consulta `GET https://g4-adm.vercel.app/api/produtos/publico` para adaptar automaticamente os botões:
  - Estoque `0` → **`🔔 AVISE-ME QUANDO CHEGAR`** (WhatsApp lista de espera).
  - Estoque `1` → badge vermelho pulsante **`⚠️ ÚLTIMA UNIDADE`**.
  - Estoque `> 1` → **`RESERVAR NO WHATSAPP`**.

## Estrutura
1. Hero exclusivo de suplementos G4.
2. **Seção 1 — Creatinas** (5 opções com ancoragem de preço por dose: R$ 0,90/dose na Dark Lab 1kg vs R$ 1,66/dose na de 300g).
3. **Seção 2 — Energia e Foco** (Maca Peruana Snake Dragon 120 cáps + Pré-Treino Nuclear Rush).
4. **Seção 3 — Massa e Recuperação** (Whey Protein Concentrado 1kg + Integralmédica Creamass 3kg).
5. **Seção 4 — Acessórios** (Coqueteleira Meme, Luva Silicone Anti-calo, Camiseta Dry Fit Alpha).
6. **Seção 5 — Combos Estratégicos** (Iniciante, Força Total, Massa Monstro, Performance G4 + bônus Avaliação Física).
7. **Seção 6 — FAQ Interativo** (7 objeções do Protocolo G4) + CTA Final direto para o WhatsApp do Leonidas `(91) 98764-2600`.
