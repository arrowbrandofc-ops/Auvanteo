export const INSTAGRAM_URL = "https://www.instagram.com/auvanteo/";
export const INSTAGRAM_DM_URL = "https://ig.me/m/auvanteo";
export const WHATSAPP_MESSAGE = "Olá! Gostava de pedir um orçamento para um website AUVANTEO.";

/**
 * Número comercial confirmado da AUVANTEO (Brasil, DDI +55), apenas dígitos.
 * É um contacto público — não é segredo.
 */
export const DEFAULT_BUSINESS_WHATSAPP_NUMBER = "5537998376553";
/** Formato legível para apresentar no site. */
export const WHATSAPP_DISPLAY_NUMBER = "+55 (37) 99837-6553";

/**
 * Número a usar: VITE_WHATSAPP_NUMBER quando definida e não vazia;
 * caso contrário, o número comercial por defeito. Uma variável vazia
 * conta como ausente.
 */
export function resolveWhatsAppNumber(raw: string | undefined | null): string {
  const trimmed = raw?.trim() ?? "";
  return trimmed.length > 0 ? trimmed : DEFAULT_BUSINESS_WHATSAPP_NUMBER;
}

/**
 * Builds the wa.me link from a raw number. Returns null when the number is
 * missing or invalid, so the UI never links to a placeholder/wrong number.
 */
export function buildWhatsAppLink(raw: string | undefined | null, message = WHATSAPP_MESSAGE) {
  if (!raw) return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 9 || digits.length > 15) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const whatsappNumber = resolveWhatsAppNumber(
  import.meta.env["VITE_WHATSAPP_NUMBER"] as string | undefined,
);
export const whatsappLink = buildWhatsAppLink(whatsappNumber);

/** Mensagem do formulário de contactos; omite campos vazios (mensagem genérica válida). */
export function buildQuoteMessage(f: {
  nome: string;
  negocio: string;
  plano: string;
  detalhes: string;
}) {
  const lines = ["Olá AUVANTEO! Gostava de pedir uma proposta para um website."];
  if (f.nome.trim()) lines.push(`Nome: ${f.nome.trim()}`);
  if (f.negocio.trim()) lines.push(`Negócio: ${f.negocio.trim()}`);
  lines.push(`Plano: ${f.plano}`);
  if (f.detalhes.trim()) lines.push(`O que preciso: ${f.detalhes.trim()}`);
  return lines.join("\n");
}
