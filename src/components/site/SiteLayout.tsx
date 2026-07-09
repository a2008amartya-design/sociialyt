import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";
import { Backdrop } from "./Backdrop";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Backdrop />
      <Nav />
      <main className="pt-24">{children}</main>
      <Footer />
    </>
  );
}