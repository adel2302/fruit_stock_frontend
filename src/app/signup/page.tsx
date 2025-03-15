"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"; // 🔥 Importation du store Zustand
import { motion } from "framer-motion"; // ✅ Animation

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
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* ✅ Contenu principal */}
      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
        {/* ✅ Animation d'entrée */}
        <motion.h1
          className="text-4xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Inscription 🚀
        </motion.h1>
        
        {/* 🔥 Carte du formulaire */}
        <motion.div
          className="mt-6 bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="Nom d'utilisateur"
              className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Mot de passe"
              className="w-full p-3 border rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
              disabled={loading}
            >
              {loading ? "Inscription..." : "S'inscrire"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </motion.div>

        {/* 🔄 Redirection vers la connexion */}
        <p className="mt-6">
          Déjà un compte ?{" "}
          <a href="/login" className="text-blue-400 font-semibold underline hover:text-blue-200">
            Connectez-vous
          </a>
        </p>
      </div>

      {/* ✅ Footer */}
      <footer className="py-6 bg-gray-800 text-center text-gray-400 text-sm">
        <p>&copy; 2025 FruitStock. Tous droits réservés.</p>
        <div className="flex justify-center space-x-4 mt-2">
          <a href="#" className="hover:text-blue-400 transition">Conditions d'utilisation</a>
          <a href="#" className="hover:text-blue-400 transition">Politique de confidentialité</a>
          <a href="#" className="hover:text-blue-400 transition">Assistance</a>
        </div>
      </footer>
    </div>
  );
}
