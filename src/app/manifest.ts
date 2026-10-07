import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Presmile Dental Center",
    short_name: "Presmile",
    description: "Nha khoa gia đình Presmile – tử tế, tận tâm, an toàn.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#087f7a",
    lang: "vi",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
