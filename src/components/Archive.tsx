"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { urlFor } from "@/sanity/image";

type ArchiveImage = {
  _key?: string;
  asset?: Record<string, unknown>;
  alt?: string;
  [key: string]: unknown;
};

type Props = {
  data: {
    heading?: string;
    archiveSubtitle?: string;
    images?: ArchiveImage[];
  } | null;
};

function getAssetDimensions(img: ArchiveImage): {
  width: number;
  height: number;
} {
  const ref = (img.asset as { _ref?: string } | undefined)?._ref ?? "";
  const match = ref.match(/-(\d+)x(\d+)-/);
  if (match) return { width: parseInt(match[1]), height: parseInt(match[2]) };
  return { width: 400, height: 533 };
}

export default function Archive({ data }: Props) {
  if (!data || !data.images || data.images.length === 0) return null;

  return (
    <section
      id="archive"
      className="py-12 md:py-24 lg:py-30 overflow-hidden bg-pale"
    >
      {/* Heading */}
      <div className="px-6 md:px-12 mb-8 lg:mb-16 max-w-160">
        <h2 className="font-display font-bold text-3xl lg:text-5xl leading-snug">
          {data.heading ?? "An Archive of my Creative Experiments"}
        </h2>
      </div>

      <Marquee
        speed={80}
        pauseOnHover
        gradient={false}
        className="[&_.rfm-marquee]:items-start! [&_.rfm-initial-child-container]:items-start!"
      >
        {data.images.map((img, i) => {
          const { width, height } = getAssetDimensions(img);
          return (
            <div key={i} className="mr-4 overflow-hidden">
              <Image
                src={urlFor(img).width(600).url()}
                alt={img.alt ?? ""}
                width={width}
                height={height}
                className="w-auto h-auto max-h-96"
              />
            </div>
          );
        })}
      </Marquee>

      {data.archiveSubtitle && (
        <p className="font-sans lg:text-xl italic text-ink/50 mt-10 px-4 lg:px-30 max-w-4xl ml-auto text-end">
          {data.archiveSubtitle}
        </p>
      )}
    </section>
  );
}
