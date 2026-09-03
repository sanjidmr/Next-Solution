"use client";
import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

type RealtimeEvent = {
  table: string;
  type: "INSERT" | "UPDATE" | "DELETE";
  new: Record<string, any>;
  old: Record<string, any>;
};

/**
 * Subscribes to Supabase Postgres changes for a set of tables and invokes
 * `onEvent` on INSERT/UPDATE/DELETE. Automatically filters soft-deleted rows
 * (deleted_at set) out of INSERT/UPDATE events so the UI does not treat a
 * soft delete as a normal create/update.
 *
 * Falls back gracefully: if a table is not enabled for realtime it will
 * simply not emit events (supabase logs a warning, no throw).
 */
export function useRealtime(
  tables: string[],
  onEvent: (e: RealtimeEvent) => void,
) {
  const callbackRef = useRef(onEvent);
  callbackRef.current = onEvent;

  useEffect(() => {
    let client: ReturnType<typeof createClient> | null = null;
    let channel: ReturnType<
      ReturnType<typeof createClient>["channel"]
    > | null = null;

    try {
      client = createClient();
    } catch {
      return;
    }

    channel = client.channel("admin-realtime");

    for (const table of tables) {
      channel = channel
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table },
          (payload: any) => {
            if (payload.eventType === "DELETE") {
              callbackRef.current({
                table,
                type: "DELETE",
                new: payload.new,
                old: payload.old,
              });
              return;
            }
            const row = payload.new || {};
            if (row.deleted_at) return;
            callbackRef.current({
              table,
              type: payload.eventType.toUpperCase(),
              new: row,
              old: payload.old || {},
            });
          },
        );
    }

    channel.subscribe((status: string) => {
      if (status === "SUBSCRIBED") {
        // Optionally log for debug in dev mode.
      }
    });

    return () => {
      try {
        channel?.unsubscribe();
      } catch {
        /* noop */
      }
    };
  }, []);
}
