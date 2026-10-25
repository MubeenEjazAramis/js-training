const posts = [
  {
    slug: "understanding-server-components",
    title: "Understanding Server Components",
    date: "October 20, 2026",
    excerpt: "Learn where Next.js renders your components.",
    content: "Server Components render on the server and send useful HTML to the browser. This keeps client-side JavaScript small.",
    tags: ["nextjs", "react"],
  },
  {
    slug: "a-better-javascript-workflow",
    title: "A Better JavaScript Workflow",
    date: "October 16, 2026",
    excerpt: "Small habits make everyday coding easier.",
    content: "Write small functions, give variables clear names, and test one change at a time. These simple habits improve your code.",
    tags: ["javascript", "basics"],
  },
  {
    slug: "starting-with-nextjs",
    title: "Starting with Next.js",
    date: "October 12, 2026",
    excerpt: "The first steps for building a Next.js application.",
    content: "Next.js gives you routing, layouts, and server rendering in one application. Start with pages and add features gradually.",
    tags: ["nextjs", "basics"],
  },
  {
    slug: "clean-react-components",
    title: "Clean React Components",
    date: "October 8, 2026",
    excerpt: "Keep components focused and easy to read.",
    content: "A component should have one clear job. Split large components when a section has its own data or behavior.",
    tags: ["react"],
  },
  {
    slug: "why-good-layouts-matter",
    title: "Why Good Layouts Matter",
    date: "October 4, 2026",
    excerpt: "Shared layouts make navigation simple.",
    content: "A layout keeps common parts such as navigation in one place. Child pages can then focus only on their own content.",
    tags: ["nextjs"],
  },
  {
    slug: "learning-by-building",
    title: "Learning by Building",
    date: "September 29, 2026",
    excerpt: "Practice turns new ideas into useful skills.",
    content: "Build small projects and explain each part. This makes it easier to remember concepts and find mistakes.",
    tags: ["basics"],
  },
];

export function getAllPosts() {
  return posts;
}

export function getPostBySlug(slug) {
  return posts.find((post) => post.slug === slug);
}

export function getPostsByTag(tag) {
  return posts.filter((post) => post.tags.includes(tag));
}
