import Image from "next/image";

/* The artwork is white-ground, so the band matches it and the image bleeds
   into the page edges. The two words double as jump links to their sections. */
export function WorkImageHero() {
  return (
    <section className="relative w-full bg-white pt-24 md:pt-28 pb-10 md:pb-14 mb-16 md:mb-24">
      <h1 className="sr-only">Products and designs</h1>
      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        <Image
          src="/work-hero.png"
          alt="products — useful builds; designs — taste & judgement"
          width={1915}
          height={1067}
          priority
          sizes="(min-width: 1280px) 1184px, 100vw"
          className="w-full h-auto"
        />
        <a
          href="#builds"
          aria-label="Jump to products"
          className="absolute left-[3%] top-[10%] w-[47%] h-[42%]"
        />
        <a
          href="#design"
          aria-label="Jump to designs"
          className="absolute right-[3%] top-[44%] w-[42%] h-[50%]"
        />
      </div>
    </section>
  );
}
