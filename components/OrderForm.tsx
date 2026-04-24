"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { VellumOverlay } from "@/components/ui/VellumOverlay";
import { CheckIcon, ChevronLeftIcon } from "@/components/ui/icons";

type OrderFormProps = {
  isOpen: boolean;
  onClose: () => void;
  initialStep?: number;
};

type FormState = {
  partnerOne: string;
  partnerTwo: string;
  date: string;
  ceremonyVenue: string;
  receptionVenue: string;
  guestCount: number;
  features: string[];
  physicalInvitations: boolean | null;
  invitationStyle: string;
  aesthetic: string;
  email: string;
};

const featureCards = [
  "AI Concierge Chatbot",
  "Guest RSVP Management",
  "Seating & Table Planner",
  "Dietary & Accessibility Tracker",
  "Budget Manager",
  "News & Updates Feed",
  "Letters to the Couple",
  "Physical Invitations",
  "Custom Domain",
];

const invitationStyles = ["Classic Linen", "Garden Watercolour", "Minimal Stone"];

const initialState: FormState = {
  partnerOne: "",
  partnerTwo: "",
  date: "",
  ceremonyVenue: "",
  receptionVenue: "",
  guestCount: 120,
  features: [],
  physicalInvitations: null,
  invitationStyle: "",
  aesthetic: "",
  email: "",
};

function ProgressDots({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-2 pt-3 font-[family-name:var(--font-work-sans)] text-sm text-[color:var(--primary)]">
      {Array.from({ length: 10 }).map((_, index) => (
        <span key={index} aria-hidden="true" className="leading-none">
          {index + 1 === currentStep ? "●" : "·"}
        </span>
      ))}
    </div>
  );
}

