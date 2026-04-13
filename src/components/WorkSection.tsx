"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { urlFor } from "@/sanity/image";
import type {
  CATEGORIES_QUERY_RESULT,
  PROJECTS_QUERY_RESULT,
  GALLERY_PHOTOS_QUERY_RESULT,
} from "@/sanity/types";

type Props = {
  categories: CATEGORIES_QUERY_RESULT;
  projects: PROJECTS_QUERY_RESULT;
  photos: GALLERY_PHOTOS_QUERY_RESULT;
};

export default function WorkSection({ categories, projects, photos }: Props) {
  const [activeId, setActiveId] = useState<string>(categories[0]?._id ?? "");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const activeCategory = categories.find((c) => c._id === activeId);
  const isPhotoCategory =
    activeCategory?.title?.toLowerCase().includes("photo") ?? false;

  const filteredProjects = projects.filter((p) => p.category?._id === activeId);

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
          <div
            className={`grid grid-cols-1 gap-4 ${filteredProjects.length > 1 ? "sm:grid-cols-2" : ""}`}
          >
            {filteredProjects.map((project) => (
              <a
                key={project._id}
                href={project.externalUrl ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="overflow-hidden relative aspect-video bg-black/10">
                  <Image
                    src={urlFor(project.thumbnail!)
                      .width(1280)
                      .height(720)
                      .fit("crop")
                      .url()}
                    alt={project.title ?? ""}
                    width={1280}
                    height={720}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 640px"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {project?.role ? (
                    <span className="absolute block text-sm lg:text-base py-1.5 lg:py-2.5 px-3 lg:px-6 font-semibold text-white bottom-1 md:bottom-4 lg:bottom-7 bg-white/30 w-full">
                      {project?.role}
                    </span>
                  ) : null}
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
                    src={urlFor(photo.image!).width(1200).url()}
                    alt={photo.alt ?? ""}
                    width={1200}
                    height={1600}
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </button>
              ))}
            </div>
            <Lightbox
              open={lightboxIndex >= 0}
              index={lightboxIndex}
              close={() => setLightboxIndex(-1)}
              slides={photos.map((photo) => ({
                src: urlFor(photo.image!).width(1600).url(),
                alt: photo.alt ?? "",
              }))}
            />
          </>
        )}

        {filteredProjects.length === 0 && !isPhotoCategory && (
          <p className="text-ink/40 text-sm">No projects yet.</p>
        )}
      </div>
    </section>
  );
}
