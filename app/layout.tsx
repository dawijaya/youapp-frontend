import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YouApp",
  description:
    "YouApp mengintegrasikan filosofi Barat, India, dan Timur seperti Astrologi, Horoskop (星座), Shio Cina (生肖), dan BaZi (八字) untuk menawarkan pengalaman pencocokan yang imersif, komunitas yang dinamis, pengalaman & acara yang menarik, serta koneksi dengan kelompok dan komunitas yang sefrekuensi.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
