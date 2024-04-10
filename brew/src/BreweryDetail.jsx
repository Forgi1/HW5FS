import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const BreweryDetail = () => {
  const { id } = useParams();
  const [brewery, setBrewery] = useState(null);

  useEffect(() => {
    fetch(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then(response => response.json())
      .then(data => setBrewery(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [id]);

  if (!brewery) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{brewery.name}</h1>
      <p>Type: {brewery.brewery_type}</p>
      <p>Address: {brewery.street}, {brewery.city}, {brewery.state_province}, {brewery.postal_code}</p>
      <p>Phone: {brewery.phone}</p>
      {brewery.website_url && <a href={brewery.website_url} target="_blank" rel="noopener noreferrer">Visit Website</a>}
    </div>
  );
};

export default BreweryDetail;
