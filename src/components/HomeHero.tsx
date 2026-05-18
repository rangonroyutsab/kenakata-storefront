import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { ButtonLink } from "@/components/ui/Button";

type HomeHeroProps = {
  imageUrl?: string | null;
};

export function HomeHero({ imageUrl }: HomeHeroProps) {
  return (
    <section className="grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-24 lg:py-20">
      <div>
        <h1 className="font-headline max-w-xl text-5xl font-bold leading-tight text-[var(--on-surface)] sm:text-6xl lg:text-7xl">
          Artisanal
          <br />
          Home Goods
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--on-surface-variant)]">
          Rooted warmth for your living spaces. Discover carefully crafted
          pieces designed to bring nature&apos;s calm into your daily life.
        </p>
        <ButtonLink
          href="/shop"
          variant="tertiary"
          className="mt-8 px-8 py-4 text-base"
        >
          Shop the Collection
          <ArrowRight size={18} />
        </ButtonLink>
      </div>

      <div className="relative">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[var(--surface-container-high)] shadow-soft">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt="Warm home goods collection"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-8 text-center text-[var(--on-surface-variant)]">
              Curated natural textures for the modern home.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
