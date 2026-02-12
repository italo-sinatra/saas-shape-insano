export type Step =
  | "welcome"
  | "cadastro"
  | "fotos"
  | "objetivo"
  | "treino"
  | "academia"
  | "saude"
  | "nutricional"
  | "estilo_vida"
  | "quiz"
  | "result"
  | "ignite";

export const steps: Step[] = [
  "welcome", "cadastro", "fotos", "objetivo", "treino",
  "academia", "saude", "nutricional", "estilo_vida",
  "quiz", "result", "ignite",
];

export const stepLabels: Record<Step, string> = {
  welcome: "Início",
  cadastro: "Cadastro",
  fotos: "Fotos",
  objetivo: "Objetivo",
  treino: "Treino",
  academia: "Academia",
  saude: "Saúde",
  nutricional: "Nutrição",
  estilo_vida: "Estilo de Vida",
  quiz: "Oráculo",
  result: "Classe",
  ignite: "Chama",
};

export const quizQuestions = [
  {
    question: "Como você prefere iniciar seu dia?",
    options: [
      { text: "Com uma sessão intensa de exercícios pesados", class: "centurio" },
      { text: "Com uma corrida ao ar livre ou treino funcional", class: "velite" },
      { text: "Com um treino estruturado focado em cada músculo", class: "gladius" },
    ],
  },
  {
    question: "O que te motiva a treinar?",
    options: [
      { text: "Quero ficar mais forte e levantar mais peso", class: "centurio" },
      { text: "Quero ter mais resistência e agilidade", class: "velite" },
      { text: "Quero um corpo definido e estético", class: "gladius" },
    ],
  },
  {
    question: "Qual seu treino ideal?",
    options: [
      { text: "Agachamento, terra e supino pesados", class: "centurio" },
      { text: "HIIT, sprints e circuitos", class: "velite" },
      { text: "Séries focadas com tempo sob tensão", class: "gladius" },
    ],
  },
  {
    question: "Em uma batalha, qual seria seu papel?",
    options: [
      { text: "Na linha de frente quebrando escudos", class: "centurio" },
      { text: "Flanqueando o inimigo com velocidade", class: "velite" },
      { text: "Lutando com técnica e precisão", class: "gladius" },
    ],
  },
  {
    question: "O que é sucesso no treino para você?",
    options: [
      { text: "Bater recordes pessoais de carga", class: "centurio" },
      { text: "Melhorar tempo e resistência", class: "velite" },
      { text: "Ver a evolução no espelho", class: "gladius" },
    ],
  },
];

export const classResults = {
  gladius: {
    name: "GLADIUS",
    subtitle: "Caminho da Hipertrofia",
    description: "Teu destino é forjar um corpo como aço romano. Foco em volume muscular e força estética.",
    color: "from-red-900 to-red-700",
  },
  velite: {
    name: "VELITE",
    subtitle: "Caminho da Agilidade",
    description: "Rápido como o vento do Mediterrâneo. Teu caminho é a resistência, a velocidade e a mobilidade.",
    color: "from-blue-900 to-blue-700",
  },
  centurio: {
    name: "CENTURIO",
    subtitle: "Caminho da Força Bruta",
    description: "Inabalável como as muralhas de Roma. Teu destino é a força máxima e a potência devastadora.",
    color: "from-amber-900 to-amber-700",
  },
};

export const faixasEtarias = [
  "Menos de 13 anos", "13 a 17 anos", "18 a 24 anos", "25 a 29 anos",
  "30 a 34 anos", "35 a 44 anos", "45 a 54 anos", "55 a 64 anos", "Mais de 65 anos",
];

export const tempoAcompanha = [
  "Menos de 3 meses", "Entre 3 e 6 meses", "Entre 6 meses e 1 ano",
  "Mais de um ano", "Vim por indicação",
];

export const maquinasAcademia = [
  "Cadeira flexora", "Mesa flexora", "Flexora em pé",
  "Hack Linear", "Hack angular",
  "Panturrilha Máquina em pé", "Panturrilha máquina sentado",
  "Cadeira abdutora (abre)", "Cadeira adutora (fecha)",
  "Leg press 45 Linear", "Leg press 45 angular", "Leg press horizontal",
  "Barra guiada Smith", "Gaiola de agachamento", "Banco romano",
  "Supino máquina articulada", "Supino inclinado máquina articulada", "Supino declinado máquina articulada",
  "Paralela", "Graviton", "Peck deck/voador",
  "Remada baixa/máquina", "Desenvolvimento máquina", "Rosca Scott máquina",
  "Elevação lateral máquina", "Elevação pélvica máquina",
  "Remada cavalinho máquina", "Puxada alta articulada",
  "Agachamento pêndulo", "Remada baixa articulada",
];

export const doencasOpcoes = [
  "Diabetes Mellitus", "Pressão alta", "Colesterol Alto", "Câncer",
  "Depressão", "Ansiedade", "Triglicerídeos Altos", "Nenhuma",
];

export const alergiasOpcoes = ["Glúten", "Lactose", "Não tenho alergia"];

export const frutasOpcoes = [
  "Abacate", "Abacaxi", "Acerola", "Ameixa", "Amora", "Banana", "Caqui",
  "Goiaba", "Jabuticaba", "Kiwi", "Laranja", "Maçã", "Melão", "Melancia",
  "Mamão", "Manga", "Morango", "Pêssego", "Pera", "Uva", "Tangerina",
];

