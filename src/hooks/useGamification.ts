import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export const useGamification = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["gamification", user?.id],
    queryFn: async () => {
      if (!user) throw new Error("Not authenticated");
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
        .select("xp, dracmas")
        .eq("user_id", user.id)
        .single();

      if (!current) throw new Error("Gamification not found");

      const { error } = await supabase
        .from("gamification")
        .update({
          xp: current.xp + xp,
          dracmas: current.dracmas + dracmas,
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
      return data ?? [];
    },
  });
};
