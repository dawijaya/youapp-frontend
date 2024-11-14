"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); // Inisialisasi useRouter

  // Fungsi untuk menangani login
  const handleLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Login successful!",
          variant: "default",
        });
        router.push("/about"); // Arahkan ke halaman /about setelah login berhasil
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message || "Login failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
    }
  };

  // Fungsi untuk mengupdate email atau username berdasarkan input
  const handleInputChange = (e: { target: { value: any } }) => {
    const value = e.target.value;
    // Cek apakah nilai tersebut adalah email
    if (value.includes("@")) {
      setEmail(value);
      setUsername(""); // Kosongkan username jika email terdeteksi
    } else {
      setUsername(value);
      setEmail(""); // Kosongkan email jika tidak berupa email
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-custom-gradient p-6">
      <div className="max-w-md w-full bg-opacity-50 bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Login
        </h1>

        <div className="space-y-6">
          {/* Input untuk email atau username */}
          <Input
            type="text"
            placeholder="Enter Username/Email"
            className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
            value={email || username} // Tampilkan email atau username
            onChange={handleInputChange}
          />

          {/* Input password dengan toggle visibilitas */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 flex items-center"
              onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye size={20} /> : <IoIosEyeOff size={20} />}
            </button>
          </div>

          <Button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg">
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
