import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";

export const metadata: Metadata = {
  title: "Register - YouApp",
  description: "Create an account to join our platform.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-custom-gradient p-6">
      {/* Tombol Back di sudut kiri atas */}
      <Link href="/" className="cursor-pointer">
        <button className="absolute cursor-pointer top-4 left-4 flex items-center text-white hover:text-gray-400">
          <IoIosArrowBack size={24} />
          <span>Back</span>
        </button>
      </Link>

      <div className="max-w-md w-full bg-opacity-50 bg-gray-800 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Register
        </h1>

        {/* Render the RegisterForm component */}
        <RegisterForm />

        <p className="text-center text-white mt-6">
          Have an account?{" "}
          <a href="/" className="text-yellow-500 underline">
            Login here
          </a>
        </p>
      </div>
    </main>
  );
}
