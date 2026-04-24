import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { PolaroidFrame } from "@/components/ui/PolaroidFrame";

type PhysicalInvitationsProps = {
  onAddInvitations: () => void;
};

const invitationItems = [
  "Save-the-date card",
  "Formal invitation",
  "Details card with venue route map",
  "RSVP card",
  "Envelope liner",
];

export function PhysicalInvitations({ onAddInvitations }: PhysicalInvitationsProps) {
  return (
    <section
      id="process"
      className="bg-[color:var(--surface-container-high)] px-4 py-20 sm:px-6 md:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <div className="relative h-[320px] sm:h-[360px] lg:h-[390px]">
          <div className="absolute left-0 top-0 w-[62%] rotate-[-2deg]">
            <PolaroidFrame>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src="/images/catedral.jpg"
                  alt="Watercolour church illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
            </PolaroidFrame>
          </div>

          <div className="absolute left-[32%] top-[9%] w-[46%] rotate-[1.5deg]">
            <PolaroidFrame>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src="/images/entrada_ceremonia.jpg"
                  alt="Watercolour ceremony entrance illustration"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 40vw, 18vw"
                />
              </div>
            </PolaroidFrame>
          </div>

          <div className="absolute bottom-0 right-4 w-[38%] rotate-[3deg] sm:right-8">
            <PolaroidFrame>
              <div className="relative aspect-[1.1/1] overflow-hidden rounded-[var(--radius-md)]">
                <Image
                  src="/images/fromAtoB.jpg"
                  alt="Illustrated route map"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 35vw, 15vw"
                />
              </div>
            </PolaroidFrame>
          </div>
        </div>

        <div>
          <p className="eyebrow">The Stationery Suite</p>
          <h2 className="mt-4 font-[family:var(--font-serif)] text-[clamp(2rem,4vw,3rem)] tracking-[-0.01em] text-[color:var(--on-surface)]">
            From screen to stationery.
          </h2>
          <p className="mt-5 max-w-xl font-[family:var(--font-serif)] text-base leading-8 text-[color:var(--on-surface)]">
            Your digital site and physical invitations are designed as one. Same typefaces.
            Same palette. Same bespoke illustrations of your venues - printed on uncoated
            linen paper.
          </p>

          <div className="mt-8 grid gap-6">
            {invitationItems.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 font-[family:var(--font-sans)] text-sm text-[color:var(--on-surface)]"
              >
                <span className="text-[color:var(--primary)]">-</span>
                <span>{item}</span>
              </div>
            ))}
          </div>

          <Button variant="tertiary" onClick={onAddInvitations} className="mt-8 px-0">
            Add invitations to my order -
          </Button>
        </div>
      </div>
    </section>
  );
}
