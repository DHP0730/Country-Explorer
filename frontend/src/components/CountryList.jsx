import CountryCard from './CountryCard'

function CountryList({ countries, onSelect, favorites, onToggleFavorite }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {countries.map(country => (
        <CountryCard
          key={country.cca3}
          country={country}
          onSelect={onSelect}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  )
}

export default CountryList
