import type { ReactNode } from "react";
import { getServices, getSettings } from "@/lib/content";
import { SiteHeader } from "@/components/site/header";
import { SiteFooter } from "@/components/site/footer";
import { FloatingActions } from "@/components/site/floating-actions";
import { ScrollReveal } from "@/components/site/scroll-reveal";

export async function PageShell({ children }: { children: ReactNode }) {
  const [settings, services] = await Promise.all([getSettings(), getServices()]);
  return (
    <>
      <SiteHeader settings={settings} />
      <main>{children}</main>
      <SiteFooter settings={settings} services={services} />
      <FloatingActions settings={settings} />
      <ScrollReveal />
    </>
  );
}
