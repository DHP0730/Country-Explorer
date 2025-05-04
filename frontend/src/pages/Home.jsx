import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios'
import SearchBar from '../components/SearchBar'
import FilterMenu from '../components/FilterMenu'
import CountryList from '../components/CountryList'
import CountryDetails from '../components/CountryDetails'
import Navbar from '../components/Navbar'

function Home() {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [favorites, setFavorites] = useState([])

  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(res => {
        setCountries(res.data)
        setFilteredCountries(res.data)
      })
      .catch(err => console.error("Failed to fetch countries:", err))

    // Load favorites from DB
    if (token) {
      axios.get('http://localhost:4000/api/favorites', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setFavorites(res.data))
        .catch(err => console.error("Failed to load favorites:", err))
    }
  }, [token])

  const handleSearch = async (name) => {
    if (!name) {
      setFilteredCountries(countries)
      return
    }
    try {
      const res = await axios.get(`https://restcountries.com/v3.1/name/${name}`)
      setFilteredCountries(res.data)
    } catch {
      setFilteredCountries([])
    }
  }

  const handleFilter = async (region) => {
    if (region === 'All') {
      setFilteredCountries(countries)
    } else {
      const res = await axios.get(`https://restcountries.com/v3.1/region/${region}`)
      setFilteredCountries(res.data)
    }
  }

  const handleSelect = async (code) => {
    const res = await axios.get(`https://restcountries.com/v3.1/alpha/${code}`)
    setSelectedCountry(res.data[0])
  }

  const toggleFavorite = async (country) => {
    if (!token) return alert("You must be logged in to favorite a country");
  
    const exists = favorites.some(fav => fav.cca3 === country.cca3);
    console.log("Favorites array:", favorites);
    
    if (exists) {
      try {
        await axios.delete(`http://localhost:4000/api/favorites/${country.cca3}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites(favorites.filter(fav => fav.cca3 !== country.cca3));
      } catch (err) {
        console.error("Failed to remove favorite:", err);
      }
    } else {
      try {
        await axios.post(`http://localhost:4000/api/favorites`, country, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFavorites([...favorites, country]); // Update favorites in the state
      } catch (err) {
        console.error("Failed to add favorite:", err);
      }
    }
  };
  

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Navbar />
      <div className='container mx-auto px-28 py-28 flex-grow'>
        {!selectedCountry && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">Country Explorer</h1>
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <SearchBar onSearch={handleSearch} />
              <FilterMenu onFilter={handleFilter} />
            </div>
          </>
        )}
        {selectedCountry ? (
          <CountryDetails country={selectedCountry} onBack={() => setSelectedCountry(null)} />
        ) : (
          <CountryList
            countries={filteredCountries}
            onSelect={handleSelect}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </div>
    </div>
  )
}

export default Home
