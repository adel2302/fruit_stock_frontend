"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore"; // 🔥 Vérifie que l'import est correct

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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-3xl font-bold text-blue-600">Connexion</h1>
      <p className="text-gray-600 mt-2">Connectez-vous pour accéder à FruitStock 🍏</p>

      <form onSubmit={handleSubmit} className="bg-white p-6 mt-4 rounded-lg shadow-md w-80">
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
          className="w-full bg-blue-500 text-white p-2 rounded-lg shadow hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">{error}</p>}

      <p className="mt-4">
        Pas encore de compte ?{" "}
        <a href="/signup" className="text-blue-500 hover:underline">
          Inscrivez-vous
        </a>
      </p>
    </div>
  );
}
