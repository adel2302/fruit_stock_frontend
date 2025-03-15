"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Home() {
  // 🔥 Modifier cette valeur pour tester différentes phases (1, 2, 3 ou 4 pour le Grand Opening)
  const [phaseActuelle, setPhaseActuelle] = useState(1);

  // 🔹 Définition des phases
  const phases = [
    { id: 1, title: "Phase 1", price: "0.1 USDT", status: "Terminée" },
    { id: 2, title: "Phase 2", price: "0.3 USDT", status: "En cours" },
    { id: 3, title: "Phase 3", price: "0.4 USDT", status: "À venir" },
    { id: 4, title: "Grand Opening", price: "0.5 USDT", status: "Ouverture" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      
      {/* ✅ Section Hero */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <motion.h1
          className="text-5xl font-bold tracking-tight leading-tight"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          FruitStock : Investissez autrement
        </motion.h1>
        <p className="text-xl text-white mt-3 font-medium">
          Achetez, collectionnez et échangez des fruits numériques rares ! 🍍🍓🍌
        </p>
        <p className="text-lg text-white mt-2 italic">
          Avec FruitStock, faites fructifier votre argent ! 🚀
        </p>
      </section>

      {/* ✅ Section Explication */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-semibold text-blue-400">
              📈 Un Marché Innovant
            </h2>
            <p className="mt-4 text-gray-300">
              FruitStock est une <strong>plateforme d’investissement nouvelle génération</strong>, offrant un modèle unique  
              où la valeur des actifs augmente chaque jour entre <strong>+1.5% et +3.5%</strong>.
            </p>

            <p className="mt-6 text-gray-300 leading-relaxed">
              🏆 <strong>Après le Grand Opening, la place de marché FruitStock s'ouvre à tous !</strong>  
            </p>

            <p className="mt-3 text-gray-300 leading-relaxed">
              Une fois la période de prévente terminée, vous pourrez <strong>mettre en vente librement vos fruits auprès des autres utilisateurs</strong>.  
              et <strong>profitez pleinement d’un marché en pleine croissance.</strong>  
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>✅ Actifs numériques stables et sécurisés</li>
              <li>✅ Achat en <strong>USDT</strong> et <strong>USDC</strong></li>
              <li>✅ Revente simplifiée sur notre marketplace</li>
            </ul>
          </div>
          <div>
            <h2 className="text-3xl font-semibold text-blue-400">
              Comment ça fonctionne ?
            </h2>
            <p className="mt-4 text-gray-300">
              FruitStock vous permet d’<strong>acheter</strong> des actifs numériques sous forme de fruits  
              qui prennent automatiquement de la valeur avec le temps. Plus vous les conservez,  
              plus leur prix grimpe.
            </p>
            <p className="mt-3 text-gray-300 leading-relaxed">
              Après le Grand Openning et quand vous êtes prêt, revendez-les et récoltez vos bénéfices. <strong>Simple, sécurisé et rentable !</strong> 🚀
            </p>

            <p className="mt-4 text-green-400 font-semibold text-lg">
              📈 <strong>Plus vous investissez tôt, plus vos fruits prendront de la valeur pour la revente sur la marketplace !</strong>
            </p>

            <ul className="mt-6 space-y-3 text-gray-300">
              <li>1️⃣ <strong>Achetez</strong> des fruits numériques avec vos USDT / USDC.</li>
              <li>2️⃣ <strong>Conservez-les</strong> pour voir leur valeur augmenter.</li>
              <li>3️⃣ <strong>Revendez-les</strong> sur la marketplace à tout moment.</li>
            </ul>

            <p className="mt-3 text-gray-300 leading-relaxed">
              🚀 <strong>Investissez maintenant et regardez vos actifs fructifier !</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ✅ Section Explication des Prix */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold text-blue-400">💰 Évolution du Prix des Fruits</h2>
        <p className="mt-4 text-gray-300 leading-relaxed">
          FruitStock fonctionne sur un <strong>modèle progressif de valorisation</strong>.  
          <strong>Plus tôt vous investissez, plus le prix est avantageux.</strong>
        </p>

        <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-md">
          <ul className="text-gray-300 space-y-4">
            <li>📌 <strong>Phase 1</strong> (1000 premiers inscrits) → <strong>0.1 USDT</strong> ✅ Meilleur prix</li>
            <li>📌 <strong>Phase 2</strong> (1000 suivants) → <strong>0.3 USDT</strong> 🚀 Prix encore attractif</li>
            <li>📌 <strong>Phase 3</strong> (1000 derniers) → <strong>0.4 USDT</strong> 🔥 Dernière opportunité</li>
            <li>🎉 <strong>Grand Opening</strong> → <strong>0.5 USDT</strong> 🏆 Prix de départ du marché officiel</li>
          </ul>
          <p className="mt-4 text-green-400 font-semibold">
            📈 <strong>Investissez tôt pour maximiser vos gains !</strong> 🚀
          </p>
        </div>
      </section>

      {/* ✅ Frise Chronologique Verticale */}
      <section className="flex flex-col items-center py-20">
        <h2 className="text-3xl font-semibold text-blue-400 mb-8">📅 Progression de la Pre-Sales</h2>

        <div className="relative flex flex-col items-start space-y-10">
          {/* 🔥 Ligne de progression */}
          <div className="absolute left-5 top-0 h-full w-1 bg-gray-500">
            <motion.div
              className="w-1 bg-blue-400"
              initial={{ height: "0%" }}
              animate={{ height: `${(phaseActuelle / 4) * 100}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>

          {/* 🔥 Étapes de la frise */}
          {phases.map((phase) => (
            <div key={phase.id} className="relative flex items-center space-x-6">
              {/* ✅ Cercle de progression */}
              <motion.div
                className={`w-10 h-10 flex items-center justify-center rounded-full border-4 ${
                  phase.id <= phaseActuelle ? "border-blue-400 bg-blue-600" : "border-gray-500 bg-gray-700"
                }`}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                {phase.id}
              </motion.div>

              {/* ✅ Texte à droite des cercles */}
              <div>
                <p className="text-xl font-semibold">{phase.title}</p>
                <p className="text-sm text-gray-300">{phase.price}</p>
                <p className={`text-xs font-semibold mt-1 ${phase.id === phaseActuelle ? "text-green-400" : "text-gray-400"}`}>
                  {phase.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Boutons sous la frise et avant la partie Sécurité */}
      <section className="flex flex-col items-center py-20">
      <div className="flex justify-center mt-12 space-x-6">
        <Link href="/signup">
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md shadow-md hover:bg-blue-700 transition duration-300">
            📝 Ouvrir un Compte
          </button>
        </Link>
        <Link href="/login">
          <button className="px-6 py-3 bg-gray-700 text-white font-medium rounded-md shadow-md hover:bg-gray-800 transition duration-300">
            🔐 Connexion
          </button>
        </Link>
      </div>
    </section>

      {/* ✅ Section Sécurité */}
      <section className="bg-gray-800 py-16 text-center">
        <h2 className="text-3xl font-semibold text-blue-400">
          🔒 Sécurité et Transparence
        </h2>
        <p className="mt-4 text-gray-300 max-w-3xl mx-auto">
          Nous utilisons les dernières technologies blockchain pour garantir la fiabilité des transactions.  
          Tous les actifs numériques sont protégés par des <strong>protocoles avancés de cryptographie</strong>.
        </p>
      </section>

      {/* ✅ Footer */}
      <footer className="py-10 text-center text-gray-400">
        &copy; 2025 FruitStock. Tous droits réservés.
      </footer>
    </div>
  );
}
