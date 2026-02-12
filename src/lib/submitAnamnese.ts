import type { UserData } from "@/pages/onboarding/constants";

// URL do Google Apps Script Web App - substitua pela sua URL após publicar o script
const WEBHOOK_URL = "";

export async function submitAnamnese(
  userData: UserData,
  resultClass: string,
  webhookUrl?: string
): Promise<{ success: boolean; error?: string }> {
  const url = webhookUrl || WEBHOOK_URL;

  // Se não há URL configurada, apenas loga no console
  if (!url) {
    console.log("⚠️ Webhook URL não configurada. Dados da anamnese:", serializeUserData(userData, resultClass));
    return { success: true };
  }

  try {
    const payload = serializeUserData(userData, resultClass);

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify(payload),
    });

    // Com mode: "no-cors" não temos acesso à resposta real,
    // mas se não houve exceção, consideramos sucesso
    return { success: true };
  } catch (error) {
    console.error("Erro ao enviar anamnese:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Erro desconhecido",
    };
  }
}

function serializeUserData(
  userData: UserData,
  resultClass: string
): Record<string, string> {
  const data: Record<string, string> = {
    data_envio: new Date().toLocaleString("pt-BR"),
    classe_oraculo: resultClass.toUpperCase(),
  };

  for (const [key, value] of Object.entries(userData)) {
    if (value === null || value === undefined) continue;
    if (value instanceof File) continue; // Ignora arquivos binários

    if (Array.isArray(value)) {
      data[key] = value.join(", ");
    } else {
      data[key] = String(value);
    }
  }

  return data;
}
