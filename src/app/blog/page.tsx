import Header from "@/components/multiimaint/Header";
import Footer from "@/components/multiimaint/Footer";
import Reveal from "@/components/Reveal";
import BlogSearchGrid from "@/components/multiimaint/BlogSearchGrid";

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="relative">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-[#0B1B4A]/8 blur-3xl" />
          <div className="absolute -bottom-56 right-[12%] h-[620px] w-[620px] rounded-full bg-[#F47B20]/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-10">
          <Reveal>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
              Blog
            </h1>
            <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-slate-600 md:text-[15px]">
              Guides premium en maintenance, hygiène, optimisation des coûts et facility management.
            </p>
          </Reveal>

          <BlogSearchGrid />
        </div>
      </main>
      <Footer />
    </>
  );
}

