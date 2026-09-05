"use client";

import { useState } from "react";

interface AgentStep {
  step: number;
  action: string;
  tool?: string;
  result?: {
    intent?: string;
    preference?: string;
    success?: boolean;
    city?: string;
    service_count?: number;
    recommendation?: string;
    alternatives?: string[];
    confidence?: number;
  };
}

interface RecommendationResponse {
  recommendation: string;
  reason: string;
  confidence: number;
  alternatives: string[];
  intent: string;
  preference: string;
  agent_steps: AgentStep[];
}

interface AIRecommendationProps {
  pincode?: string;
}

/* -----------------------------
   Small reusable SVG icons
----------------------------- */

function SparklesIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M12 3l1.2 3.8L17 8l-3.8 1.2L12 13l-1.2-3.8L7 8l3.8-1.2L12 3Z" />
      <path d="M19 13l.7 2.3L22 16l-2.3.7L19 19l-.7-2.3L16 16l2.3-.7L19 13Z" />
      <path d="M5 14l.8 2.2L8 17l-2.2.8L5 20l-.8-2.2L2 17l2.2-.8L5 14Z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </svg>
  );
}

function ZapIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M13 2 4 14h7l-1 8 10-13h-7l0-7Z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function CompareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M8 4v13" />
      <path d="m5 7 3-3 3 3" />
      <path d="M16 20V7" />
      <path d="m13 17 3 3 3-3" />
    </svg>
  );
}

function TargetIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" />
    </svg>
  );
}

function BrainIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M9 4.5A3 3 0 0 0 6 7.5v.3A3.5 3.5 0 0 0 4 11a3.5 3.5 0 0 0 2 3.2v1.3a3 3 0 0 0 3 3h1V5.5a3 3 0 0 0-1-1Z" />
      <path d="M15 4.5a3 3 0 0 1 3 3v.3a3.5 3.5 0 0 1 2 3.2 3.5 3.5 0 0 1-2 3.2v1.3a3 3 0 0 1-3 3h-1V5.5a3 3 0 0 1 1-1Z" />
      <path d="M9 9h2" />
      <path d="M13 9h2" />
      <path d="M9 14h2" />
      <path d="M13 14h2" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/* -----------------------------
   Main component
----------------------------- */

