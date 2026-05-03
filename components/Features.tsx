"use client";

import Link from "next/link";

import { useLanguage } from "@/lib/i18n";

export function Features() {
  const { t } = useLanguage();
  const coupleFeatures = [
    t("features.couplePoint1"),
    t("features.couplePoint2"),
    t("features.couplePoint3"),
    t("features.couplePoint4"),
  ];
  const guestFeatures = [
    t("features.guestPoint1"),
    t("features.guestPoint2"),
    t("features.guestPoint3"),
    t("features.guestPoint4"),
  ];

  return (
    <section
      id="experience"
      className="experience-section"
    >
      <div className="experience-section__inner">
        <div className="experience-section__header">
          <h2>
            {t("features.heading")}
          </h2>
        </div>

        <div className="experience-panels" aria-label={t("features.experienceLabel")}>
          <article className="experience-panel experience-panel--couple">
            <div className="experience-panel__top">
              <span>01</span>
              <p className="experience-panel__kicker">{t("features.coupleKicker")}</p>
            </div>
            <h3>{t("features.coupleTitle")}</h3>
            <ul>
              {coupleFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className="experience-panel experience-panel--guest">
            <div className="experience-panel__top">
              <span>02</span>
              <p className="experience-panel__kicker">{t("features.guestKicker")}</p>
            </div>
            <h3>{t("features.guestTitle")}</h3>
            <ul>
              {guestFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>
        </div>

        <Link href="/invisible-host" className="experience-assistant-link">
          <span>{t("features.aiLink")}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
