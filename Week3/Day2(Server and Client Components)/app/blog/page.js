import { getAllPosts } from "@/lib/posts";
import PostSearch from "@/components/PostSearch";

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main>
      <h1 className="text-4xl font-bold">Blog</h1>
      <p className="mb-8 mt-2 text-slate-600 dark:text-slate-400">
        Search and explore all Devnotes articles.
      </p>
      <PostSearch posts={posts} />
    </main>
  );
}
