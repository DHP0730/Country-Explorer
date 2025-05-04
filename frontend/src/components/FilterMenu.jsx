function FilterMenu({ onFilter }) {
    const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania']
  
    return (
      <select onChange={(e) => onFilter(e.target.value)} className="p-2 border rounded">
        {regions.map(region => (
          <option className="bg-black text-white"key={region} value={region}>{region}</option>
        ))}
      </select>
    )
  }
  
export default FilterMenu
  