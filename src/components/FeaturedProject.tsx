import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import type { FEATURED_PROJECT_QUERY_RESULT } from "@/sanity/types";

type Props = {
  data: FEATURED_PROJECT_QUERY_RESULT;
};

export default function FeaturedProject({ data }: Props) {
  if (!data) return null;

  const bgUrl = urlFor(data.backgroundImage!).width(1800).quality(90).url();
  const recogUrl = data.recognitionImage
    ? urlFor(data.recognitionImage).width(1400).url()
    : null;

  return (
    <section
      className="w-full aspect-4/3 md:aspect-video bg-cover bg-position-[90%_center] md:bg-position-[right_center]"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      {/* Content */}
      <div className="flex flex-col justify-between px-4 pt-6 pb-12 md:pt-12 md:px-8 md:pb-14 lg:pt-16 lg:px-20">
        {/* Recognition image top-left */}
        {recogUrl && (
          <div className="w-90 md:w-170">
            <Image
              src={recogUrl}
              alt="Recognition"
              width={680}
              height={140}
              className="object-contain"
            />
          </div>
        )}

        {/* Text bottom-left */}
        <div className="max-w-131.5 text-white bg-black/60 relative p-6 pt-12 lg:ml-24 mt-50">
          <h2 className="font-script font-normal text-7xl md:text-7xl lg:text-8xl leading-none mb-3 text-ink-yellow absolute -top-12 lg:-top-16 lg:-left-19">
            {data.title}
          </h2>

          {data.subtitle && (
            <p className="font-sans text-base md:text-lg tracking-widest mb-4 font-semibold">
              {data.subtitle}
            </p>
          )}

          {data.description &&
            Array.isArray(data.description) &&
            data.description.length > 0 && (
              <div className="font-sans text-sm md:text-base leading-relaxed mb-8 prose prose-invert">
                <PortableText value={data.description} />
              </div>
            )}

          {data.linkUrl && data.linkText && (
            <a
              href={data.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 justify-center w-full bg-white rounded-4xl font-semibold italic text-ink-text text-lg px-6 py-4 hover:bg-white/85 transition-colors duration-200"
            >
              {data.linkText}
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="leading-0"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 20C15.523 20 20 15.523 20 10C20 4.477 15.523 0 10 0C4.477 0 0 4.477 0 10C0 15.523 4.477 20 10 20ZM10.47 6.47C10.6106 6.32955 10.8012 6.25066 11 6.25066C11.1988 6.25066 11.3894 6.32955 11.53 6.47L14.53 9.47C14.6705 9.61063 14.7493 9.80125 14.7493 10C14.7493 10.1988 14.6705 10.3894 14.53 10.53L11.53 13.53C11.4613 13.6037 11.3785 13.6628 11.2865 13.7038C11.1945 13.7448 11.0952 13.7668 10.9945 13.7686C10.8938 13.7704 10.7938 13.7518 10.7004 13.7141C10.607 13.6764 10.5222 13.6203 10.451 13.549C10.3797 13.4778 10.3236 13.393 10.2859 13.2996C10.2482 13.2062 10.2296 13.1062 10.2314 13.0055C10.2332 12.9048 10.2552 12.8055 10.2962 12.7135C10.3372 12.6215 10.3963 12.5387 10.47 12.47L12.19 10.75H6C5.80109 10.75 5.61032 10.671 5.46967 10.5303C5.32902 10.3897 5.25 10.1989 5.25 10C5.25 9.80109 5.32902 9.61032 5.46967 9.46967C5.61032 9.32902 5.80109 9.25 6 9.25H12.19L10.47 7.53C10.3295 7.38937 10.2507 7.19875 10.2507 7C10.2507 6.80125 10.3295 6.61063 10.47 6.47Z"
                  fill="black"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
