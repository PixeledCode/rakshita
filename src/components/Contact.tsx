import type { SiteSettings } from "@/sanity/types";

type Props = {
  data: SiteSettings["contact"] | null;
};

export default function Contact({ data }: Props) {
  return (
    <section
      id="contact"
      className="pt-12 md:pt-24 pb-10 md:pb-20 px-6 md:px-12"
    >
      {/* Big heading + inline subtext */}
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2 mb-8 lg:mb-16">
        <h2 className="font-display font-bold text-4xl md:text-7xl lg:text-8xl leading-none">
          {data?.heading ?? "Let's Talk..."}
        </h2>
        {data?.subtext && (
          <span className="font-sans text-sm md:text-base lg:text-3xl text-ink/50">
            {data.subtext}
          </span>
        )}
      </div>

      {/* Contact details */}
      <div className="flex flex-col gap-1.5 font-sans">
        {data?.email && (
          <a
            href={`mailto:${data.email}`}
            className="text-ink hover:underline underline-offset-4"
          >
            {data.email}
          </a>
        )}
        {data?.phone && (
          <a
            href={`tel:${data.phone}`}
            className="text-ink hover:underline underline-offset-4"
          >
            {data.phone}
          </a>
        )}
        {data?.socials?.map((s) => (
          <a
            key={s.platform}
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink/60 hover:text-ink hover:underline underline-offset-4 transition-colors"
          >
            {s.platform}
          </a>
        ))}
      </div>
    </section>
  );
}
