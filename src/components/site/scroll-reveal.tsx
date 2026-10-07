"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const revealSelector = [
  ".page-hero > .shell",
  ".hero-copy",
  ".hero-facts > *",
  ".section-heading",
  ".section-title-row",
  ".intro-grid > *",
  ".service-card",
  ".technology-grid > *",
  ".testimonial-grid > *",
  ".post-card",
  ".booking-grid > *",
  ".about-grid > *",
  ".values-grid > *",
  ".doctor-card",
  ".service-detail-grid > *",
  ".service-closing > .shell",
  ".service-contact-grid > *",
  ".contact-grid > *",
  ".video-section-heading",
  ".video-card",
  ".contact-map-heading",
  ".contact-map-section iframe",
  ".detail-grid > *",
  ".article-layout > *",
].join(",");

const leftSelector = [
  ".intro-art",
  ".technology-image",
  ".about-image",
  ".service-detail-aside",
  ".detail-image",
  ".article-toc",
].join(",");

const rightSelector = [
  ".intro-grid > div:last-child",
  ".technology-copy",
  ".about-grid > div:last-child",
  ".service-detail-grid > div:last-child",
  ".detail-copy",
].join(",");

const staggerGroups = [
  ".hero-facts",
  ".service-grid",
  ".testimonial-grid",
  ".post-grid",
  ".values-grid",
  ".doctor-grid",
  ".contact-cards",
  ".video-grid",
].join(",");

export function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    document.querySelectorAll<HTMLElement>(staggerGroups).forEach((group) => {
      Array.from(group.children).forEach((child, index) => {
        if (child instanceof HTMLElement) child.style.setProperty("--reveal-delay", `${Math.min(index * 70, 280)}ms`);
      });
    });

    elements.forEach((element) => {
      element.dataset.scrollReveal = element.matches(leftSelector)
        ? "left"
        : element.matches(rightSelector)
          ? "right"
          : "up";
    });

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-revealed"));
      return;
    }

    root.classList.add("scroll-reveal-enabled");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8%", threshold: 0.08 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => {
      observer.disconnect();
      root.classList.remove("scroll-reveal-enabled");
    };
  }, [pathname]);

  return null;
}
