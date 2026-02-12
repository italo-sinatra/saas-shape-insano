import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useGamification = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["gamification", user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase
        .from("gamification")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });
};

export const useAddXpAndDracmas = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ xp, dracmas }: { xp: number; dracmas: number }) => {
      if (!user) throw new Error("Not authenticated");
      
      // Get current values
      const { data: current } = await supabase
        .from("gamification")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!current) throw new Error("No gamification record");

      const newXp = (current.xp ?? 0) + xp;
      const newDracmas = (current.dracmas ?? 0) + dracmas;
      const newStreak = (current.streak ?? 0) + 1;
      const newMaxStreak = Math.max(newStreak, current.max_streak ?? 0);
      const newLevel = Math.floor(newXp / 500) + 1;

      // Determine league
      let league: string = "plebe";
      if (newXp >= 15001) league = "pretoriano";
      else if (newXp >= 10001) league = "centuriao";
      else if (newXp >= 5001) league = "legionario";

      const { error } = await supabase
        .from("gamification")
        .update({
          xp: newXp,
          dracmas: newDracmas,
          streak: newStreak,
          max_streak: newMaxStreak,
          level: newLevel,
          league: league as any,
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gamification"] });
    },
  });
};

export const useLeaderboard = () => {
  return useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gamification")
        .select("user_id, xp, level, league, streak")
        .order("xp", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });
};
