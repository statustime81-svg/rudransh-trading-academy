
import { useState } from "react";
import { Camera, Images } from "lucide-react";

import Reveal from "@/components/animations/Reveal";
import MediaLightbox from "@/components/ui/MediaLightbox";

export interface GalleryPhoto {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  verified: boolean;
}

interface GallerySectionProps {
  photos?: GalleryPhoto[];
}

export default function GallerySection({
  photos = [],
}: GallerySectionProps) {
  const [selectedIndex, setSelectedIndex] = useState<
    number | null
  >(null);

  const approvedPhotos = photos.filter(
    (photo) => photo.verified && photo.src.trim()
  );

  // No verified academy photos: do not render a fake gallery.
  if (approvedPhotos.length === 0) {
    return null;
  }

  const lightboxPhotos = approvedPhotos.map((photo) => ({
    src: photo.src,
    alt: photo.alt,
    caption: photo.caption,
  }));

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="scroll-mt-24 bg-[#0A1829] py-24 sm:py-32"
    >
      <div className="container-premium">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-[#16A34A]/20 bg-[#16A34A]/10 text-[#16A34A]">
              <Images size={27} />
            </div>

            <span className="eyebrow mt-7">
              A LOOK INSIDE
            </span>

            <h2
              id="gallery-heading"
              className="mt-5 text-4xl font-semibold text-white sm:text-5xl"
            >
              Academy
              <span className="ml-3 font-display font-normal text-[#16A34A]">
                Gallery.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl leading-8 text-slate-400">
              Explore authentic photographs shared or
              approved by Rudransh Trading Academy.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approvedPhotos.map((photo, index) => (
            <Reveal
              key={photo.id}
              delay={Math.min(index * 0.07, 0.28)}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`View photo: ${photo.alt}`}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] border border-white/10 bg-[#122138] text-left"
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                  <div>
                    <p className="text-sm font-semibold text-white">
                      {photo.caption ?? photo.alt}
                    </p>
                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-md">
                    <Camera size={18} />
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <MediaLightbox
        images={lightboxPhotos}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onIndexChange={setSelectedIndex}
      />
    </section>
  );
}
