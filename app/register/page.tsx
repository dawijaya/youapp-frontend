import type { Metadata } from "next";
import RegisterForm from "@/components/RegisterForm";

export const metadata: Metadata = {
  title: "Register - YouApp",
  description: "Create an account to join our platform.",
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-custom-gradient p-6">
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
