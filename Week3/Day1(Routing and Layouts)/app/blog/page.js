import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function BlogPage() {
  return (
    <main>
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mt-3 text-slate-600">All Devnotes articles.</p>
      <div className="mt-8 space-y-5">
        {getAllPosts().map((post) => (
          <article key={post.slug} className="rounded-xl border border-slate-200 p-6">
            <p className="text-sm text-slate-500">{post.date}</p>
            <h2 className="mt-2 text-2xl font-semibold">
              <Link href={`/blog/${post.slug}`} className="hover:text-blue-600">
                {post.title}
              </Link>
            </h2>
            <p className="mt-3 text-slate-600">{post.excerpt}</p>
            <div className="mt-4 flex gap-2">
              {post.tags.map((tag) => (
                <Link key={tag} href={`/tags/${tag}`} className="text-sm text-blue-600 hover:underline">
                  #{tag}
                </Link>
              ))}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
