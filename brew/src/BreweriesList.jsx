import React, { useState, useEffect } from 'react';
import './App.css'
const BreweriesList = () => {
    const [breweries, setBreweries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
      micro: false,
      large: false,
      closed: false,
    });
  
    useEffect(() => {
      fetch('https://api.openbrewerydb.org/v1/breweries')
        .then(response => response.json())
        .then(data => setBreweries(data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);
  
    const handleSearch = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const handleFilterChange = (event) => {
      setFilters({
        ...filters,
        [event.target.name]: event.target.checked,
      });
    };
  
    const filteredBreweries = breweries.filter(brewery => {
      const matchesSearchTerm = brewery.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilters = filters[brewery.brewery_type] || Object.values(filters).every(filter => !filter);
      return matchesSearchTerm && matchesFilters;
    });
  
    return (
      <div className="breweries-list">
        <h1>Brews Room</h1>
        <h3>Take a look at different breweries across the country!</h3>
        <input
          type="text"
          placeholder="Search by brewery name..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="filters">
          <label>
            <input
              type="checkbox"
              name="micro"
              checked={filters.micro}
              onChange={handleFilterChange}
            />
            Micro
          </label>
          <label>
            <input
              type="checkbox"
              name="large"
              checked={filters.large}
              onChange={handleFilterChange}
            />
            Large
          </label>
          <label>
            <input
              type="checkbox"
              name="closed"
              checked={filters.closed}
              onChange={handleFilterChange}
            />
            Closed
          </label>
        </div>
        <h2>API FETCH DATA:{filteredBreweries.length} Breweries|30 Micro|7 Large|2 Closed </h2>
        <ul>
          {filteredBreweries.map(brewery => (
            <li key={brewery.id}>
              <h2>{brewery.name}</h2>
              <p>Type: {brewery.brewery_type}</p>
              <p>Address: {brewery.street}, {brewery.city}, {brewery.state_province}, {brewery.postal_code}</p>
              <p>Phone: {brewery.phone}</p>
              <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default BreweriesList;