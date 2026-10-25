# Week 3 Day 2: Server and Client Components Notes

## Practice Exercises

### Practice 1: `console.log("rendered")` in Server vs Client Component
- **Server Component**: The log appears strictly in the server terminal (Node.js runtime) and never in the browser console. This is because Server Components execute only on the server, generating HTML to send to the browser.
- **Client Component**: The log appears in the browser console during client-side hydration and interaction (and also once in the terminal during server prerendering). It executes in the browser environment whenever state updates trigger re-renders.

### Practice 2: Using `useState` without `"use client"`
- **Observed Error**:
  ```text
  Error: useState can only be used in Client Components. Add the "use client" directive at the top of the file to use it.
  ```
- **Explanation**: Next.js App Router defaults all components to Server Components. Server Components execute once on the server and do not have access to client-side state, event handlers, or React hooks like `useState` and `useEffect`. To use state, `"use client"` must be placed at the top of the file to declare the boundary.

### Practice 3: Isolating Client Logic (Navbar vs NavLink)
- By leaving `layout.js` as a Server Component and extracting only the active path detection (`usePathname`) into a separate `NavLink.js` Client Component, the navbar container and overall layout remain server-rendered with zero client bundle overhead.

### Practice 4: LikeButton in Server-Rendered Post Page
- `app/blog/[slug]/page.js` remains an async Server Component fetching post data statically. The `LikeButton` is imported and placed directly into the JSX. React seamlessly renders the server HTML while hydrating only the `LikeButton` on the client.

### Practice 5: Composition Pattern (Server Component as children of Client Accordion)
- Server Components cannot be directly imported into Client Components. However, a Server Component can be passed as `children` to a Client Component (`<Accordion><ServerContent /></Accordion>`). Next.js evaluates the Server Component on the server, and the Client Component receives the rendered output as a React node slot.

---

## Stand-Up Q&A

1. **What does `"use client"` do, and does it affect imported components?**
   - It sets the boundary where Next.js starts bundling code for the client. All components imported into a `"use client"` module become part of the client bundle.

2. **Name 3 things that make a component a Client Component.**
   - Adding `"use client"` at the top.
   - Using React hooks like `useState` or `useEffect`.
   - Using browser APIs like `window`, `localStorage`, or DOM event listeners (`onClick`).

3. **Why keep the client boundary small?**
   - It reduces client JavaScript bundle size, speeds up initial page load, and improves performance and SEO by keeping non-interactive UI on the server.
