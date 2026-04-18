"use client";

import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";

export function ClosingCTA({ onOpenOrder }: { onOpenOrder: () => void }) {
  const { t } = useLanguage();

  return (
    <section
      id="pricing"
      className="bg-[color:var(--surface-container-low)] px-12 py-20 text-center sm:px-16 lg:px-32 md:py-28"
    >
      <div className="mx-auto max-w-md">
        <p className="font-[family-name:var(--font-newsreader)] text-base italic text-[rgba(26,28,26,0.55)]">
          {t("cta.eyebrow")}
        </p>
        <h2 className="mt-4 font-[family-name:var(--font-newsreader)] text-[clamp(2rem,4.2vw,3rem)] leading-[1.15] tracking-[-0.02em] text-[color:var(--on-surface)]">
          {t("cta.headline1")}
          <br />
          {t("cta.headline2")}
        </h2>
        <div className="mt-7 flex justify-center">
          <Button onClick={onOpenOrder} className="px-7 py-3 text-[0.9rem]">
            <span>{t("cta.button")}</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
        <p className="mt-3 font-[family-name:var(--font-work-sans)] text-[0.78rem] text-[rgba(26,28,26,0.42)]">
          {t("cta.subtext")}
        </p>
      </div>
    </section>
  );
}
