# Week 3 Day 2: Server and Client Components (Interactive Devnotes)

Interactive blog built with Next.js App Router, demonstrating composition patterns between Server Components and Client Components, dark mode with Tailwind CSS, and client-side interactivity.

---

## Component Classification Table (8 Components)

As required, here is the architectural breakdown of the 8 components:

| Component | Type | Why? |
| :--- | :--- | :--- |
| **Navbar** | Server Component | Mostly static branding and links. The navigation container does not need client hooks. Only active link styling requires client state, which is isolated into a child `NavLink`. |
| **Post Body** | Server Component | Static markdown/HTML content. It contains no user interaction or browser APIs, so keeping it on the server reduces client JavaScript bundle size. |
| **Search Box** | Client Component | Requires immediate interactivity: tracks input state (`useState`), listens to user typing (`onChange`), and filters data dynamically in the browser. |
| **Theme Toggle** | Client Component | Requires browser APIs (`localStorage`, `document.documentElement.classList`) and click handlers (`onClick`) to switch themes. |
| **Footer** | Server Component | Static text and copyright links. No state, effects, or user interactivity needed. |
| **Comment Form** | Client Component | Requires form event handling (`onSubmit`), input validation, and interactive state (`useState`, pending states). |
| **Data Table** | Server Component (with Client controls if needed) | Can fetch and render tabular data directly on the server for fast initial load and SEO. If interactive sorting/filtering is required, controls can be separate client islands. |
| **Modal** | Client Component | Relies on interactive visibility state (`isOpen`), click outside listeners, keyboard events (Escape key), and portal rendering to the DOM. |

---

## Build: Interactive Devnotes Features

1. **LikeButton on each post (`components/LikeButton.js`)**:
   - Client Component with heart toggle and like counter.
   - Persisted across reloads using `localStorage`.
   - 44 lines (under 50 lines).

2. **PostSearch on blog list (`components/PostSearch.js`)**:
   - Client Component receiving `posts` as props from the server page (`app/blog/page.js`).
   - Filters posts in real time by title, excerpt, and tags.
   - Shows empty feedback if no posts match query.
   - 49 lines (under 50 lines).

3. **ThemeToggle for Dark Mode (`components/ThemeToggle.js`)**:
   - Client Component toggling `dark` class on `<html>`.
   - Persisted in `localStorage`.
   - Full dark mode support using Tailwind `dark:` classes across all pages.
   - 39 lines (under 50 lines).

4. **CopyLinkButton on post detail (`components/CopyLinkButton.js`)**:
   - Client Component copying `window.location.href` using `navigator.clipboard`.
   - Displays "✓ Copied!" feedback for 2 seconds.
   - 30 lines (under 50 lines).

5. **Accordion Composition Pattern (`components/Accordion.js`)**:
   - Client Component managing open/close state.
   - Accepts server-rendered content as `children`, demonstrating Next.js composition without forcing children into client bundle.
   - 27 lines (under 50 lines).

6. **Isolated NavLink (`components/NavLink.js`)**:
   - Isolates `usePathname()` logic to keep the root layout and navbar as Server Components.
   - 21 lines (under 50 lines).

---

## Build Output: Static vs Dynamic Routes

Running `npm run build` results in:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ○ /about
├ ○ /blog
├   /blog/[slug]
│ ├ ● /blog/understanding-server-components
│ ├ ● /blog/a-better-javascript-workflow
│ ├ ● /blog/starting-with-nextjs
│ └ ● [+3 more paths]
├ ○ /contact
└ ƒ /tags/[tag]

○  (Static)   prerendered as static content
●  (SSG)      prerendered as static HTML (uses generateStaticParams)
ƒ  (Dynamic)  server-rendered on demand
```

- **Static Routes (`○`)**: `/`, `/about`, `/blog`, `/contact`, and `/_not-found` are prerendered as pure static HTML during build.
- **SSG Routes (`●`)**: `/blog/[slug]` uses `generateStaticParams()` to prerender all 6 blog posts at build time.
- **Dynamic Route (`ƒ`)**: `/tags/[tag]` renders dynamically on request because tags are evaluated per request without predefined static parameters.

---

## Stand-Up Interview Questions & Answers

### 1. What does `"use client"` do, and does it affect imported components?
`"use client"` marks the boundary between Server Components and Client Components. It tells Next.js and React that the module and any components imported below this boundary should be packaged for the client bundle and hydrated in the browser. 
It does affect imported components: every component imported into a file with `"use client"` becomes part of the client bundle. However, Server Components passed as `children` or props to a Client Component are rendered on the server and are NOT converted into Client Components.

### 2. Name 3 things that make a component a Client Component.
1. Adding the `"use client"` directive at the top of the file.
2. Using React state or lifecycle hooks (e.g. `useState`, `useEffect`, `useReducer`, `useRef`).
3. Using browser-only APIs or event handlers (e.g. `window`, `localStorage`, `onClick`, `onChange`).

### 3. Why keep the client boundary small?
Keeping the client boundary small keeps the client-side JavaScript bundle as lean as possible. Server Components send pure HTML without extra JavaScript overhead, resulting in faster page loads, better First Contentful Paint (FCP), improved SEO, and lower memory usage on mobile devices. Moving only interactive logic into small leaf components leaves the rest of the application server-rendered.
