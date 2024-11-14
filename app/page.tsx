import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - YouApp",
  description:
    "YouApp mengintegrasikan filosofi Barat, India, dan Timur seperti Astrologi, Horoskop (星座), Shio Cina (生肖), dan BaZi (八字) untuk menawarkan pengalaman pencocokan yang imersif, komunitas yang dinamis, pengalaman & acara yang menarik, serta koneksi dengan kelompok dan komunitas yang sefrekuensi.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-custom-gradient p-6">
      <div className="max-w-md w-full bg-opacity-50 bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Enter Username/Email"
            className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
          />
          <Input
            type="password"
            placeholder="Enter Password"
            className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
          />

          <Button className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg">
            Login
          </Button>
        </div>

        <p className="text-center text-white mt-6">
          No account?{" "}
          <a href="/register" className="text-yellow-500 underline">
            Register here
          </a>
        </p>
      </div>
    </main>
  );
}
