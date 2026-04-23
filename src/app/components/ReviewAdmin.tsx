import { useCallback, useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { LogOut, RefreshCcw, ShieldCheck, Star } from "lucide-react";
import {
  checkReviewAdminAccess,
  fetchAllReviews,
  getCurrentAdminSession,
  onAdminAuthChange,
  setReviewEnabled,
  signInAdmin,
  signOutAdmin,
  type ClientReview,
} from "../lib/reviews";
import { isSupabaseConfigured } from "../lib/supabase";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";

function ReviewStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}

function formatReviewDate(date: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function ReviewAdmin() {
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [authForm, setAuthForm] = useState({ email: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [adminError, setAdminError] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [updatingReviewId, setUpdatingReviewId] = useState("");

  const loadAdminReviews = useCallback(async () => {
    setIsLoadingReviews(true);
    setAdminError("");

    try {
      const hasAccess = await checkReviewAdminAccess();
      setIsAdmin(hasAccess);

      if (!hasAccess) {
        setReviews([]);
        setAdminError("This account is not allowed to moderate reviews.");
        return;
      }

      const rows = await fetchAllReviews();
      setReviews(rows);
    } catch (error) {
      setReviews([]);
      setIsAdmin(false);
      setAdminError(
        error instanceof Error
          ? error.message
          : "Review moderation is temporarily unavailable.",
      );
    } finally {
      setIsLoadingReviews(false);
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setIsCheckingAuth(false);
      return undefined;
    }

    let isMounted = true;

    async function loadSession() {
      try {
        const currentSession = await getCurrentAdminSession();

        if (!isMounted) {
          return;
        }

        setSession(currentSession);

        if (currentSession) {
          await loadAdminReviews();
        }
      } catch (error) {
        if (isMounted) {
          setAdminError(
            error instanceof Error
              ? error.message
              : "Could not check admin session.",
          );
        }
      } finally {
        if (isMounted) {
          setIsCheckingAuth(false);
        }
      }
    }

    const subscription = onAdminAuthChange((nextSession) => {
      setSession(nextSession);

      if (nextSession) {
        loadAdminReviews();
      } else {
        setIsAdmin(false);
        setReviews([]);
      }
    });

    loadSession();

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, [loadAdminReviews]);

  const handleSignIn = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError("");
    setAdminError("");
    setIsSigningIn(true);

    try {
      const nextSession = await signInAdmin(
        authForm.email.trim(),
        authForm.password,
      );
      setSession(nextSession);
      await loadAdminReviews();
    } catch (error) {
      setAuthError(
        error instanceof Error ? error.message : "Admin sign in failed.",
      );
    } finally {
      setIsSigningIn(false);
    }
  };

  const handleSignOut = async () => {
    setAdminError("");

    try {
      await signOutAdmin();
      setSession(null);
      setIsAdmin(false);
      setReviews([]);
    } catch (error) {
      setAdminError(
        error instanceof Error ? error.message : "Could not sign out.",
      );
    }
  };

  const handleVisibilityChange = async (reviewId: string, checked: boolean) => {
    setUpdatingReviewId(reviewId);
    setAdminError("");

    try {
      const updatedReview = await setReviewEnabled(reviewId, checked);
      setReviews((currentReviews) =>
        currentReviews.map((review) =>
          review.id === reviewId ? updatedReview : review,
        ),
      );
    } catch (error) {
      setAdminError(
        error instanceof Error ? error.message : "Could not update review.",
      );
    } finally {
      setUpdatingReviewId("");
    }
  };

  if (!isSupabaseConfigured) {
    return (
      <div>
        <section className="bg-gradient-to-b from-blue-50 to-white py-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <h1 className="mb-4 text-4xl text-gray-900">Review Admin</h1>
            <p className="text-xl text-gray-600">
              Review moderation is unavailable until Supabase environment
              variables are configured for this deployment.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="mb-3 text-sm font-medium uppercase tracking-wide text-blue-600">
                Moderation
              </p>
              <h1 className="mb-4 text-4xl text-gray-900">Review Admin</h1>
              <p className="text-xl text-gray-600">
                Enable approved client reviews for the homepage slideshow.
              </p>
            </div>

            {session ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {isCheckingAuth ? (
            <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
              Checking admin session...
            </div>
          ) : !session ? (
            <form
              onSubmit={handleSignIn}
              className="max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-blue-100">
                  <ShieldCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl text-gray-900">Admin Sign In</h2>
                  <p className="text-gray-600">
                    Sign in to approve or hide client reviews.
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label htmlFor="admin-email" className="mb-2 block text-gray-700">
                    Email
                  </label>
                  <input
                    id="admin-email"
                    type="email"
                    value={authForm.email}
                    onChange={(event) =>
                      setAuthForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="admin-password" className="mb-2 block text-gray-700">
                    Password
                  </label>
                  <input
                    id="admin-password"
                    type="password"
                    value={authForm.password}
                    onChange={(event) =>
                      setAuthForm((current) => ({
                        ...current,
                        password: event.target.value,
                      }))
                    }
                    required
                    className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                {authError ? (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {authError}
                  </div>
                ) : null}

                <button
                  type="submit"
                  disabled={isSigningIn}
                  className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-5 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSigningIn ? "Signing In..." : "Sign In"}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-2xl text-gray-900">Client Reviews</h2>
                  <p className="text-gray-600">
                    Signed in as {session.user.email}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={loadAdminReviews}
                  disabled={isLoadingReviews}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RefreshCcw className="h-4 w-4" />
                  Refresh
                </button>
              </div>

              {adminError ? (
                <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
                  {adminError}
                </div>
              ) : null}

              {isLoadingReviews ? (
                <div className="rounded-lg border border-gray-200 bg-white p-6 text-gray-600">
                  Loading reviews...
                </div>
              ) : isAdmin && reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm"
                    >
                      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="mb-2 flex flex-wrap items-center gap-3">
                            <h3 className="text-xl text-gray-900">
                              {review.client_name}
                            </h3>
                            <Badge
                              variant={review.is_enabled ? "default" : "outline"}
                              className={
                                review.is_enabled
                                  ? "bg-emerald-600"
                                  : "border-amber-300 text-amber-700"
                              }
                            >
                              {review.is_enabled ? "Published" : "Hidden"}
                            </Badge>
                          </div>
                          <p className="text-gray-600">
                            {review.client_role || "Client"} -{" "}
                            {review.service_type}
                          </p>
                          <p className="text-sm text-gray-500">
                            Submitted {formatReviewDate(review.created_at)}
                          </p>
                        </div>

                        <label className="flex items-center gap-3 text-gray-700">
                          <span>Show on home page</span>
                          <Switch
                            checked={review.is_enabled}
                            disabled={updatingReviewId === review.id}
                            onCheckedChange={(checked) =>
                              handleVisibilityChange(review.id, checked)
                            }
                            className="data-[state=checked]:bg-blue-600"
                            aria-label={`Toggle ${review.client_name} review visibility`}
                          />
                        </label>
                      </div>

                      <div className="mb-3 flex items-center gap-3">
                        <ReviewStars rating={review.rating} />
                        <span className="text-sm text-gray-500">
                          {review.rating}/5
                        </span>
                      </div>

                      <p className="leading-7 text-gray-700">{review.review}</p>
                    </div>
                  ))}
                </div>
              ) : isAdmin ? (
                <div className="rounded-lg border border-dashed border-gray-300 bg-white p-6 text-gray-600">
                  No client reviews have been submitted yet.
                </div>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
