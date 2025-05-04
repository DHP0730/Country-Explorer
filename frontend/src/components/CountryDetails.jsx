function CountryDetails({ country, onBack }) {
  return (
    <div className="max-w-4xl mx-auto p-4 text-gray-100">
      <button 
        onClick={onBack} 
        className="flex items-center gap-2 mb-6 px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-lg transition-colors duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Countries
      </button>

      <div className="bg-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-700">
        <div className="md:flex">
          {/* Flag Image */}
          <div className="md:w-1/3 p-6 flex items-center justify-center bg-gray-900">
            <img 
              src={country.flags.png} 
              alt={`Flag of ${country.name.common}`} 
              className="w-full max-w-xs h-auto border-2 border-gray-700 rounded-lg shadow-lg"
            />
          </div>

          {/* Country Details */}
          <div className="md:w-2/3 p-6">
            <h2 className="text-3xl font-bold text-white mb-3">{country.name.common}</h2>
            {country.name.official && (
              <p className="text-gray-400 italic mb-6">{country.name.official}</p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <DetailItem label="Capital" value={country.capital?.[0] || 'N/A'} />
              <DetailItem label="Region" value={country.region} />
              <DetailItem label="Subregion" value={country.subregion || 'N/A'} />
              <DetailItem label="Population" value={country.population.toLocaleString()} />
              {country.languages && (
                <DetailItem 
                  label="Languages" 
                  value={Object.values(country.languages).join(', ')} 
                />
              )}
              <DetailItem label="Currency" value={
                country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ') : 'N/A'
              } />
              <DetailItem label="Timezone" value={country.timezones?.join(', ') || 'N/A'} />
            </div>

            {(country.coatOfArms?.png || country.borders) && (
              <div className="mt-6 pt-6 border-t border-gray-700 flex flex-wrap gap-4 items-start">
                {country.coatOfArms?.png && (
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-lg font-semibold text-gray-300 mb-3">Coat of Arms</h3>
                    <div className="bg-gray-900 p-3 rounded-lg inline-block">
                      <img 
                        src={country.coatOfArms.png} 
                        alt={`Coat of arms of ${country.name.common}`}
                        className="h-24 object-contain"
                      />
                    </div>
                  </div>
                )}
                {country.borders && (
                  <div className="flex-1 min-w-[200px]">
                    <h3 className="text-lg font-semibold text-gray-300 mb-3">Bordering Countries</h3>
                    <div className="bg-gray-900 p-3 rounded-lg">
                      <ul className="grid grid-cols-2 gap-2">
                        {country.borders.map(border => (
                          <li key={border} className="text-white py-1 px-2 bg-gray-800 rounded">
                            {border}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}  
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Keep the DetailItem component exactly the same
function DetailItem({ label, value }) {
  return (
    <div className="bg-gray-700 hover:bg-gray-600 p-3 rounded-lg transition-colors duration-200">
      <dt className="text-sm font-medium text-gray-400">{label}</dt>
      <dd className="mt-1 text-lg font-semibold text-white">{value}</dd>
    </div>
  );
}

export default CountryDetails;