declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type LeadEventName =
  | "Lead_Presencial"
  | "Lead_PreCadastro"
  | "Lead_Consultoria"
  | "Lead_Embaixador"
  | "Lead_WhatsApp_Flutuante";

/**
 * Dispara eventos de conversão para Meta Pixel (fbq) e Google Analytics (gtag),
 * caso estejam configurados no index.html.
 */
export function trackConversion(eventName: LeadEventName, label: string) {
  try {
    if (typeof window.fbq === "function") {
      window.fbq("trackCustom", eventName, { content_name: label });
      window.fbq("track", "Lead", { content_name: `${eventName}: ${label}` });
    }
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "conversion",
        event_label: label,
      });
    }
  } catch {
    // Silencioso para nunca bloquear o clique do usuário
  }
}
