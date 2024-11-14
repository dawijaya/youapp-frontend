"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPen, FaPlus } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";

export default function AboutForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [horoscope, setHoroscope] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [editing, setEditing] = useState({ about: false, interest: false });

  // Fungsi untuk mengirim data profile ke API
  const sendProfileData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    const aboutData = JSON.parse(localStorage.getItem("aboutData") || "{}");
    const interestsData = JSON.parse(localStorage.getItem("interests") || "[]");

    if (aboutData && interestsData.length > 0) {
      const profileData = {
        name: aboutData.name || "",
        birthday: aboutData.birthday || "",
        height: aboutData.height || 0,
        weight: aboutData.weight || 0,
        interests: interestsData,
      };

      try {
        const response = await fetch("/api/createProfile", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token, // Gunakan x-access-token
          },
          body: JSON.stringify(profileData),
        });

        if (response.ok) {
          console.log("Profile berhasil dikirim");
        } else {
          console.error("Gagal mengirim profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error saat mengirim profile:", error);
      }
    }
  };

  // useEffect untuk mengirim data profile jika sudah ada di localStorage
  useEffect(() => {
    const aboutData = localStorage.getItem("aboutData");
    const interestsData = localStorage.getItem("interests");

    if (aboutData && interestsData) {
      sendProfileData();
    }
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) return;

    try {
      const response = await fetch("/api/getProfile", {
        method: "GET",
        headers: {
          "x-access-token": token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        const profileData = result.data; // Ambil data dari respons API

        setName(profileData.name || "");
        setBirthday(profileData.birthday || "");
        setHeight(profileData.height || 0);
        setWeight(profileData.weight || 0);
        setHoroscope(profileData.horoscope || ""); // Tambahkan horoscope
        setZodiac(profileData.zodiac || ""); // Tambahkan zodiac
        setInterests(profileData.interests || []);
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // Ambil data dari API atau localStorage saat komponen pertama kali dimuat
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      router.push("/"); // Arahkan ke login jika token tidak ada
      return;
    }

    // Coba fetch data dari API
    fetchProfileData();

    // Jika tidak ada data dari API, gunakan data dari localStorage
    const aboutData = JSON.parse(localStorage.getItem("aboutData") || "{}");
    if (!name && aboutData) {
      setName(aboutData.name || "");
      setBirthday(aboutData.birthday || "");
      setHeight(aboutData.height || 0);
      setWeight(aboutData.weight || 0);
    }

    const storedInterests = JSON.parse(
      localStorage.getItem("interests") || "[]"
    );
    if (interests.length === 0) {
      setInterests(storedInterests);
    }
  }, []);

  const handleSave = async (section: string) => {
    setEditing((prev) => ({ ...prev, [section]: false }));

    if (section === "about") {
      // Simpan data "about" ke localStorage
      const aboutData = {
        name,
        birthday,
        height,
        weight,
      };
      localStorage.setItem("aboutData", JSON.stringify(aboutData));
      console.log("Data 'about' tersimpan di localStorage:", aboutData);

      // Ambil token untuk otentikasi
      const token = localStorage.getItem("access_token");

      if (token) {
        const profileData = {
          name,
          birthday,
          height,
          weight,
          interests, // jika ada data interest yang ingin dikirim
        };

        try {
          // Kirim data ke API dengan metode PUT untuk pembaruan
          const response = await fetch("/api/updateProfile", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-access-token": token, // Gunakan token untuk otentikasi
            },
            body: JSON.stringify(profileData),
          });

          if (response.ok) {
            console.log("Profile berhasil diperbarui di API");
          } else {
            console.error(
              "Gagal memperbarui profile di API:",
              response.statusText
            );
          }
        } catch (error) {
          console.error("Terjadi kesalahan saat mengirim data ke API:", error);
        }
      }

      // Refresh halaman setelah mengirim data ke API
      router.refresh();
    }
  };

  const handleLogout = () => {
    // Menghapus access token dari localStorage
    localStorage.removeItem("access_token");

    // Arahkan pengguna ke halaman login
    router.push("/"); // Sesuaikan dengan rute login Anda
  };

  return (
    <>
      <header className="flex items-center pt-4 bg-black">
        <div className="p-2 rounded-lg">
          <img src="/logo.jpeg" width={40} alt="logo" />
        </div>
        <h1 className="flex-1 text-center text-lg font-semibold">{name}</h1>
        {/* Ikon logout */}
        <button
          onClick={handleLogout}
          className="text-red-600 flex-2 hover:text-gray-400 p-2"
          aria-label="Logout">
          <IoLogOutOutline size={24} />
        </button>
      </header>
      <div className="flex justify-center p-4">
        <div className="max-w-md w-full h-72 bg-[url('/profil.png')] bg-cover bg-center rounded-lg p-4 text-center flex flex-col items-center relative">
          {/* Username di sudut kiri bawah */}
          <p className="absolute bottom-16 left-4 text-lg font-medium text-white">
            {name}
          </p>
          <p className="absolute bottom-4 bg-gray-600 rounded-lg p-1 left-4 text-sm font-medium text-white">
            {horoscope}
          </p>
          <p className="absolute bottom-4 bg-gray-600 rounded-lg p-1 left-28 text-sm font-medium text-white">
            {zodiac}
          </p>
        </div>
      </div>
      {/* About Section */}
      <div className="bg-gray-900 rounded-lg p-4 flex items-start space-x-2 relative">
        <div className="flex-1">
          <p className="text-sm font-medium">About</p>
          {editing.about ? (
            <div className="space-y-4 mt-4">
              {/* Input untuk add gambar/foto */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center justify-center w-24 h-24 bg-gray-700 rounded-full cursor-pointer hover:bg-gray-600">
                  <FaPlus className="text-gray-400 text-xl" />
                </label>
                <span className="text-gray-400 text-sm">Add image</span>
              </div>

              {/* Form untuk input detail */}
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">
                  Display name:
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  readOnly={!editing.about}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Birthday:</label>
                <input
                  type="date"
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  readOnly={!editing.about}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">
                  Horoscope:
                </label>
                <input
                  type="text"
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  placeholder="--"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Zodiac:</label>
                <input
                  type="text"
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  placeholder="--"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Height:</label>
                <input
                  type="number"
                  placeholder="Add height"
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  readOnly={!editing.about}
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Weight:</label>
                <input
                  type="number"
                  placeholder="Add weight"
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  readOnly={!editing.about}
                />
              </div>
            </div>
          ) : name || birthday || height || weight ? (
            <div className="space-y-4 mt-4">
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">
                  Display name:
                </label>
                <input
                  type="text"
                  value={name}
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Birthday:</label>
                <input
                  type="date"
                  value={birthday}
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">
                  Horoscope:
                </label>
                <input
                  type="text"
                  value={horoscope}
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Zodiac:</label>
                <input
                  type="text"
                  value={zodiac}
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Height:</label>
                <input
                  type="text"
                  value={`${height} cm`} // Menampilkan nilai height dengan "cm" di dalam input
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  readOnly
                />
              </div>
              <div className="flex items-center space-x-2">
                <label className="w-1/3 text-gray-400 text-sm">Weight:</label>
                <input
                  type="text"
                  value={`${weight} kg`} // Menampilkan nilai weight dengan "kg" di dalam input
                  className="w-2/3 p-2 bg-gray-700 rounded-lg text-gray-200"
                  readOnly
                />
              </div>
            </div>
          ) : (
            <p className="mt-2 text-gray-400">
              Add in your about to help others know you better
            </p>
          )}
        </div>

        {editing.about ? (
          <button
            onClick={() => handleSave("about")}
            className="absolute top-3 right-4 text-yellow-500 py-1 px-2 rounded-lg">
            Save & Update
          </button>
        ) : (
          <button
            onClick={() =>
              setEditing((prev) => ({ ...prev, about: !prev.about }))
            }
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
            <FaPen />
          </button>
        )}
      </div>

      {/* Interest Section */}
      <div className="bg-gray-900 rounded-lg p-4  flex items-start space-x-2 relative">
        <div className="flex-1">
          <p className="text-sm font-medium">Interest</p>
          {interests.length > 0 ? (
            <div className="flex flex-wrap items-center gap-2 mt-2">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-gray-800 px-3 py-1 rounded-full text-sm text-gray-400">
                  {interest}
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-2 text-gray-400">
              Add in your interest to find a better match
            </p>
          )}
        </div>
        <button
          onClick={() => router.push("/interest")}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-300">
          <FaPen />
        </button>
      </div>
    </>
  );
}
