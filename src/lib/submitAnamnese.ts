import type { UserData } from "@/pages/onboarding/constants";
import { supabase } from "@/integrations/supabase/client";

export async function submitAnamnese(
  userData: UserData,
  resultClass: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return { success: false, error: "Usuário não autenticado" };

    // 1. Update profile with onboarding data
    const { error: profileError } = await supabase
      .from("profiles")
      .update({
        nome: userData.nome,
        email: userData.email,
        telefone: userData.telefone,
        nascimento: userData.nascimento,
        cpf: userData.cpf,
        cidade_estado: userData.cidade_estado,
        sexo: userData.sexo,
        faixa_etaria: userData.faixa_etaria,
        altura: userData.altura,
        peso: userData.peso,
        tempo_acompanha: userData.tempo_acompanha,
        fatores_escolha: userData.fatores_escolha,
        indicacao: userData.indicacao,
        indicacao_nome: userData.indicacao_nome,
        indicacao_telefone: userData.indicacao_telefone,
        classe: resultClass as any,
        onboarded: true,
      })
      .eq("id", user.id);

    if (profileError) throw profileError;

    // 2. Insert anamnese with all extra data
    const dadosExtras: Record<string, any> = {};
    const skipKeys = new Set([
      "nome", "email", "telefone", "nascimento", "cpf", "cidade_estado",
      "sexo", "faixa_etaria", "altura", "peso", "tempo_acompanha",
      "fatores_escolha", "indicacao", "indicacao_nome", "indicacao_telefone",
    ]);

    for (const [key, value] of Object.entries(userData)) {
      if (skipKeys.has(key)) continue;
      if (value === null || value === undefined || value === "") continue;
      if (value instanceof File) continue;
      dadosExtras[key] = value;
    }

    const { error: anamneseError } = await supabase
      .from("anamnese")
      .insert({
        user_id: user.id,
        objetivo: userData.objetivo || userData.objetivo_outro || null,
        local_treino: userData.local_treino || null,
        frequencia_treino: userData.frequencia || null,
        experiencia_treino: userData.pratica_musculacao || null,
        equipamentos: userData.maquinas_casa || null,
        lesoes: userData.tem_dor === "sim" ? userData.descricao_dor : null,
        condicoes_saude: userData.doencas?.join(", ") || null,
        medicamentos: userData.medicamentos || null,
        restricoes_alimentares: userData.restricoes?.join(", ") || null,
        dieta_atual: userData.calorias || null,
        suplementos: userData.suplementos?.join(", ") || null,
        agua_diaria: userData.agua || null,
        sono_horas: userData.horario_sono || null,
        nivel_estresse: userData.qualidade_sono || null,
        ocupacao: null,
        disponibilidade_treino: userData.dias_semana?.join(", ") || null,
        motivacao: userData.fatores_escolha || null,
        dados_extras: dadosExtras,
      });

    if (anamneseError) throw anamneseError;

    return { success: true };
  } catch (error: any) {
    console.error("Erro ao salvar anamnese:", error);
    return {
      success: false,
      error: error.message || "Erro desconhecido",
    };
  }
}
