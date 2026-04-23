import { useEffect, useState, type FormEvent } from "react";
import { ChevronLeft, ChevronRight, Send, Star } from "lucide-react";
import {
  fetchPublishedReviews,
  reviewServiceTypes,
  submitClientReview,
  type ClientReview,
  type ClientReviewInput,
} from "../lib/reviews";
import { isSupabaseConfigured } from "../lib/supabase";

type SubmitState = {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
};

const emptyForm: ClientReviewInput = {
  client_name: "",
  client_role: "",
  service_type: reviewServiceTypes[0],
  rating: 5,
  review: "",
};

function RatingStars({
  rating,
  onChange,
}: {
  rating: number;
  onChange?: (rating: number) => void;
}) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= rating;

        if (onChange) {
          return (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              className="rounded-md p-1 text-amber-500 transition-colors hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-amber-500"
              aria-label={`Set ${star} star rating`}
            >
              <Star
                className={`h-5 w-5 ${
                  filled ? "fill-amber-400 text-amber-400" : "text-gray-300"
                }`}
              />
            </button>
          );
        }

        return (
          <Star
            key={star}
            className={`h-5 w-5 ${
              filled ? "fill-amber-400 text-amber-400" : "text-gray-300"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ClientReviews() {
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewError, setReviewError] = useState("");
  const [form, setForm] = useState<ClientReviewInput>(emptyForm);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: "",
  });

  useEffect(() => {
    let isMounted = true;

    async function loadReviews() {
      try {
        const publishedReviews = await fetchPublishedReviews();

        if (!isMounted) {
          return;
        }

        setReviews(publishedReviews);
        setReviewError("");
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setReviews([]);
        setReviewError(
          error instanceof Error
            ? error.message
            : "Client reviews are temporarily unavailable.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadReviews();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    setActiveIndex(0);
  }, [reviews.length]);

  useEffect(() => {
    if (reviews.length <= 1) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % reviews.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, [reviews.length]);

  const activeReview = reviews[activeIndex];
  const hasMultipleReviews = reviews.length > 1;

  const showPreviousReview = () => {
    if (!hasMultipleReviews) {
      return;
    }

    setActiveIndex((index) => (index - 1 + reviews.length) % reviews.length);
  };

  const showNextReview = () => {
    if (!hasMultipleReviews) {
      return;
    }

    setActiveIndex((index) => (index + 1) % reviews.length);
  };

  const updateForm = (
    field: keyof ClientReviewInput,
    value: string | number,
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!isSupabaseConfigured) {
      setSubmitState({
        status: "error",
        message: "Review submissions are temporarily unavailable.",
      });
      return;
    }

    const clientName = form.client_name.trim();
    const reviewText = form.review.trim();

    if (clientName.length < 2) {
      setSubmitState({
        status: "error",
        message: "Please enter your name with at least 2 characters.",
      });
      return;
    }

    if (reviewText.length < 10) {
      setSubmitState({
        status: "error",
        message: "Please write a review with at least 10 characters.",
      });
      return;
    }

    setSubmitState({ status: "submitting", message: "" });

    try {
      await submitClientReview(form);
      setForm(emptyForm);
      setSubmitState({
        status: "success",
        message: "Thank you. Your review was sent for approval.",
      });
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Your review could not be submitted.",
      });
    }
  };

  return (
    <section id="reviews" className="bg-white py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-amber-600">
            Client reviews
          </p>
          <h2 className="mb-4 text-3xl text-gray-900">
            Trusted for cleaning, construction, and handover-ready spaces
          </h2>
          <p className="text-lg text-gray-600">
            Feedback from homeowners, property managers, contractors, and
            commercial teams who trust us with finished spaces.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
          <div className="rounded-lg border border-gray-200 bg-slate-50 p-6 shadow-sm sm:p-8">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <h3 className="text-2xl text-gray-900">What clients say</h3>
                <p className="text-gray-600">
                  Published reviews selected by the admin team.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={showPreviousReview}
                  disabled={!hasMultipleReviews}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Previous client review"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={showNextReview}
                  disabled={!hasMultipleReviews}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Next client review"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>

            {isLoading ? (
              <div className="min-h-[240px] rounded-lg border border-dashed border-gray-300 bg-white p-6 text-gray-600">
                Loading reviews...
              </div>
            ) : activeReview ? (
              <div className="min-h-[240px] rounded-lg bg-white p-6 shadow-sm">
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <RatingStars rating={activeReview.rating} />
                  <span className="rounded-md bg-emerald-50 px-3 py-1 text-sm text-emerald-700">
                    {activeReview.service_type}
                  </span>
                </div>

                <blockquote className="mb-6 text-xl leading-8 text-gray-800">
                  "{activeReview.review}"
                </blockquote>

                <div>
                  <p className="text-lg text-gray-900">
                    {activeReview.client_name}
                  </p>
                  {activeReview.client_role ? (
                    <p className="text-gray-600">{activeReview.client_role}</p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="min-h-[240px] rounded-lg border border-dashed border-gray-300 bg-white p-6 text-gray-600">
                {reviewError || "No client reviews are published yet."}
              </div>
            )}

            {reviews.length > 0 ? (
              <div className="mt-6 flex flex-wrap gap-2" aria-label="Review slides">
                {reviews.map((review, index) => (
                  <button
                    key={review.id}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className={`h-2.5 rounded-full transition-all ${
                      index === activeIndex
                        ? "w-8 bg-blue-600"
                        : "w-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Show review ${index + 1}`}
                    aria-current={index === activeIndex}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <h3 className="text-2xl text-gray-900">Submit a review</h3>
              <p className="text-gray-600">
                New reviews appear after admin approval.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="review-client-name" className="mb-2 block text-gray-700">
                  Name *
                </label>
                <input
                  id="review-client-name"
                  type="text"
                  value={form.client_name}
                  onChange={(event) => updateForm("client_name", event.target.value)}
                  minLength={2}
                  required
                  className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="review-client-role" className="mb-2 block text-gray-700">
                  Company or project
                </label>
                <input
                  id="review-client-role"
                  type="text"
                  value={form.client_role}
                  onChange={(event) => updateForm("client_role", event.target.value)}
                  className="w-full rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="review-service-type" className="mb-2 block text-gray-700">
                  Service *
                </label>
                <select
                  id="review-service-type"
                  value={form.service_type}
                  onChange={(event) => updateForm("service_type", event.target.value)}
                  required
                  className="w-full rounded-md border-2 border-gray-300 bg-white px-4 py-2 focus:border-blue-600 focus:outline-none"
                >
                  {reviewServiceTypes.map((serviceType) => (
                    <option key={serviceType} value={serviceType}>
                      {serviceType}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <span className="mb-2 block text-gray-700">Rating *</span>
                <RatingStars
                  rating={form.rating}
                  onChange={(rating) => updateForm("rating", rating)}
                />
              </div>

              <div>
                <label htmlFor="review-message" className="mb-2 block text-gray-700">
                  Review *
                </label>
                <textarea
                  id="review-message"
                  value={form.review}
                  onChange={(event) => updateForm("review", event.target.value)}
                  rows={5}
                  minLength={10}
                  required
                  className="w-full resize-none rounded-md border-2 border-gray-300 px-4 py-2 focus:border-blue-600 focus:outline-none"
                />
              </div>

              {submitState.message ? (
                <div
                  className={`rounded-md border p-3 text-sm ${
                    submitState.status === "success"
                      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                      : "border-red-200 bg-red-50 text-red-700"
                  }`}
                >
                  {submitState.message}
                </div>
              ) : null}

              {!isSupabaseConfigured ? (
                <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                  Review submissions are temporarily unavailable.
                </div>
              ) : null}

              <button
                type="submit"
                disabled={submitState.status === "submitting" || !isSupabaseConfigured}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-5 py-3 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-5 w-5" />
                {submitState.status === "submitting"
                  ? "Sending Review..."
                  : "Submit Review"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
