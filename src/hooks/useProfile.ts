import { useQuery } from "@tanstack/react-query";

const MOCK_PROFILE = {
  id: "mock-user-001",
  nome: "Marcus Aurelius",
  email: "guerreiro@shapeinsano.com",
  telefone: "(61) 99999-9999",
  nascimento: "1995-03-15",
  cpf: "000.000.000-00",
  cidade_estado: "Brasília/DF",
  sexo: "masculino",
  faixa_etaria: "25-30",
  altura: "178",
  peso: "82",
  classe: "gladius" as const,
  onboarded: true,
  created_at: new Date().toISOString(),
  avatar_url: null,
  tempo_acompanha: null,
  fatores_escolha: null,
  indicacao: null,
  indicacao_nome: null,
  indicacao_telefone: null,
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile", "mock-user-001"],
    queryFn: async () => MOCK_PROFILE,
    staleTime: Infinity,
  });
};
