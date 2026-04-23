import type { Session } from "@supabase/supabase-js";
import { isSupabaseConfigured, publicSupabase, supabase } from "./supabase";

export type ClientReview = {
  id: string;
  client_name: string;
  client_role: string | null;
  service_type: string;
  rating: number;
  review: string;
  is_enabled: boolean;
  created_at: string;
};

export type ClientReviewInput = {
  client_name: string;
  client_role: string;
  service_type: string;
  rating: number;
  review: string;
};

export const reviewServiceTypes = [
  "Residential Cleaning",
  "Commercial Cleaning",
  "Deep Cleaning",
  "Post-Construction Cleanup",
  "Construction Services",
  "Property Maintenance",
] as const;

const reviewColumns =
  "id, client_name, client_role, service_type, rating, review, is_enabled, created_at";

export const sampleClientReviews: ClientReview[] = [
  {
    id: "sample-1",
    client_name: "N. Perera",
    client_role: "Homeowner",
    service_type: "Post-Construction Cleanup",
    rating: 5,
    review:
      "The team handled dust, debris, and final detailing after our renovation. The house was ready to move back into the same day.",
    is_enabled: true,
    created_at: "2026-01-15T08:00:00.000Z",
  },
  {
    id: "sample-2",
    client_name: "Metro Office Group",
    client_role: "Facilities Manager",
    service_type: "Commercial Cleaning",
    rating: 5,
    review:
      "Reliable office cleaning with clear communication. They keep our common areas, washrooms, and meeting rooms consistently presentable.",
    is_enabled: true,
    created_at: "2026-01-09T08:00:00.000Z",
  },
  {
    id: "sample-3",
    client_name: "S. Fernando",
    client_role: "Property Owner",
    service_type: "Construction Services",
    rating: 5,
    review:
      "Their construction crew completed repair and finishing work neatly, then the cleaning team left the property ready for handover.",
    is_enabled: true,
    created_at: "2025-12-18T08:00:00.000Z",
  },
];

function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase is not configured for this deployment.");
  }

  return supabase;
}

function requirePublicSupabase() {
  if (!publicSupabase) {
    throw new Error("Supabase is not configured for this deployment.");
  }

  return publicSupabase;
}

function cleanInput(input: ClientReviewInput) {
  return {
    client_name: input.client_name.trim(),
    client_role: input.client_role.trim() || null,
    service_type: input.service_type.trim(),
    rating: input.rating,
    review: input.review.trim(),
    is_enabled: false,
  };
}

export async function fetchPublishedReviews() {
  if (!isSupabaseConfigured || !publicSupabase) {
    return sampleClientReviews;
  }

  const { data, error } = await publicSupabase
    .from("client_reviews")
    .select(reviewColumns)
    .eq("is_enabled", true)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ClientReview[];
}

export async function submitClientReview(input: ClientReviewInput) {
  const client = requirePublicSupabase();
  const payload = cleanInput(input);

  const { error } = await client.from("client_reviews").insert(payload);

  if (error) {
    if (error.code === "PGRST205" || error.message.includes("client_reviews")) {
      throw new Error(
        "Review database table is missing. Run supabase/client_reviews.sql in this Supabase project.",
      );
    }

    throw error;
  }
}

export async function fetchAllReviews() {
  const client = requireSupabase();

  const { data, error } = await client
    .from("client_reviews")
    .select(reviewColumns)
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return (data ?? []) as ClientReview[];
}

export async function setReviewEnabled(id: string, isEnabled: boolean) {
  const client = requireSupabase();

  const { data, error } = await client
    .from("client_reviews")
    .update({ is_enabled: isEnabled })
    .eq("id", id)
    .select(reviewColumns)
    .single();

  if (error) {
    throw error;
  }

  return data as ClientReview;
}

export async function getCurrentAdminSession() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export async function checkReviewAdminAccess() {
  const client = requireSupabase();
  const { data, error } = await client.rpc("is_review_admin");

  if (error) {
    throw error;
  }

  return Boolean(data);
}

export function onAdminAuthChange(callback: (session: Session | null) => void) {
  if (!supabase) {
    return { unsubscribe: () => undefined };
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return data.subscription;
}

export async function signInAdmin(email: string, password: string) {
  const client = requireSupabase();

  const { data, error } = await client.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error) {
    const message = error.message.toLowerCase();

    if (message.includes("email not confirmed")) {
      throw new Error(
        "This admin email is not confirmed in Supabase Auth. Confirm the user or enable auto-confirm for this user.",
      );
    }

    if (
      message.includes("invalid login credentials") ||
      message.includes("invalid credentials")
    ) {
      throw new Error(
        "Admin login failed. Make sure this email exists in Supabase Auth and the password is exactly correct.",
      );
    }

    if (message.includes("email provider") || message.includes("provider")) {
      throw new Error(
        "Email/password login is not enabled in Supabase Auth settings.",
      );
    }

    throw new Error(error.message || "Admin sign in failed.");
  }

  return data.session;
}

export async function signOutAdmin() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw error;
  }
}
