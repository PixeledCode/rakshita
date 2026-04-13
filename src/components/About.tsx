import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/image";
import type { SiteSettings } from "@/sanity/types";

type Props = {
  data: SiteSettings["about"] | null;
};

export default function About({ data }: Props) {
  if (!data) return null;

  const [firstName = "", ...rest] = (data.name ?? "").split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="about" className="py-16 md:py-24 px-6 md:px-12 bg-yellow-3">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-wrap md:flex-nowrap gap-6 justify-between lg:gap-24">
          {/* Left: name + bio */}
          <div className="flex flex-col justify-center lg:pb-30">
            <div className="flex">
              <h2 className="font-display font-bold text-4xl md:text-6xl lg:text-[5rem] lg:text-end leading-[125%] mb-6 lg:mb-8 mr-auto">
                {firstName}
                <br />
                {lastName}
              </h2>
            </div>

            {data.bio && Array.isArray(data.bio) && data.bio.length > 0 && (
              <div className="font-sans text-sm md:text-base leading-relaxed text-ink/80 space-y-4 max-w-md prose lg:pl-27">
                <PortableText value={data.bio} />
              </div>
            )}
          </div>

          {/* Right: photo */}
          {data.photo && (
            <div className="mx-auto lg:mx-0 w-full lg:mt-18 max-w-66 md:max-w-116 shrink-0">
              <Image
                src={urlFor(data.photo)
                  .width(930)
                  .height(1242)
                  .fit("crop")
                  .url()}
                alt={data.name ?? "Rakshita"}
                className="object-cover w-full h-auto"
                width={464}
                height={621}
              />
            </div>
          )}
        </div>
        {data.quote && (
          <blockquote className="absolute bottom-0 lg:left-[25%] lg:bottom-10 mx-auto p-2.5 italic lg:text-2xl max-w-180 z-10 [background:linear-gradient(90deg,#FEF7D5_0%,rgba(254,247,213,0)_100%)] md:[background:linear-gradient(90deg,rgba(254,247,213,0)_0%,#FEF7D5_100%)]">
            {data.quote}
          </blockquote>
        )}
      </div>
    </section>
  );
}
