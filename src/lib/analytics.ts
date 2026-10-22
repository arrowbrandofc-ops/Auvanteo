/**
 * Instrumentação preparada para GA4/Pixel futuro.
 *
 * NESTE MOMENTO NÃO HÁ TRACKING ATIVO: nenhum script de analytics é carregado
 * e nenhum cookie é definido. Os eventos só são empurrados para window.dataLayer
 * se esse array já existir (ou seja, se o proprietário instalar GA4/GTM no futuro).
 * Até lá, estas chamadas são no-op. Não enviamos dados pessoais nos eventos.
 */

export type AnalyticsEvent =
  "quiz_started" | "quiz_completed" | "lead_contact_clicked" | "plan_selected";

export function trackEvent(event: AnalyticsEvent, params?: Record<string, string>) {
  if (typeof window === "undefined") return;
  const dl = (window as unknown as { dataLayer?: unknown[] }).dataLayer;
  if (Array.isArray(dl)) dl.push({ event, ...params });
}

/** Lê utm_source do URL atual (apenas leitura; nada é gravado sem consentimento). */
export function readUtmSource(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return new URLSearchParams(window.location.search).get("utm_source");
  } catch {
    return null;
  }
}
