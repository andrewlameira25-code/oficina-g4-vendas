export const G4_CONFIG = {
  nome: "Oficina G4",
  instagramHandle: "@oficinag4_belem1",
  instagramUrl: "https://instagram.com/oficinag4_belem1",
  whatsappPrincipal: "5591987642600",
  whatsappPrincipalFormatado: "(91) 98764-2600",
  whatsappSecundario: "5591996146442",
  whatsappSecundarioFormatado: "(91) 99614-6442",
  preCadastroUrl: "https://g4-adm.vercel.app/cadastro",
  portalLoginUrl: "https://g4-adm.vercel.app/portal/login",
  endereco: "Av. São Pedro — em cima da Sorveteria Labom — Coqueiro, Belém - PA",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Av+Sao+Pedro+Sorveteria+Labom+Coqueiro+Belem+PA",
  horarios: [
    { dia: "Segunda a Sexta (Manhã)", hora: "06:30 às 12:00" },
    { dia: "Segunda a Sexta (Tarde/Noite)", hora: "15:00 às 22:00" },
    { dia: "Sábado", hora: "08:00 às 12:00" },
    { dia: "Domingo", hora: "Fechado" },
  ],
} as const;

export function buildWhatsAppLink(mensagem: string, numero: string = G4_CONFIG.whatsappPrincipal) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

export interface PlanoItem {
  id: string;
  nome: string;
  preco: string;
  subtitulo: string;
  destaque?: string;
  featured?: boolean;
  beneficios: string[];
  mensagemWhatsApp: string;
}

export const PLANOS_PRESENCIAIS: PlanoItem[] = [
  {
    id: "trimestral",
    nome: "Trimestral",
    preco: "3x R$ 60,00",
    subtitulo: "Melhor custo-benefício • Economize R$ 30",
    destaque: "MAIS VANTAJOSO",
    featured: true,
    beneficios: [
      "Musculação + Cardio liberados",
      "Acompanhamento com professores no salão",
      "Acesso ao Portal do Aluno no celular",
      "Economia garantida por 3 meses",
    ],
    mensagemWhatsApp:
      "Olá! Vi o site da Oficina G4 e quero garantir o Plano Trimestral (3x R$ 60,00). Como faço para começar?",
  },
  {
    id: "familia",
    nome: "Família",
    preco: "R$ 60,00",
    subtitulo: "Por pessoa / mês • Treine junto e economize",
    destaque: "TREINE JUNTO",
    featured: true,
    beneficios: [
      "Valor especial por integrante da família",
      "Musculação + Cardio completos",
      "Professores atentos para iniciantes e avançados",
      "Portal do Aluno individual no celular",
    ],
    mensagemWhatsApp:
      "Olá! Vi o site da Oficina G4 e tenho interesse no Plano Família (R$ 60,00 por pessoa). Pode me explicar como funciona?",
  },
  {
    id: "mensal",
    nome: "Mensal",
    preco: "R$ 70,00",
    subtitulo: "Liberdade total mês a mês",
    beneficios: [
      "Sem fidelidade ou multa de cancelamento",
      "Musculação + Cardio completos",
      "Acesso ao Portal do Aluno digital",
      "Suporte diário dos professores",
    ],
    mensagemWhatsApp:
      "Olá! Vi o site da Oficina G4 e quero fechar o Plano Mensal (R$ 70,00). Como faço minha matrícula?",
  },
  {
    id: "quinzenal",
    nome: "Quinzenal",
    preco: "R$ 45,00",
    subtitulo: "15 dias de acesso livre",
    beneficios: [
      "Ideal para temporada curta ou viagens",
      "Musculação + Cardio inclusos",
      "Atendimento completo no salão",
    ],
    mensagemWhatsApp:
      "Olá! Vi o site da Oficina G4 e quero informações sobre o Plano Quinzenal (R$ 45,00).",
  },
  {
    id: "semanal",
    nome: "Semanal",
    preco: "R$ 30,00",
    subtitulo: "7 dias para sentir a evolução",
    beneficios: [
      "Ótimo para testar a rotina na G4",
      "Musculação + Cardio inclusos",
      "Aparelhos revisados diariamente",
    ],
    mensagemWhatsApp:
      "Olá! Vi o site da Oficina G4 e gostaria de fazer o Plano Semanal (R$ 30,00).",
  },
  {
    id: "diaria",
    nome: "Diária",
    preco: "R$ 15,00",
    subtitulo: "Venha conhecer a estrutura na prática",
    beneficios: [
      "Treino avulso sem compromisso",
      "Conheça o espaço ampliado e a equipe",
      "Musculação + Cardio liberados no dia",
    ],
    mensagemWhatsApp:
      "Olá! Vi o site da Oficina G4 e quero agendar uma Diária (R$ 15,00) para conhecer a academia!",
  },
];
