"use client";

import Image from "next/image";

import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/icons";
import { PolaroidFrame } from "@/components/ui/PolaroidFrame";

type HeroProps = {
  onOpenOrder: () => void;
};

export function Hero({ onOpenOrder }: HeroProps) {
  const { t } = useLanguage();

  return (
    <section
      id="top"
      className="bg-[color:var(--surface)] px-8 pb-16 pt-24 sm:px-12 lg:px-20 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32"
    >
      <div className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        {/* Left column — editorial text */}
        <div className="max-w-xl pt-2 lg:pt-6">
          <p className="eyebrow">{t("hero.eyebrow")}</p>

          <h1 className="mt-5 font-[family-name:var(--font-newsreader)] text-[clamp(2.6rem,5.5vw,4.2rem)] leading-[1.08] tracking-[-0.02em] text-[color:var(--on-surface)]">
            {t("hero.headline1")}
            <br />
            <em className="font-normal italic">{t("hero.headline2")}</em>
          </h1>

          <p className="mt-6 max-w-[26rem] font-[family-name:var(--font-newsreader)] text-[0.95rem] leading-[1.7] text-[color:var(--on-surface)]">
            {t("hero.body")}{" "}
            <em className="italic">{t("hero.hostName")}</em>{" "}
            {t("hero.bodyEnd")}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onOpenOrder} className="px-5 py-2.5 text-[0.85rem]">
              <span>{t("hero.cta")}</span>
            </Button>
            <Button
              variant="secondary"
              className="px-5 py-2.5 text-[0.85rem]"
              onClick={() => {
                document
                  .querySelector("#experience")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("hero.secondary")}
            </Button>
          </div>
        </div>

        {/* Right column — Polaroid image + quote */}
        <div className="relative">
          <PolaroidFrame>
            <div className="relative h-[280px] overflow-hidden rounded-[var(--radius-md)] sm:h-[320px] lg:h-[340px]">
              <Image
                src="/images/table.png"
                alt="Elegant wedding dinner table"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </PolaroidFrame>

          {/* Pull-quote card overlapping the image */}
          <div className="relative -mt-6 ml-3 max-w-[16rem] rounded-[var(--radius-md)] bg-[color:var(--surface-container-lowest)] px-5 py-4 shadow-[var(--shadow-ambient)] sm:absolute sm:-bottom-2 sm:left-3 sm:mt-0 sm:ml-0">
            <p className="font-[family-name:var(--font-newsreader)] text-[0.95rem] italic leading-snug text-[color:var(--on-surface)]">
              {t("hero.quote")}
            </p>
            <p className="mt-2.5 font-[family-name:var(--font-work-sans)] text-[0.65rem] uppercase tracking-[0.1em] text-[rgba(108,91,78,0.6)]">
              {t("hero.attribution")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
