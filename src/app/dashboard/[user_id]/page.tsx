"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion";

export default function Dashboard() {
  const router = useRouter();
  const params = useParams();
  const user_id = params.user_id as string;
  const { user, logout } = useAuthStore();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <p className="text-center text-white text-lg">Chargement...</p>;

  // 🔄 Fonction pour rafraîchir les données utilisateur avec redirection en cas de 401
  const refreshUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:4000/users/${user_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 401) {
        // 🔥 Redirige vers login si le token est expiré ou invalide
        logout();
        router.push("/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const data = await res.json();
      useAuthStore.getState().setUser(data, token);
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* ✅ Contenu principal */}
      <div className="flex flex-col items-center justify-center flex-grow text-center p-6">
        {/* ✅ Animation d'entrée avec Framer Motion */}
        <motion.h1
          className="text-4xl font-extrabold text-white drop-shadow-lg"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Bienvenue, {user.username} ! 🎉
        </motion.h1>

        <p className="text-gray-300 mt-2 text-lg">Email : {user.email}</p>

        {/* 🔥 Carte d'informations utilisateur */}
        <motion.div
          className="mt-6 bg-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md text-center border border-gray-700"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold text-gray-200">Informations du Compte</h2>

          {/* ✅ Effet dynamique sur le solde */}
          <motion.p
            className="text-green-400 text-2xl font-bold mt-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            💰 Solde USDT : {user.balance_usdt} USDT
          </motion.p>

          <p className="text-gray-400 mt-3">
            <strong>Statut :</strong> 
            <span className={`ml-2 font-medium ${user.status === "active" ? "text-green-400" : user.status === "banned" ? "text-red-400" : "text-yellow-400"}`}>
              {user.status === "active" ? "✅ Actif" : user.status === "banned" ? "❌ Banni" : "⚠️ Suspendu"}
            </span>
          </p>

          <p className="text-gray-400 mt-2">
            <strong>Rôle :</strong> 
            <span className={`ml-2 font-medium ${user.role === "admin" ? "text-purple-400" : "text-blue-400"}`}>
              {user.role === "admin" ? "🛠️ Administrateur" : "👤 Utilisateur"}
            </span>
          </p>

          {/* 🔄 Bouton "Actualiser les Données" */}
          <button
            onClick={refreshUserData}
            className="mt-6 w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            🔄 Actualiser les données
          </button>
        </motion.div>

        {/* 🔥 Bouton de Déconnexion */}
        <button
          onClick={() => {
            logout();
            router.push("/");
          }}
          className="mt-6 px-8 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition duration-300 ease-in-out transform hover:scale-105"
        >
          🚪 Déconnexion
        </button>
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