export const suplementosOpcoes = [
  "Whey protein", "Creatina", "Glutamina", "Pré treino", "BCAA",
  "Hipercalórico", "Ômega 3", "Beta Alanina", "Cafeína", "Multivitamínico", "Nenhum",
];

export const restricoesOpcoes = [
  "Ovolactovegetariano (ovos e laticínios)", "Lactovegetariano (consome laticínios)",
  "Ovovegetariano (consome ovos)", "Vegano", "Não",
];

export const caloriasOpcoes = [
  "Menos de 1500", "1500 até 2000", "2000 até 2500", "2500 até 3000",
  "3000 até 3500", "Mais de 3500", "Não sei",
];

export const aguaOpcoes = [
  "Menos de 1 litro", "1L", "1,5L", "2L", "2,5L", "3L", "4L ou mais",
];

export const faixasSalariais = [
  "Menos de R$1.500", "R$1.500 a R$2.500", "R$2.500 a R$3.500",
  "R$3.500 a R$5.000", "R$5.000 a R$7.000", "R$7.000 a R$10.000",
  "R$10.000 a R$15.000", "Mais de R$15.000",
];

export interface UserData {
  // Cadastro
  nome: string;
  email: string;
  telefone: string;
  nascimento: string;
  cpf: string;
  cidade_estado: string;
  sexo: string;
  faixa_etaria: string;
  tempo_acompanha: string;
  altura: string;
  fatores_escolha: string;
  peso: string;
  indicacao: string;
  indicacao_nome: string;
  indicacao_telefone: string;
  // Fotos
  foto_frente: File | null;
  foto_costas: File | null;
  foto_direito: File | null;
  foto_esquerdo: File | null;
  foto_perfil: File | null;
  // Objetivo
  objetivo: string;
  objetivo_outro: string;
  fisiculturismo: string;
  influenciador_favorito: string;
  foto_pose_frente: File | null;
  foto_pose_lado: File | null;
  foto_pose_costas: File | null;
  // Treino
  pratica_musculacao: string;
  local_treino: string;
  maquinas_casa: string;
  dias_semana: string[];
  frequencia: string;
  horario_treino: string;
  tempo_treino: string;
  tempo_cardio: string;
  treino_antigo: File | null;
  // Academia
  grupos_prioritarios: string;
  tem_dor: string;
  descricao_dor: string;
  exercicio_nao_gosta: string;
  exercicio_nao_gosta_desc: string;
  maquinas_nao_tem: string[];
  maquina_outra: string;
  // Saude
  doencas: string[];
  doenca_outra: string;
  historico_familiar: string;
  historico_familiar_desc: string;
  medicamentos: string;
  alergias: string[];
  alergia_outra: string;
  // Nutricional
  nivel_atividade: string;
  media_passos: string;
  faz_cardio: string;
  tempo_cardio_nutri: string;
  refeicoes_dia: string;
  horario_refeicoes: string;
  calorias: string;
  tempo_calorias: string;
  restricoes: string[];
  frutas: string[];
  fruta_outra: string;
  suplementos: string[];
  suplemento_outro: string;
  // Estilo de Vida
  horario_sono: string;
  qualidade_sono: string;
  alimentos_diarios: string;
  alimentos_nao_come: string;
  agua: string;
  agua_outra: string;
  liquido_refeicao: string;
  liquido_qual: string;
  investimento_dieta: string;
  faixa_salarial: string;
}

export const initialUserData: UserData = {
  nome: "", email: "", telefone: "", nascimento: "", cpf: "", cidade_estado: "",
  sexo: "", faixa_etaria: "", tempo_acompanha: "", altura: "", fatores_escolha: "", peso: "",
  indicacao: "", indicacao_nome: "", indicacao_telefone: "",
  foto_frente: null, foto_costas: null, foto_direito: null, foto_esquerdo: null, foto_perfil: null,
  objetivo: "", objetivo_outro: "", fisiculturismo: "", influenciador_favorito: "",
  foto_pose_frente: null, foto_pose_lado: null, foto_pose_costas: null,
  pratica_musculacao: "", local_treino: "", maquinas_casa: "",
  dias_semana: [], frequencia: "", horario_treino: "", tempo_treino: "", tempo_cardio: "",
  treino_antigo: null,
  grupos_prioritarios: "", tem_dor: "", descricao_dor: "",
  exercicio_nao_gosta: "", exercicio_nao_gosta_desc: "",
  maquinas_nao_tem: [], maquina_outra: "",
  doencas: [], doenca_outra: "", historico_familiar: "", historico_familiar_desc: "",
  medicamentos: "", alergias: [], alergia_outra: "",
  nivel_atividade: "", media_passos: "", faz_cardio: "", tempo_cardio_nutri: "",
  refeicoes_dia: "", horario_refeicoes: "", calorias: "", tempo_calorias: "",
  restricoes: [], frutas: [], fruta_outra: "", suplementos: [], suplemento_outro: "",
  horario_sono: "", qualidade_sono: "", alimentos_diarios: "", alimentos_nao_come: "",
  agua: "", agua_outra: "", liquido_refeicao: "", liquido_qual: "",
  investimento_dieta: "", faixa_salarial: "",
};
