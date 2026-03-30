import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matthew Huehne — Builder, Analyst, Creator",
  description:
    "Finance & CS graduate building at the intersection of AI, product, and strategy. Currently at Deloitte. Open to ambitious roles in AI startups and top-tier tech.",
  openGraph: {
    title: "Matthew Huehne — Builder, Analyst, Creator",
    description:
      "Finance & CS graduate building at the intersection of AI, product, and strategy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
