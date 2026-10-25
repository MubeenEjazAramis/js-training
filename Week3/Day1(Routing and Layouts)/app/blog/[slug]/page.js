import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <p className="text-sm text-slate-500">{post.date}</p>
      <h1 className="mt-3 text-4xl font-bold">{post.title}</h1>
      <div className="mt-8 text-lg leading-8 text-slate-700">
        <p>{post.content}</p>
      </div>
      <div className="mt-8 flex gap-3">
        {post.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
