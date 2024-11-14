"use client";
import { useState } from "react";
import { FaPen } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";

export default function AboutPage() {
  const [about, setAbout] = useState("");
  const [interest, setInterest] = useState("");
  const [editing, setEditing] = useState({ about: false, interest: false });

  return (
    <main className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex items-center p-4 bg-black">
        <button className="flex items-center lg:hidden text-white hover:text-gray-400">
          <IoIosArrowBack size={24} />
          <span className="">Back</span>
        </button>
        <h1 className="flex-1 text-center text-lg font-semibold">
          @johndoe123
        </h1>
      </header>

      {/* Username Display Section */}
      <div className="flex justify-center p-4">
        <div className="max-w-md w-full h-72 bg-[url('/profil.svg')] bg-cover bg-center rounded-lg p-4 text-center flex flex-col items-center relative">
          {/* Username di sudut kiri bawah */}
          <p className="absolute bottom-4 left-4 text-lg font-medium text-white">
            @johndoe123,
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-6">
          {/* About Section */}
          <div className="bg-gray-900 rounded-lg p-4 flex items-start space-x-2">
            <div className="flex-1">
              <p className="text-sm font-medium">About</p>
              {editing.about ? (
                <textarea
                  className="w-full mt-2 p-2 bg-gray-700 rounded-lg text-gray-200 resize-none"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  placeholder="Add in your about to help others know you better"
                />
              ) : (
                <p className="mt-2 text-gray-400">
                  {about || "Add in your about to help others know you better"}
                </p>
              )}
            </div>
            <button
              onClick={() =>
                setEditing((prev) => ({ ...prev, about: !prev.about }))
              }
              className="text-gray-500 hover:text-gray-300">
              <FaPen />
            </button>
          </div>

          {/* Interest Section */}
          <div className="bg-gray-900 rounded-lg p-4 flex items-start space-x-2">
            <div className="flex-1">
              <p className="text-sm font-medium">Interest</p>
              {editing.interest ? (
                <textarea
                  className="w-full mt-2 p-2 bg-gray-700 rounded-lg text-gray-200 resize-none"
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="Add in your interest to find a better match"
                />
              ) : (
                <p className="mt-2 text-gray-400">
                  {interest || "Add in your interest to find a better match"}
                </p>
              )}
            </div>
            <button
              onClick={() =>
                setEditing((prev) => ({ ...prev, interest: !prev.interest }))
              }
              className="text-gray-500 hover:text-gray-300">
              <FaPen />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
