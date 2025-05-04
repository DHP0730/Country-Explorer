import React, { useEffect, useState } from "react";
import axios from "axios";
import CountryCard from "../components/CountryCard";
import CountryDetails from "../components/CountryDetails";
import Navbar from "../components/Navbar";
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      window.alert('You are not logged in. Redirecting to login page...');
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (token) {
      axios.get("http://localhost:4000/api/favorites", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => {
        setFavorites(res.data);
      })
      .catch((err) => console.error("Failed to load favorites:", err));
    }
  }, [token]);

  const handleSelect = async (code) => {
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`);
      setSelectedCountry(res.data[0]);
    } catch (err) {
      console.error("Failed to fetch country details:", err);
    }
  };

  const handleRemoveFavorite = async (countryToRemove) => {
    try {
      await axios.delete(`http://localhost:4000/api/favorites/${countryToRemove.countryCode}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setFavorites(favorites.filter((c) => c.countryCode !== countryToRemove.countryCode));
    } catch (err) {
      console.error("Failed to remove favorite:", err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className="px-14 py-30">
        {!selectedCountry ? (
          <>
            <h1 className="text-2xl font-bold mb-4">My Favorite Countries</h1>
            {favorites.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {favorites.map((country) => (
                  <div key={country.countryCode} className="relative">
                    <CountryCard
                      country={country}
                      onSelect={() => handleSelect(country.countryCode)}
                      favorites={favorites}
                      onToggleFavorite={handleRemoveFavorite}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No favorites added yet.</p>
            )}
          </>
        ) : (
          <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        )}
      </div>
    </div>
  );
}

export default Favorites;
