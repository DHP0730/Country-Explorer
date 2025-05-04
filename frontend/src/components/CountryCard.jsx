import { FaHeart, FaRegHeart } from "react-icons/fa";

function CountryCard({ country, onSelect, favorites = [], onToggleFavorite }) {
  const isFavorite = favorites.some(fav => 
    fav.cca3 === country.cca3 || fav.countryCode === country.cca3
  );

  return (
    <div
      className="bg-gray-900 p-4 shadow rounded cursor-pointer hover:bg-gray-800"
      onClick={() => onSelect(country.cca3)}
    >
      <img
        src={country?.flags?.png || country?.flag || "/fallback.png"}
        alt={`Flag of ${country?.name?.common || country?.name || "Unknown"}`}
        className="w-full h-50"
      />
      
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-xl font-semibold">
          {country.name?.common || country.name || "Unknown"}
        </h2>
        <div
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(country);
          }}
          className="text-indigo-500 text-lg cursor-pointer"
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>
      </div>

      <p><strong>Capital:</strong> {Array.isArray(country.capital) ? country.capital[0] : country.capital || "N/A"}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
    </div>
  );
}

export default CountryCard;
