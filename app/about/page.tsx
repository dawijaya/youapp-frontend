import type { Metadata } from "next";
import AboutForm from "@/components/AboutForm";

export const metadata: Metadata = {
  title: "About - YouApp",
  description:
    "YouApp mengintegrasikan filosofi Barat, India, dan Timur seperti Astrologi, Horoskop (星座), Shio Cina (生肖), dan BaZi (八字) untuk menawarkan pengalaman pencocokan yang imersif, komunitas yang dinamis, pengalaman & acara yang menarik, serta koneksi dengan kelompok dan komunitas yang sefrekuensi.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Content */}
      <div className="flex flex-col items-center justify-center p-1">
        <div className="max-w-md w-full space-y-6">
          {/* Memanggil komponen AboutForm */}
          <AboutForm />
        </div>
      </div>
    </main>
  );
}
