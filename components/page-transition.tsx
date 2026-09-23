'use client';

import { ViewTransition } from 'react';
import { usePathname } from 'next/navigation';

/* Keyed on the pathname so the boundary actually unmounts and remounts on a
   route change — React only fires enter/exit animations when it does, and a
   wrapper sitting directly in the root layout never would.

   Only navigations that opt in via `transitionTypes` animate; every other
   route change falls through to `default: 'none'` and stays instant. */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <ViewTransition
      key={pathname}
      name="page-root"
      enter={{ 'nav-forward': 'nav-forward', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', default: 'none' }}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
