import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deepesh Patel - AI & ML Engineer",
  description: "Portfolio of Deepesh Patel, AI & Machine Learning Engineer specializing in predictive models and intelligent systems.",
  openGraph: {
    title: "Deepesh Patel - AI & ML Engineer",
    description: "Architecting the future through intelligent systems and data-driven insights.",
    url: "https://portfolio-deepesh-patel.vercel.app",
    siteName: "Deepesh Patel Portfolio",
    images: [{ url: "/profile.png", width: 800, height: 600 }],
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
