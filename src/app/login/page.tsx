"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"; // 🔥 Vérifie que l'import est correct
import { motion } from "framer-motion"; // ✅ Animation

export default function Login() {
  const router = useRouter();
  const { user, restoreUser, setUser } = useAuthStore(); // 🔥 Assure-toi que restoreUser est bien récupéré

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 🔥 Restauration de l'utilisateur dès le chargement de la page
  useEffect(() => {
    restoreUser(); // 🔥 Si l'utilisateur a un token valide, il est restauré
  }, []);

  // 🔥 Redirection automatique si l'utilisateur est déjà connecté
  useEffect(() => {
    console.log("User après restauration :", user); // 🔥 Debugging
    if (user) {
      router.push(`/dashboard/${user.id}`);
    }
  }, [user, router]);

  // Gestion du changement de champ dans le formulaire
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 Fonction de connexion
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:4000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Email ou mot de passe incorrect");
      }

      const data = await res.json();
      setUser(data.user, data.token); // 🔥 Stocke user & token via Zustand

      router.push(`/dashboard/${data.user.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de connexion");
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
          Connexion 🔐
        </motion.h1>
        <p className="text-gray-300 mt-2 text-lg">Connectez-vous pour accéder à FruitStock 🍏</p>

        {/* 🔥 Carte du formulaire */}
        <motion.div
          className="mt-6 bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
              {loading ? "Connexion..." : "Se connecter"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </motion.div>

        {/* 🔄 Redirection vers l'inscription */}
        <p className="mt-6">
          Pas encore de compte ?{" "}
          <a href="/signup" className="text-blue-400 font-semibold underline hover:text-blue-200">
            Inscrivez-vous
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
