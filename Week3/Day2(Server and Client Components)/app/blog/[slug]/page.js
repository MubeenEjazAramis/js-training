import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import LikeButton from "@/components/LikeButton";
import CopyLinkButton from "@/components/CopyLinkButton";
import Accordion from "@/components/Accordion";

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
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-slate-500 dark:text-slate-400">{post.date}</p>
        <CopyLinkButton />
      </div>

      <h1 className="mt-4 text-4xl font-bold">{post.title}</h1>

      <div className="mt-8 text-lg leading-8 text-slate-700 dark:text-slate-300">
        <p>{post.content}</p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-y border-slate-200 py-4 dark:border-slate-800">
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-950/40 dark:text-blue-300"
            >
              #{tag}
            </span>
          ))}
        </div>
        <LikeButton slug={post.slug} />
      </div>

      <Accordion title="About this note (Server Content)">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          This content was rendered on the server and passed as children into the Client Accordion component.
        </p>
      </Accordion>
    </article>
  );
}