export function OrderForm({ isOpen, onClose, initialStep = 1 }: OrderFormProps) {
  const { t } = useLanguage();
  const [step, setStep] = useState(initialStep);
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  const totalSteps = 10;
  const names = useMemo(
    () =>
      [form.partnerOne, form.partnerTwo].filter(Boolean).join(" & ") ||
      t("order.names"),
    [form.partnerOne, form.partnerTwo, t],
  );

  function update<K extends keyof FormState>(field: K, value: FormState[K]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function toggleFeature(feature: string) {
    setForm((current) => {
      const has = current.features.includes(feature);
      return {
        ...current,
        features: has
          ? current.features.filter((f) => f !== feature)
          : [...current.features, feature],
      };
    });
  }

  function nextStep() {
    setStep((s) => Math.min(totalSteps, s + 1));
  }
  function previousStep() {
    setStep((s) => Math.max(1, s - 1));
  }
  function submitForm() {
    setSubmitted(true);
  }

  const canContinue =
    step === 1
      ? Boolean(form.partnerOne && form.partnerTwo)
      : step === 2
        ? Boolean(form.date)
        : step === 3
          ? Boolean(form.ceremonyVenue)
          : step === 4
            ? Boolean(form.receptionVenue)
            : step === 6
              ? form.features.length > 0
              : step === 7
                ? form.physicalInvitations !== null
                : step === 8
                  ? Boolean(form.aesthetic.trim())
                  : step === 9
                    ? Boolean(form.email.trim())
                    : true;

  return (
    <VellumOverlay
      isOpen={isOpen}
      onClose={onClose}
      align="top"
      panelClassName="mx-auto mt-0 w-full max-w-5xl rounded-[calc(var(--radius-lg)+0.75rem)] bg-transparent p-0 shadow-none"
    >
      <div className="rounded-[calc(var(--radius-lg)+0.75rem)] bg-[rgba(255,255,255,0.48)] p-3 shadow-[var(--shadow-ambient)] backdrop-blur-sm sm:p-4">
        <div className="min-h-[min(860px,90vh)] rounded-[calc(var(--radius-lg)+0.4rem)] bg-[color:var(--surface)] px-5 pb-8 pt-3 sm:px-8 sm:pb-10">
          <ProgressDots currentStep={submitted ? 10 : step} />

          {submitted ? (
            <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--secondary-container)] px-4 py-2 font-[family-name:var(--font-work-sans)] text-sm text-[color:var(--on-surface)]">
                <span>{t("order.received")}</span>
                <CheckIcon className="h-4 w-4" />
              </div>
              <h2 className="mt-6 font-[family-name:var(--font-newsreader)] text-[clamp(2.2rem,5vw,3.6rem)] leading-tight text-[color:var(--on-surface)]">
                {t("order.confirmTitle")}
              </h2>
              <p className="mt-4 max-w-xl font-[family-name:var(--font-newsreader)] text-lg leading-8 text-[color:var(--on-surface)]">
                {t("order.confirmBody")}
              </p>
              <Button onClick={onClose} className="mt-8 px-8 py-3">
                {t("order.close")}
              </Button>
            </div>
          ) : (
            <div className="mx-auto flex min-h-[72vh] max-w-3xl flex-col justify-between gap-8 pt-8">
              <div className="order-form-step animate-[fadeIn_.3s_ease]">
                {step === 1 && (
                  <StepShell title={t("order.step1")}>
                    <div className="grid gap-8 md:grid-cols-2">
                      <label className="soft-field">
                        <span className="soft-label">{t("order.partner1")}</span>
                        <input
                          value={form.partnerOne}
                          onChange={(e) => update("partnerOne", e.target.value)}
                          placeholder="Sara"
                        />
                      </label>
                      <label className="soft-field">
                        <span className="soft-label">{t("order.partner2")}</span>
                        <input
                          value={form.partnerTwo}
                          onChange={(e) => update("partnerTwo", e.target.value)}
                          placeholder="James"
                        />
                      </label>
                    </div>
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell title={t("order.step2")}>
                    <label className="soft-field">
                      <span className="soft-label">{t("order.dateLabel")}</span>
                      <input
                        type="date"
                        value={form.date}
                        onChange={(e) => update("date", e.target.value)}
                      />
                    </label>
                  </StepShell>
                )}

                {step === 3 && (
                  <StepShell title={t("order.step3")}>
                    <label className="soft-field">
                      <span className="soft-label">{t("order.ceremonyLabel")}</span>
                      <input
                        value={form.ceremonyVenue}
                        onChange={(e) => update("ceremonyVenue", e.target.value)}
                        placeholder="Santa Maria del Mar"
                      />
                    </label>
                  </StepShell>
                )}

                {step === 4 && (
                  <StepShell title={t("order.step4")}>
                    <label className="soft-field">
                      <span className="soft-label">{t("order.receptionLabel")}</span>
                      <input
                        value={form.receptionVenue}
                        onChange={(e) => update("receptionVenue", e.target.value)}
                        placeholder="Mas Torroella"
                      />
                    </label>
                  </StepShell>
                )}

                {step === 5 && (
                  <StepShell title={t("order.step5")}>
                    <div className="space-y-8">
                      <p className="font-[family-name:var(--font-newsreader)] text-7xl leading-none text-[color:var(--on-surface)]">
                        {form.guestCount}
                      </p>
                      <input
                        type="range"
                        min={10}
                        max={500}
                        value={form.guestCount}
                        onChange={(e) => update("guestCount", Number(e.target.value))}
                        className="w-full accent-[color:var(--primary)]"
                      />
                    </div>
                  </StepShell>
                )}

                {step === 6 && (
                  <StepShell title={t("order.step6")}>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {featureCards.map((feature) => {
                        const selected = form.features.includes(feature);
                        return (
                          <button
                            key={feature}
                            type="button"
                            onClick={() => toggleFeature(feature)}
                            className={`rounded-[var(--radius-lg)] bg-[color:var(--surface-container-lowest)] p-5 text-left shadow-[var(--shadow-ambient)] transition-all ${selected ? "border-[1.5px] border-[color:var(--primary)] bg-[rgba(239,217,200,0.2)]" : "border border-transparent"}`}
                          >
                            <p className="font-[family-name:var(--font-newsreader)] text-lg text-[color:var(--on-surface)]">
                              {feature}
                            </p>
                            <p className="mt-2 font-[family-name:var(--font-work-sans)] text-xs leading-5 text-[rgba(26,28,26,0.6)]">
                              {t("order.featureHint")}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </StepShell>
                )}

                {step === 7 && (
                  <StepShell title={t("order.step7")}>
                    <div className="grid gap-4 md:grid-cols-2">
                      {[
                        { label: t("order.yesPlease"), value: true },
                        { label: t("order.digitalOnly"), value: false },
                      ].map((opt) => (
                        <button
                          key={opt.label}
                          type="button"
                          onClick={() => update("physicalInvitations", opt.value)}
                          className={`rounded-[var(--radius-lg)] bg-[color:var(--surface-container-lowest)] p-6 text-left shadow-[var(--shadow-ambient)] ${form.physicalInvitations === opt.value ? "border-[1.5px] border-[color:var(--primary)] bg-[rgba(239,217,200,0.2)]" : "border border-transparent"}`}
                        >
                          <p className="font-[family-name:var(--font-newsreader)] text-2xl text-[color:var(--on-surface)]">
                            {opt.label}
                          </p>
                        </button>
                      ))}
                    </div>

                    {form.physicalInvitations && (
                      <div className="mt-6 grid gap-4 sm:grid-cols-3">
                        {invitationStyles.map((style) => (
                          <button
                            key={style}
                            type="button"
                            onClick={() => update("invitationStyle", style)}
                            className={`rounded-[var(--radius-lg)] bg-[color:var(--surface-container-lowest)] p-4 text-left shadow-[var(--shadow-ambient)] ${form.invitationStyle === style ? "border-[1.5px] border-[color:var(--primary)]" : "border border-transparent"}`}
                          >
                            <div className="h-28 rounded-[var(--radius-md)] bg-[linear-gradient(160deg,rgba(239,217,200,0.7),rgba(255,255,255,0.92))]" />
                            <p className="mt-3 font-[family-name:var(--font-newsreader)] text-lg text-[color:var(--on-surface)]">
                              {style}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </StepShell>
                )}

                {step === 8 && (
                  <StepShell title={t("order.step8")}>
                    <label className="soft-field">
                      <span className="soft-label">{t("order.aestheticLabel")}</span>
                      <textarea
                        rows={4}
                        value={form.aesthetic}
                        onChange={(e) => update("aesthetic", e.target.value)}
                        placeholder="Editorial, modern heirloom, tactile, warm neutrals..."
                      />
                    </label>
                  </StepShell>
                )}

                {step === 9 && (
                  <StepShell title={t("order.step9")}>
                    <label className="soft-field">
                      <span className="soft-label">{t("order.emailLabel")}</span>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        placeholder="hello@example.com"
                      />
                    </label>
                    <p className="mt-4 font-[family-name:var(--font-work-sans)] text-sm italic text-[rgba(26,28,26,0.6)]">
                      {t("order.emailHint")}
                    </p>
                  </StepShell>
                )}

                {step === 10 && (
                  <StepShell title={t("order.step10")}>
                    <div className="rounded-[var(--radius-lg)] bg-[color:var(--surface-container-lowest)] p-6 shadow-[var(--shadow-ambient)]">
                      <SummaryRow label={t("order.names")} value={names} />
                      <SummaryRow
                        label={t("order.weddingDate")}
                        value={form.date || t("order.notProvided")}
                      />
                      <SummaryRow
                        label={t("order.ceremonyVenue")}
                        value={form.ceremonyVenue || t("order.notProvided")}
                      />
                      <SummaryRow
                        label={t("order.receptionVenue")}
                        value={form.receptionVenue || t("order.notProvided")}
                      />
                      <SummaryRow
                        label={t("order.guestCount")}
                        value={`${form.guestCount}`}
                      />
                      <SummaryRow
                        label={t("order.selectedFeatures")}
                        value={
                          form.features.length
                            ? form.features.join(", ")
                            : t("order.noneSelected")
                        }
                      />
                      <SummaryRow
                        label={t("order.physicalInvitations")}
                        value={
                          form.physicalInvitations
                            ? `${t("order.yes")}${form.invitationStyle ? ` \u2014 ${form.invitationStyle}` : ""}`
                            : t("order.digitalOnly")
                        }
                      />
                      <SummaryRow
                        label={t("order.aesthetic")}
                        value={form.aesthetic || t("order.notProvided")}
                      />
                      <SummaryRow
                        label={t("order.email")}
                        value={form.email || t("order.notProvided")}
                      />
                    </div>
                  </StepShell>
                )}
              </div>

              {/* Navigation */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">
                {step > 1 ? (
                  <Button variant="tertiary" onClick={previousStep} className="px-0">
                    <ChevronLeftIcon className="h-4 w-4" />
                    <span>{t("order.back")}</span>
                  </Button>
                ) : (
                  <div />
                )}

                {step < totalSteps ? (
                  <Button
                    onClick={nextStep}
                    disabled={!canContinue}
                    className="justify-center px-7 py-3 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {t("order.continue")}
                  </Button>
                ) : (
                  <Button onClick={submitForm} className="justify-center px-7 py-3">
                    {t("order.send")}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </VellumOverlay>
  );
}

function StepShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="font-[family-name:var(--font-newsreader)] text-[clamp(2.2rem,5vw,4rem)] leading-[1.08] tracking-[-0.02em] text-[color:var(--on-surface)]">
        {title}
      </h2>
      <div className="mt-10">{children}</div>
    </section>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-3 sm:grid-cols-[10rem_minmax(0,1fr)]">
      <span className="font-[family-name:var(--font-work-sans)] text-xs uppercase tracking-[0.08em] text-[rgba(108,91,78,0.7)]">
        {label}
      </span>
      <span className="font-[family-name:var(--font-newsreader)] text-base leading-7 text-[color:var(--on-surface)]">
        {value}
      </span>
    </div>
  );
}
