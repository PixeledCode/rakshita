export default function Hero() {
  return (
    <section className="md:min-h-[calc(100svh-40px)] flex items-center py-19 px-4 md:px-8 lg:px-30 bg-yellow">
      <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl xl:text-[4.875rem] max-w-5xl">
        <span>
          Hi, I am Rakshita, and I&apos;m{" "}
          <span className="text-sm md:text-2xl font-medium block leading-6 black lg:mt-2">
            not just
          </span>
        </span>
        <span className="leading-10 block mt-4 lg:mt-10">a Filmmaker</span>
      </h1>
    </section>
  );
}
