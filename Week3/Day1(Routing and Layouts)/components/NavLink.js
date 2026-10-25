"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ href, children }) {
  const pathname = usePathname();
  const active = pathname === href || (href !== "/" && pathname.startsWith(href));

  return (
    <Link
      href={href}
      className={active ? "text-blue-600" : "text-slate-600 hover:text-blue-600"}
    >
      {children}
    </Link>
  );
}
