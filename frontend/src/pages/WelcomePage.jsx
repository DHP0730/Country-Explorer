import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const WelcomePage = () => {
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.2) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden text-center">
      {/* 🌐 Centered Animated Globe Background */}
        <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzEzODNleDBibmJ1aWZxaGVrNzNscmE3ODd1OWF5YXNxNjJqcGQwbyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/lnsTFyT6wUzItXsUV5/giphy.gif"
        alt="Background Globe"
        className="absolute opacity-20 z-10"
        style={{
            width: '650px',
            height: '650px',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        />

      {/* Optional dark overlay */}
      <div className="absolute inset-0 bg-black z-0" />

      {/* Content */}
      <header className="w-full max-w-6xl flex justify-between items-center p-4 absolute top-0 z-10">
        <h1 className="text-2xl font-bold text-indigo-500">CountryExplorer</h1>
        <div className="flex space-x-4">
          <Link
            to="/login"
            className="px-4 py-2 text-indigo-500 font-medium rounded-lg hover:bg-indigo-100 transition-colors"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-300 transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <main className="flex flex-col items-center z-10 max-w-4xl mt-20">
        <h1 className="text-5xl font-bold text-white mb-6">
          Discover the World with <span className="text-indigo-500">CountryExplorer</span>
        </h1>
        <p className="text-xl text-gray-200 mb-10 max-w-2xl">
          Explore detailed information about every country, from population statistics to cultural insights. 
          Plan your next adventure or satisfy your curiosity about our diverse world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <Link
            to="/home"
            className="px-8 py-3 border-2 border-indigo-500 text-indigo-500 font-medium rounded-lg hover:bg-indigo-100 transition-colors text-lg"
          >
            Find countries
          </Link>
        </div>
      </main>

      {/* Removed static globe image here since it's now a background */}

      <footer className="w-full max-w-6xl p-4 absolute bottom-0 text-center text-gray-500 text-sm z-10">
        © {new Date().getFullYear()} CountryExplorer. All rights reserved.
      </footer>
    </div>
  );
};

export default WelcomePage;