export default function AIRecommendation({
  pincode = "",
}: AIRecommendationProps) {
  const [message, setMessage] = useState("");
  const [result, setResult] =
    useState<RecommendationResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function getRecommendation() {
    if (!message.trim()) {
      setError("Tell AreaKart what you need first.");
      return;
    }

    if (!pincode.trim()) {
      setError("Please enter or detect your PIN code first.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ai/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message.trim(),
            pincode: pincode.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          "Unable to get an AI recommendation."
        );
      }

      const data: RecommendationResponse =
        await response.json();

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  const confidencePercent = result
    ? Math.round(result.confidence * 100)
    : 0;

  return (
    <section
      id="ai-agent"
      className="mx-auto w-full max-w-6xl px-4 py-10 md:py-14"
    >
      <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">

        {/* --------------------------------
            Header
        -------------------------------- */}
        <div className="border-b border-gray-100 px-5 py-7 dark:border-slate-800 md:px-8 md:py-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                <SparklesIcon />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white md:text-3xl">
                    AreaKart AI Agent
                  </h2>

                  <span className="rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                    Smart Recommendation
                  </span>
                </div>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 dark:text-gray-400 md:text-base">
                  Tell AreaKart what you need and the agent will
                  analyze your request, check local availability,
                  and recommend the best option for you.
                </p>
              </div>
            </div>

            <div className="hidden rounded-2xl border border-gray-200 px-4 py-3 dark:border-slate-700 md:block">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                <BrainIcon />
                AI-powered
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                Local availability aware
              </p>
            </div>
          </div>
        </div>

        {/* --------------------------------
            Input area
        -------------------------------- */}
        <div className="px-5 py-6 md:px-8 md:py-7">
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-2 dark:border-slate-700 dark:bg-slate-800/60">
            <div className="flex flex-col gap-2 md:flex-row">
              <div className="relative flex-1">
                <SearchIcon />

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !loading) {
                      getRecommendation();
                    }
                  }}
                  placeholder="e.g. I need the fastest grocery delivery"
                  className="w-full rounded-xl border border-gray-200 bg-white py-3.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white md:text-base"
                />
              </div>

              <button
                onClick={getRecommendation}
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Thinking...
                  </>
                ) : (
                  <>
                    Ask AreaKart
                    <ArrowRightIcon />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 dark:text-gray-500">
            <span className="flex items-center gap-1.5">
              <TargetIcon />
              Understands your intent
            </span>

            <span className="flex items-center gap-1.5">
              <MapPinIcon />
              Checks your PIN
            </span>

            <span className="flex items-center gap-1.5">
              <CompareIcon />
              Compares services
            </span>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
              <span className="mt-0.5 font-bold">!</span>
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* --------------------------------
            Result
        -------------------------------- */}
        {result && (
          <div className="border-t border-gray-100 bg-gray-50/60 px-5 py-7 dark:border-slate-800 dark:bg-slate-950/30 md:px-8 md:py-8">

            {/* Best match */}
            <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-white shadow-sm dark:border-green-900/60 dark:bg-slate-900">

              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-green-100/60 blur-3xl dark:bg-green-900/20" />

              <div className="relative p-5 md:p-7">

                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                  <div>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400">
                        <ZapIcon />
                        Best match
                      </span>
                    </div>

                    <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
                      {result.recommendation}
                    </h3>

                    <p className="mt-3 max-w-3xl text-sm leading-6 text-gray-600 dark:text-gray-400 md:text-base">
                      {result.reason}
                    </p>
                  </div>

                  {/* Confidence */}
                  <div className="min-w-[150px] rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 dark:border-slate-700 dark:bg-slate-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Confidence
                      </span>

                      <span className="text-sm font-bold text-green-600 dark:text-green-400">
                        {confidencePercent}%
                      </span>
                    </div>

                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-200 dark:bg-slate-700">
                      <div
                        className="h-full rounded-full bg-green-500 transition-all duration-700"
                        style={{
                          width: `${confidencePercent}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Metadata */}
                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300">
                    Intent: {formatLabel(result.intent)}
                  </span>

                  <span className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300">
                    Preference: {formatLabel(result.preference)}
                  </span>

                  <span className="rounded-full border border-green-200 bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 dark:border-green-900/50 dark:bg-green-950/30 dark:text-green-400">
                    {confidencePercent}% match confidence
                  </span>
                </div>
              </div>
            </div>

            {/* Alternatives */}
            {result.alternatives.length > 0 && (
              <div className="mt-8">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    Other good options
                  </h4>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    These services were also considered for your request.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {result.alternatives.map((service, index) => (
                    <div
                      key={service}
                      className="group flex items-center justify-between rounded-2xl border border-gray-200 bg-white px-4 py-4 transition hover:-translate-y-0.5 hover:border-green-300 hover:shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:hover:border-green-800"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-sm font-bold text-gray-500 dark:bg-slate-800 dark:text-gray-400">
                          {index + 2}
                        </div>

                        <span className="font-semibold text-gray-800 dark:text-gray-200">
                          {service}
                        </span>
                      </div>

                      <ArrowRightIcon />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Agent activity */}
            {result.agent_steps.length > 0 && (
              <div className="mt-8">
                <div className="mb-4">
                  <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                    How AreaKart decided
                  </h4>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    The agent followed these steps to generate your recommendation.
                  </p>
                </div>

                <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 md:p-5">
                  <div className="space-y-0">
                    {result.agent_steps.map((step, index) => (
                      <div
                        key={step.step}
                        className="relative flex gap-4"
                      >
                        {/* Connecting line */}
                        {index < result.agent_steps.length - 1 && (
                          <div className="absolute left-[17px] top-9 h-[calc(100%-12px)] w-px bg-gray-200 dark:bg-slate-700" />
                        )}

                        <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
                          <CheckIcon />
                        </div>

                        <div className="pb-5 pt-1">
                          <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 md:text-base">
                            {formatAction(step.action)}
                          </p>

                          {step.action === "check_availability" &&
                            step.result?.city && (
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                Checked availability around{" "}
                                {step.result.city}
                              </p>
                            )}

                          {step.action === "rank_services" &&
                            step.result?.alternatives && (
                              <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                                Compared {step.result.alternatives.length + 1} available services
                              </p>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* -----------------------------
   Formatting helpers
----------------------------- */

function formatLabel(value: string): string {
  return value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function formatAction(action: string): string {
  const labels: Record<string, string> = {
    understand_request: "Understood your request",
    check_availability: "Checked local delivery availability",
    rank_services: "Compared available services",
    produce_recommendation: "Generated recommendation",
  };

  return labels[action] ?? formatLabel(action);
}