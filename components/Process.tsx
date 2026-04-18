"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/i18n";

export function Process() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGCircleElement>(null);

  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !pathRef.current || !dotRef.current) return;

      const { top, height } = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const scrollableDistance = height - windowHeight;
      let progress = -top / scrollableDistance;

      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;

      const pathLength = pathRef.current.getTotalLength();
      const point = pathRef.current.getPointAtLength(progress * pathLength);

      // Update dot position using transform for performance rather than setting attributes directly
      // Or set cx cy. Transform is fine, but since cx and cy were already 0, we can just use cx/cy.
      dotRef.current.setAttribute("cx", point.x.toString());
      dotRef.current.setAttribute("cy", point.y.toString());

      // Determine active step based on progress
      let currentStep = 0;
      if (progress > 0.8) currentStep = 4;
      else if (progress > 0.6) currentStep = 3;
      else if (progress > 0.4) currentStep = 2;
      else if (progress > 0.2) currentStep = 1;

      setActiveStep(currentStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Initial check
    setTimeout(handleScroll, 100);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const steps = [
    { num: 1, x: 100, y: 10, titleKey: "process.step1.title", fallbackTitle: "Brief & vision", bodyKey: "process.step1.body", fallbackBody: "Style, must-haves & event details" },
    { num: 2, x: 300, y: 90, titleKey: "process.step2.title", fallbackTitle: "Design & content", bodyKey: "process.step2.body", fallbackBody: "Palette, fonts, photos & copy" },
    { num: 3, x: 500, y: 10, titleKey: "process.step3.title", fallbackTitle: "First draft", bodyKey: "process.step3.body", fallbackBody: "Homepage & key sections for review" },
    { num: 4, x: 700, y: 90, titleKey: "process.step4.title", fallbackTitle: "Revisions & RSVP", bodyKey: "process.step4.body", fallbackBody: "Feedback, polish & guest form setup" },
    { num: 5, x: 900, y: 10, titleKey: "process.step5.title", fallbackTitle: "Launch", bodyKey: "process.step5.body", fallbackBody: "Go live, share & ongoing updates" },
  ];

  return (
    <section id="process" ref={sectionRef} className="relative h-[200vh] bg-[color:var(--surface)]">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden pt-12 pb-16">

        <div className="mx-auto w-full max-w-7xl px-8 sm:px-12 lg:px-20 mb-20 text-center">
          <h2 className="font-[family-name:var(--font-newsreader)] text-[clamp(1.8rem,3.6vw,2.5rem)] tracking-[-0.01em] text-[color:var(--on-surface)]">
            {t("process.heading") === "process.heading" ? "The Process" : t("process.heading")}
          </h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto px-4 mt-10">
          {/* SVG Wave Container */}
          <div className="relative w-[200vw] -ml-[50vw] sm:w-full sm:ml-0 h-[100px] mb-8">
            <svg
              viewBox="0 0 1000 100"
              preserveAspectRatio="none"
              className="w-full h-full overflow-visible"
            >
              {/* Background faded path */}
              <path
                d="M 0 50 Q 100 10 200 50 T 400 50 T 600 50 T 800 50 T 1000 50"
                fill="none"
                stroke="rgba(204, 198, 188, 0.4)"
                strokeWidth="3"
                strokeDasharray="8 8"
              />

              {/* Invisible path for logic bounds calculation (getTotalLength) */}
              <path
                ref={pathRef}
                d="M 0 50 Q 100 10 200 50 T 400 50 T 600 50 T 800 50 T 1000 50"
                fill="none"
                stroke="transparent"
                strokeWidth="0"
              />

              {/* Dots on the path for each step */}
              {steps.map((step, idx) => (
                <circle
                  key={`bg-dot-${idx}`}
                  cx={step.x}
                  cy={step.y}
                  r="6"
                  fill={activeStep >= idx ? "var(--primary)" : "rgba(204, 198, 188, 0.3)"}
                  className="transition-colors duration-500"
                />
              ))}

              {/* The animating traveler dot */}
              <circle
                ref={dotRef}
                cx="0"
                cy="50"
                r="10"
                fill="var(--surface-container-lowest)"
                stroke="var(--primary)"
                strokeWidth="4"
                className="transition-transform drop-shadow-[0px_4px_8px_rgba(26,28,26,0.15)]"
              />
            </svg>
          </div>

          {/* Text Labels */}
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="relative w-[200vw] -ml-[50vw] sm:w-full sm:ml-0 h-full">
              {steps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPast = activeStep > idx;

                // Adjust text label vertical placement
                const topVal = step.y === 10 ? '-85px' : '160px';

                return (
                  <div
                    key={`label-${idx}`}
                    className={`absolute w-32 md:w-48 transform -translate-x-1/2 flex flex-col items-center text-center transition-all duration-700 pointer-events-auto ${isActive
                        ? "opacity-100 scale-105"
                        : isPast
                          ? "opacity-50 scale-100"
                          : "opacity-30 scale-95"
                      }`}
                    style={{ left: `${(step.x / 1000) * 100}%`, top: topVal }}
                  >
                    <h3 className="font-[family-name:var(--font-sans)] text-[1.1rem] md:text-[1.2rem] font-medium text-[color:var(--on-surface)] leading-tight mb-1">
                      {t(step.titleKey) === step.titleKey ? step.fallbackTitle : t(step.titleKey)}
                    </h3>
                    <p className="font-[family-name:var(--font-sans)] text-[0.85rem] text-[color:var(--on-surface)] opacity-80 leading-snug hidden sm:block">
                      {t(step.bodyKey) === step.bodyKey ? step.fallbackBody : t(step.bodyKey)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
