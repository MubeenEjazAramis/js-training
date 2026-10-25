import Link from "next/link";
import NavLink from "@/components/NavLink";
import "./globals.css";

export const metadata = {
  title: "Devnotes",
  description: "Simple notes about web development.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-slate-900">
        <header className="border-b border-slate-200">
          <nav className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-6 py-5">
            <Link href="/" className="text-xl font-bold">
              Devnotes
            </Link>
            <div className="flex gap-5 text-sm font-medium">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/blog">Blog</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/contact">Contact</NavLink>
            </div>
          </nav>
        </header>
        {children}
        <footer className="mt-16 border-t border-slate-200 py-8 text-center text-sm text-slate-500">
          Devnotes
        </footer>
      </body>
    </html>
  );
}
