import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { env, isSupabaseConfigured } from "@/lib/env";
import type { Database } from "@/types/database";

export async function createSupabaseServerClientOrNull() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient<Database>(env.supabaseUrl, env.supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // Server Components may not be allowed to mutate cookies.
        }
      },
    },
  });
}

export async function requireSupabaseServerClient() {
  const client = await createSupabaseServerClientOrNull();

  if (!client) {
    throw new Error("Supabase environment variables are not configured.");
  }

  return client;
}
