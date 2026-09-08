import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://matthewhuehne.com"),
  title: "Matthew Huehne",
  description: "Consultant at Deloitte with a background in Finance and Computer Science. Experience, personal projects and music.",
  alternates: { canonical: "/" },
  openGraph: { title: "Matthew Huehne", description: "Experience, personal projects and music.", type: "website", url: "https://matthewhuehne.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
