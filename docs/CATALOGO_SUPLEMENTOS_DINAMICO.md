# Catálogo Dinâmico de Suplementos (100% Gerenciado pelo Painel)

## O que mudou em `src/pages/SuplementosSalesPage.tsx`
- Removidos todos os arrays estáticos (`CREATINAS`, `ENERGIA_FOCO`, `MASSA_RECUPERACAO`, `ACESSORIOS`, `COMBOS`).
- A página consome `GET https://orbit-care-backend.onrender.com/api/produtos/publico` (`cache: "no-store"`, refresh a cada 60s e ao focar a aba) e monta automaticamente todas as seções com base em `secaoSite`, `ordemSite` e `exibirNoSite`.
- Qualquer produto novo, foto, descrição, selo, preço, estoque ou combo alterado no painel `orbit-care-panel` aparece automaticamente em `/suplementos` sem mexer no código.
