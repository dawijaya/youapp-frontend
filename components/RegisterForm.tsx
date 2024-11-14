// components/RegisterForm.js

"use client"; // Mengaktifkan penggunaan hook React di file ini

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { FaEye } from "react-icons/fa";
import { IoIosEyeOff } from "react-icons/io";

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Password and confirm password do not match",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/register", {
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
          description: "Registration successful!",
          variant: "default",
        });
        router.push("/");
      } else {
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message || "Registration failed",
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

  return (
    <div className="space-y-6">
      <Input
        type="email"
        placeholder="Enter Email"
        className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Create Username"
        className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="Create Password"
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

      <div className="relative">
        <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm Password"
          className="w-full p-4 text-gray-900 bg-gray-200 rounded-lg"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 flex items-center"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
          {showConfirmPassword ? (
            <FaEye size={20} />
          ) : (
            <IoIosEyeOff size={20} />
          )}
        </button>
      </div>

      <Button
        onClick={handleRegister}
        className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 rounded-lg">
        Register
      </Button>
    </div>
  );
}
