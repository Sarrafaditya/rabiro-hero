import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rabiro - Digital Marketing Agency",
  description:
    "Rabiro is a high-performance digital marketing agency specializing in brand strategy, web development, and growth marketing.",
  keywords: ["digital marketing", "agency", "branding", "web development", "SEO"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
