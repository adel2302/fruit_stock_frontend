"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { motion } from "framer-motion"; // 🔥 Importation de Framer Motion

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

  if (!user) return <p className="text-center">Chargement...</p>;

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
  
      if (!res.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
  
      const data = await res.json();
      useAuthStore.getState().setUser(data, token); // 🔥 Met à jour les infos utilisateur sans reload
    } catch (error) {
      console.error("Erreur :", error);
    }
  };  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* ✅ Animation d'entrée avec Framer Motion */}
      <motion.h1
        className="text-3xl font-bold text-green-600"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Bienvenue, {user.username} !
      </motion.h1>

      <p className="text-gray-600">Email : {user.email}</p>

      <div className="mt-4 bg-white shadow-lg rounded-lg p-6 w-80 text-center">
        <h2 className="text-xl font-semibold">Informations du Compte</h2>

        {/* ✅ Ajout d'un effet dynamique sur le solde */}
        <motion.p
          className="text-green-500 text-lg font-bold mt-2"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Solde USDT : {user.balance_usdt} USDT
        </motion.p>

        <p><strong>Statut :</strong> {user.status === "active" ? "✅ Actif" : user.status === "banned" ? "❌ Banni" : "⚠️ Suspendu"}</p>
        <p><strong>Rôle :</strong> {user.role === "admin" ? "🛠️ Administrateur" : "👤 Utilisateur"}</p>
      </div>

      <button
        onClick={refreshUserData}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
      >
        🔄 Actualiser les données
      </button>

      {/* ✅ Bouton de Déconnexion */}
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="mt-6 px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
}
