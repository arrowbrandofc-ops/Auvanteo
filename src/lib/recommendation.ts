/**
 * Lógica de recomendação do diagnóstico.
 * Regras comerciais fixas: Start desde 279 €, Business desde 499 €, Premium desde 799 €.
 * Loja/catálogo com vendas é sempre "À medida" (sob orçamento) — nunca prometemos
 * que um plano cobre ecommerce sem análise.
 */

export type Sector =
  | "remodelacoes"
  | "saude-bem-estar"
  | "restauracao"
  | "comercio-local"
  | "servicos-profissionais"
  | "outro";

export type Situacao = "sem-site" | "desatualizado" | "novo-projeto";
export type Objetivo = "orcamentos" | "apresentar" | "reservas" | "catalogo";
export type Orcamento = "ate-300" | "300-600" | "600-900" | "a-definir";
export type Prazo = "quando-conseguir" | "este-mes" | "1-3-meses";

export interface QuizAnswers {
  sector: Sector | null;
  situacao: Situacao | null;
  objetivo: Objetivo | null;
  orcamento: Orcamento | null;
  prazo: Prazo | null;
}

export type PlanId = "start" | "business" | "premium" | "a-medida";

export interface Recommendation {
  plan: PlanId;
  planName: string;
  priceNote: string;
  reason: string;
}

export const SECTOR_LABELS: Record<Sector, string> = {
  remodelacoes: "Remodelações e construção",
  "saude-bem-estar": "Saúde e bem-estar",
  restauracao: "Restauração",
  "comercio-local": "Comércio local",
  "servicos-profissionais": "Serviços profissionais",
  outro: "Outro",
};

export const SITUACAO_LABELS: Record<Situacao, string> = {
  "sem-site": "Ainda não tenho website",
  desatualizado: "Tenho um website, mas está desatualizado",
  "novo-projeto": "Quero um novo projeto do zero",
};

export const OBJETIVO_LABELS: Record<Objetivo, string> = {
  orcamentos: "Receber pedidos de orçamento",
  apresentar: "Apresentar os meus serviços",
  reservas: "Receber reservas ou marcações",
  catalogo: "Mostrar um catálogo ou vender online",
};

export const ORCAMENTO_LABELS: Record<Orcamento, string> = {
  "ate-300": "Até 300 €",
  "300-600": "300 € a 600 €",
  "600-900": "600 € a 900 €",
  "a-definir": "A definir",
};

export const PRAZO_LABELS: Record<Prazo, string> = {
  "quando-conseguir": "Quando conseguir",
  "este-mes": "Este mês",
  "1-3-meses": "Entre 1 a 3 meses",
};

export function recommend(a: QuizAnswers): Recommendation {
  if (a.objetivo === "catalogo") {
    return {
      plan: "a-medida",
      planName: "À medida",
      priceNote: "Sob orçamento",
      reason:
        "Um catálogo com vendas online tem um âmbito próprio e é orçamentado separadamente. Analisamos o seu caso e apresentamos uma proposta fechada antes de qualquer compromisso.",
    };
  }
  if (a.orcamento === "600-900") {
    return {
      plan: "premium",
      planName: "Premium",
      priceNote: "desde 799 €",
      reason:
        "O seu orçamento estimado permite uma estrutura alargada e maior detalhe de design. O âmbito exato é definido em proposta.",
    };
  }
  if (a.orcamento === "300-600") {
    return {
      plan: "business",
      planName: "Business",
      priceNote: "desde 499 €",
      reason:
        "O plano Business (até 5 páginas, design personalizado) enquadra-se no seu orçamento estimado e cobre a maioria das necessidades de uma empresa com vários serviços.",
    };
  }
  if (a.orcamento === "ate-300") {
    if (a.objetivo === "apresentar") {
      return {
        plan: "start",
        planName: "Start",
        priceNote: "desde 279 €",
        reason:
          "Para apresentar os seus serviços de forma clara, uma página bem estruturada (plano Start) é suficiente e enquadra-se no seu orçamento estimado.",
      };
    }
    return {
      plan: "business",
      planName: "Business",
      priceNote: "desde 499 €",
      reason:
        "O seu objetivo pede mais do que uma única página. O plano Business é o ponto de partida mais provável, embora exceda o orçamento que indicou. O valor final é sempre confirmado em proposta, sem compromisso.",
    };
  }
  // Orçamento "a definir" (ou por preencher)
  if (a.objetivo === "apresentar" && a.situacao !== "desatualizado") {
    return {
      plan: "start",
      planName: "Start",
      priceNote: "desde 279 €",
      reason:
        "Para começar a apresentar os seus serviços, uma página bem estruturada (plano Start) é o passo mais simples. Se precisar de mais páginas, a proposta reflete isso.",
    };
  }
  return {
    plan: "business",
    planName: "Business",
    priceNote: "desde 499 €",
    reason:
      "Com vários conteúdos e objetivos, o plano Business (até 5 páginas) é o ponto de partida mais equilibrado. O âmbito e o valor final são confirmados em proposta, sem compromisso.",
  };
}

/** Texto da mensagem gerada a partir das respostas (sem dados pessoais obrigatórios). */
export function buildQuizMessage(
  a: QuizAnswers,
  rec: Recommendation,
  extras: { nome?: string; contacto?: string; utmSource?: string | null },
): string {
  const lines = [
    "Olá AUVANTEO! Fiz o diagnóstico no vosso website e gostava de falar sobre a recomendação.",
    `Setor: ${a.sector ? SECTOR_LABELS[a.sector] : "—"}`,
    `Situação atual: ${a.situacao ? SITUACAO_LABELS[a.situacao] : "—"}`,
    `Objetivo: ${a.objetivo ? OBJETIVO_LABELS[a.objetivo] : "—"}`,
    `Orçamento estimado: ${a.orcamento ? ORCAMENTO_LABELS[a.orcamento] : "—"}`,
    `Prazo: ${a.prazo ? PRAZO_LABELS[a.prazo] : "—"}`,
    `Recomendação indicada: ${rec.planName} (${rec.priceNote})`,
  ];
  if (extras.nome?.trim()) lines.push(`Nome comercial: ${extras.nome.trim()}`);
  if (extras.contacto?.trim()) lines.push(`Contacto preferido: ${extras.contacto.trim()}`);
  if (extras.utmSource) lines.push(`Origem da visita: ${extras.utmSource}`);
  return lines.join("\n");
}
