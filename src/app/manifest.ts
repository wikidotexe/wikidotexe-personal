import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Dwiki Arlian Maulana — IT Support & System Engineer",
    short_name: "wikidotexe",
    description:
      "Portfolio of Dwiki Arlian Maulana — IT Support & System Engineer with 6+ years managing networks, servers, and infrastructure.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f5f3",
    theme_color: "#0a0a0a",
    orientation: "portrait",
    icons: [
      {
        src: "/logo/logowikidotexe.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/logo/logowikidotexe.png",
        sizes: "any",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
