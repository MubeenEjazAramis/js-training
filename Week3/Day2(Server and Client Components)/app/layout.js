import Link from "next/link";
import NavLink from "@/components/NavLink";
import ThemeToggle from "@/components/ThemeToggle";
import "./globals.css";

export const metadata = {
  title: "Devnotes",
  description: "Simple notes about web development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900 transition-colors duration-200 dark:bg-slate-900 dark:text-slate-100">
        <header className="border-b border-slate-200 dark:border-slate-800">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="text-xl font-bold tracking-tight">
              Devnotes
            </Link>
            <div className="flex items-center gap-5 text-sm font-medium">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
              <ThemeToggle />
            </div>
          </nav>
        </header>
        {children}
        <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
          Devnotes · Built with Next.js Server &amp; Client Components
        </footer>
      </body>
    </html>
  );
}
