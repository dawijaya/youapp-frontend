"use client";
import { useState, useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";

function InterestPage() {
  const [interests, setInterests] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  // Ambil data dari localStorage saat halaman dimuat
  useEffect(() => {
    const storedInterests = localStorage.getItem("interests");
    if (storedInterests) {
      setInterests(JSON.parse(storedInterests));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/"); // Arahkan ke login jika token tidak ada
    }
  }, []);

  // Simpan ke localStorage setiap kali interests berubah
  useEffect(() => {
    localStorage.setItem("interests", JSON.stringify(interests));
  }, [interests]);

  const handleAddInterest = (e: {
    key: string;
    preventDefault: () => void;
  }) => {
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      setInterests([...interests, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveInterest = (interestToRemove: string) => {
    setInterests(interests.filter((interest) => interest !== interestToRemove));
  };

  const handleSave = async () => {
    // Ambil data yang ada dari localStorage
    const storedInterests = localStorage.getItem("interests");
    const currentInterests = [...interests]; // Salin data interests yang ada di state

    // Jika data interests belum ada di localStorage, simpan ke localStorage
    if (!storedInterests) {
      localStorage.setItem("interests", JSON.stringify(currentInterests));
      console.log("Data interests disimpan di localStorage:", currentInterests);
      router.push("/about");
      return; // Jika belum ada data, cukup simpan di localStorage dan keluar
    }

    // Jika ada perubahan pada data interests, kirimkan ke API
    if (JSON.stringify(currentInterests) !== storedInterests) {
      const dataToSend = { interests: currentInterests };
      console.log("Data yang akan dikirim:", JSON.stringify(dataToSend));

      // Ambil token untuk autentikasi
      const token = localStorage.getItem("access_token");

      if (token) {
        try {
          // Kirim data ke API menggunakan metode PUT
          const response = await fetch("/api/updateInterests", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token, // Sertakan token di header
            },
            body: JSON.stringify(dataToSend),
          });

          if (response.ok) {
            console.log("Interests berhasil diperbarui di API");
            // Setelah berhasil, simpan data baru di localStorage dan arahkan ke halaman /about
            localStorage.setItem("interests", JSON.stringify(currentInterests));
            router.push("/about");
          } else {
            console.error(
              "Gagal memperbarui interests di API:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Terjadi kesalahan saat mengirim data ke API:", error);
        }
      } else {
        console.error("Token tidak ditemukan, pengguna belum login");
      }
    } else {
      // Jika tidak ada perubahan, cukup simpan ke localStorage
      localStorage.setItem("interests", JSON.stringify(currentInterests));
      console.log(
        "Data interests disimpan di localStorage tanpa perubahan API"
      );
      router.push("/about");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <Link href="/about">
          <button className="flex items-center lg:hidden text-white hover:text-gray-400">
            <IoIosArrowBack size={24} />
            <span>Back</span>
          </button>
        </Link>

        <button
          onClick={handleSave}
          className="text-transparent bg-clip-text bg-gradient-to-r from-[#ABFFFD] via-[#4599DB] to-[#AADAFF]">
          Save
        </button>
      </div>
      <h1 className="text-lg font-semibold text-yellow-500 mb-2">
        Tell everyone about yourself
      </h1>
      <h2 className="text-2xl font-bold mb-4">What interests you?</h2>

      <div className="bg-gray-800 p-4 rounded-lg">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {interests.map((interest, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-700 px-3 py-1 rounded-full text-sm">
              <span>{interest}</span>
              <button
                onClick={() => handleRemoveInterest(interest)}
                className="ml-2 text-gray-400 hover:text-gray-300">
                &times;
              </button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type and press enter..."
          className="w-full p-2 bg-gray-700 rounded-lg text-gray-200"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddInterest}
        />
      </div>
    </div>
  );
}

export default InterestPage;
