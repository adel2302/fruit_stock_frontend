import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-4xl font-bold text-green-600">Bienvenue sur FruitStock 🍏</h1>
      <p className="text-lg text-gray-600 mt-2">
        Achetez, collectionnez et échangez des fruits numériques rares ! 🍍🍓🍌
      </p>
      <p className="text-lg text-gray-600 mt-2">
        Avec BlaBla faite Fruitctifier votre argent ! 🍍🍓🍌
      </p>

      <div className="mt-6 flex space-x-4">
        <Link href="/signup">
          <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600">
            Inscription
          </button>
        </Link>

        <Link href="/login">
          <button className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800">
            Connexion
          </button>
        </Link>
      </div>
    </div>
  );
}
