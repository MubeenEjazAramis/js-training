import Link from "next/link";
import { getPostsByTag } from "@/lib/posts";

export default async function TagPage({ params }) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-4xl font-bold">Posts tagged #{tag}</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="rounded-xl border border-slate-200 p-6 hover:border-blue-400">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="mt-2 text-slate-600">{post.excerpt}</p>
          </Link>
        ))}
      </div>
      {posts.length === 0 && <p className="mt-8 text-slate-600">No posts found.</p>}
    </main>
  );
}
