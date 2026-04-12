"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/image";

type Category = {
  _id: string;
  title: string;
};

type Project = {
  _id: string;
  title: string;
  thumbnail: Record<string, unknown>;
  externalUrl: string;
  category: { _id: string; title: string };
};

type GalleryPhoto = {
  _id: string;
  image: Record<string, unknown>;
  alt?: string;
};

type Props = {
  categories: Category[];
  projects: Project[];
  photos: GalleryPhoto[];
};

export default function WorkSection({ categories, projects, photos }: Props) {
  const [activeId, setActiveId] = useState<string>(categories[0]?._id ?? "");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activeCategory = categories.find((c) => c._id === activeId);
  const isPhotoCategory =
    activeCategory?.title.toLowerCase().includes("photo") ?? false;

  const filteredProjects = projects.filter((p) => p.category._id === activeId);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  useEffect(() => {
    const el = tabRefs.current.get(activeId);
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
  }, [activeId]);

  // Set initial indicator position after mount
  useEffect(() => {
    const el = tabRefs.current.get(activeId);
    if (el) {
      setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section id="work" className="py-12 md:py-30 px-4 md:px-12 bg-yellow-2">
      <div className="max-w-7xl mx-auto">
        {/* Category tabs */}
        <div className="relative flex lg:flex-wrap justify-between gap-3 md:gap-10 mb-12 border-b border-black/15 px-1 lg:px-11">
          {categories.map((cat) => (
            <button
              key={cat._id}
              ref={(el) => {
                if (el) tabRefs.current.set(cat._id, el);
                else tabRefs.current.delete(cat._id);
              }}
              onClick={() => {
                setActiveId(cat._id);
              }}
              className={[
                "text-xs lg:text-[1.75rem] tracking-[-0.4] lg:tracking-normal uppercase transition-colors font-medium duration-150 cursor-pointer pb-3 lg:px-4 flex items-center",
              ].join(" ")}
            >
              {cat.title}
            </button>
          ))}
          {/* Sliding bottom indicator */}
          <span
            className="absolute -bottom-px h-0.75 bg-ink-text transition-all duration-300 ease-in-out"
            style={{ left: indicatorStyle.left, width: indicatorStyle.width }}
          />
        </div>

        {/* Projects grid */}
        {!isPhotoCategory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <a
                key={project._id}
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="overflow-hidden aspect-video bg-black/10">
                  <Image
                    src={urlFor(project.thumbnail)
                      .width(700)
                      .height(394)
                      .fit("crop")
                      .url()}
                    alt={project.title}
                    width={700}
                    height={394}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Photography gallery */}
        {isPhotoCategory && (
          <>
            <div className="columns-2 md:columns-3 lg:columns-4 gap-3">
              {photos.map((photo, i) => (
                <button
                  key={photo._id}
                  onClick={() => setLightboxIndex(i)}
                  className="block w-full mb-3 overflow-hidden group"
                >
                  <Image
                    src={urlFor(photo.image).width(600).url()}
                    alt={photo.alt ?? ""}
                    width={600}
                    height={800}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
              <div
                className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                onClick={closeLightbox}
              >
                <button
                  className="absolute top-6 right-8 text-white text-3xl leading-none"
                  onClick={closeLightbox}
                  aria-label="Close"
                >
                  ×
                </button>

                <div
                  className="relative max-h-[90vh] max-w-[90vw]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Image
                    src={urlFor(photos[lightboxIndex].image).height(1200).url()}
                    alt={photos[lightboxIndex].alt ?? ""}
                    width={1200}
                    height={1200}
                    className="max-h-[90vh] max-w-[90vw] w-auto h-auto object-contain"
                  />
                </div>

                {/* Prev / Next */}
                {lightboxIndex > 0 && (
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(lightboxIndex - 1);
                    }}
                    aria-label="Previous"
                  >
                    ‹
                  </button>
                )}
                {lightboxIndex < photos.length - 1 && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl px-3"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex(lightboxIndex + 1);
                    }}
                    aria-label="Next"
                  >
                    ›
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {filteredProjects.length === 0 && !isPhotoCategory && (
          <p className="text-ink/40 text-sm">No projects yet.</p>
        )}
      </div>
    </section>
  );
}
