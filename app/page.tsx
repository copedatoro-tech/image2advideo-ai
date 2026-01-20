"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [format, setFormat] = useState("9:16");
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
    setVideoReady(false);
  };

  const handleGenerate = () => {
    if (!image) return;
    setIsGenerating(true);
    setVideoReady(false);

    setTimeout(() => {
      setIsGenerating(false);
      setVideoReady(true);
    }, 3000);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 text-center">
        <h1 className="text-3xl font-bold text-purple-700 mb-2">
          Image2AdVideo
        </h1>
        <p className="text-gray-500 mb-6">
          Transformă o imagine de produs într-un videoclip publicitar AI
        </p>

        {/* Upload */}
        <label className="block mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <div className="cursor-pointer bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
            Adaugă imagine produs
          </div>
        </label>

        {/* Preview imagine */}
        {image && (
          <img
            src={image}
            alt="Preview"
            className="rounded-xl mb-4 mx-auto"
          />
        )}

        {/* Format */}
        <div className="mb-4 text-left">
          <label className="block mb-1 font-medium text-gray-700">
            Format video
          </label>
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-black bg-white"
          >
            <option value="9:16">9:16 – TikTok / Reels</option>
            <option value="16:9">16:9 – YouTube</option>
            <option value="1:1">1:1 – Instagram</option>
          </select>
        </div>

        {/* Generate */}
        <button
          onClick={handleGenerate}
          disabled={!image || isGenerating}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition disabled:opacity-50"
        >
          {isGenerating ? "Se generează..." : "Generează video publicitar"}
        </button>

        {/* Status */}
        {isGenerating && (
          <p className="text-sm text-gray-500 mt-3">
            Cererea a fost înregistrată ({format}). Video-ul este în curs de
            generare.
          </p>
        )}

        {/* Video rezultat */}
        {videoReady && (
          <div className="mt-6">
            <p className="text-green-600 font-semibold mb-3">
              ✔ Videoclipul tău publicitar este gata!
            </p>

            <video
              controls
              className="rounded-xl mb-3"
              src="/demo-video.mp4"
            />

            <a
              href="/demo-video.mp4"
              download
              className="block bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              Descarcă video
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
