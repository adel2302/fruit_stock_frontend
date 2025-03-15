"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"; // 🔥 Importation du store Zustand

export default function Signup() {
  const router = useRouter();
  const { setUser } = useAuthStore(); // 🔥 Stocke l’utilisateur après inscription
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      const data = await res.json();
      setUser(data.user, data.token); // 🔥 Stocke l'utilisateur & le token immédiatement

      console.log("Utilisateur créé et stocké :", data.user); // 🔥 Vérification
      router.push(`/dashboard/${data.user.id}`); // 🔥 Redirige directement vers Dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-green-600">Inscription</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 mt-4 rounded-lg shadow-md w-80">
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full p-2 mb-2 border rounded text-black"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-2 border rounded text-black"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          className="w-full p-2 mb-2 border rounded text-black"
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-lg shadow hover:bg-green-600"
          disabled={loading}
        >
          {loading ? "Inscription..." : "S'inscrire"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
