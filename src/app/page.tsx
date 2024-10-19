import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-grow items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-600 text-white">
      <header className="text-center mb-10">
        <h1 className="text-5xl font-bold">
          Connect with Fellow Sports Enthusiasts
        </h1>
        <p className="mt-4 text-lg">
          Share your experiences, tips, and stories!
        </p>
      </header>

      <section className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-gray-600 mb-6">
          Whether you’re a player, coach, or fan, our platform allows you to
          share your sports journey.
        </p>
        <Link href="/signin">
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded transition duration-300">
            Get Started
          </button>
        </Link>
      </section>
    </div>
  );
}
