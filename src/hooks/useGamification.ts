import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const MOCK_GAMIFICATION = {
  user_id: "mock-user-001",
  xp: 1250,
  level: 3,
  league: "legionario" as const,
  streak: 5,
  max_streak: 12,
  dracmas: 340,
  flame_percent: 72,
  updated_at: new Date().toISOString(),
};

export const useGamification = () => {
  return useQuery({
    queryKey: ["gamification", "mock-user-001"],
    queryFn: async () => MOCK_GAMIFICATION,
    staleTime: Infinity,
  });
};

export const useAddXpAndDracmas = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ xp, dracmas }: { xp: number; dracmas: number }) => {
      // No-op for MVP
      console.log(`[MVP Mock] +${xp} XP, +${dracmas} Dracmas`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification"] });
    },
  });
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => [
      { user_id: "mock-user-001", xp: 1250, level: 3, league: "legionario" as const, streak: 5 },
      { user_id: "mock-user-002", xp: 3200, level: 7, league: "legionario" as const, streak: 14 },
      { user_id: "mock-user-003", xp: 8500, level: 17, league: "centuriao" as const, streak: 30 },
    ],
    staleTime: Infinity,
  });
};
