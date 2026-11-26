# Atualização de Conversão (A, C, D, E) e Sincronização de Estoque Real-Time

## Melhorias Aplicadas no Site Principal (`src/App.tsx` e `src/components/AgendarVisitaSection.tsx`)
1. **A) Preço Âncora na Consultoria Online**: Adicionado bloco em destaque com **`R$ 80,00 / mês`** e selo **"Direto no WhatsApp"** (fechamento exclusivo via WhatsApp, sem integração com o caixa/pré-cadastro da academia).
2. **C) Horários em Destaque**: Exibidos já no **Hero (topo do site)** e dentro do card **Agende sua Visita**, além do rodapé (`Seg–Sex: 06:30–12h e 15h–22h • Sáb: 08h–12h`).
3. **D) WhatsApp Unificado**: Removida a exibição duplicada do segundo número no rodapé, mantendo exclusivamente o WhatsApp oficial **`(91) 98764-2600`**.
4. **E) CTA Forte + Endpoint Real de Agendamento**:
   - CTA do formulário alterado para **`"Garantir minha diária de R$ 15"`**.
   - Endpoint corrigido de `https://g4-adm.vercel.app/api/visitas/publica` para **`https://orbit-care-backend.onrender.com/api/visitas/publica`**.

## Sincronização de Estoque em Tempo Real (`src/pages/SuplementosSalesPage.tsx`)
- Endpoint corrigido para **`https://orbit-care-backend.onrender.com/api/produtos/publico`** com `cache: "no-store"`, atualização automática a cada 60s e ao focar a aba.
- Corrigido o matching de todos os 12 produtos (incluindo `CREATINA ULTRA 300G FTW` e `COQUELEIRA MEME 500ML` / `coqueteleira`), sincronizando **estoque atual e preço de venda** em tempo real.
- Adicionado selo visual **`● Estoque Ao Vivo`** no topo do catálogo.

## Pendente (Próxima Iteração)
- **Item B (Fotos da Fachada e 2º Andar)**: aguardando envio das 2 fotos reais pela gestão.
