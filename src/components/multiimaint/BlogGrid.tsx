"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/contexts/LangContext";
import { BLOG_POSTS } from "@/lib/blogPosts";

export default function BlogGrid() {
  const { lang } = useLang();

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {BLOG_POSTS.map((p) => {
        const title = lang === "fr" ? p.title.fr : p.title.en;
        const excerpt = lang === "fr" ? p.excerpt.fr : p.excerpt.en;

        return (
          <Link
            key={p.slug}
            href={`/blog/${encodeURIComponent(p.slug)}`}
            className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_55px_rgba(2,6,23,.06)] transition hover:shadow-[0_26px_80px_rgba(2,6,23,.12)]"
          >
            <div className="relative h-[220px]">
              <Image
                src={p.image}
                alt={title}
                fill
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
              />
            </div>

            <div className="p-6">
              <h3 className="text-[18px] font-extrabold text-slate-900">{title}</h3>
              <p className="mt-2 text-[14px] text-slate-700 line-clamp-2">{excerpt}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}