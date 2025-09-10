import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// You should store your Mapbox token in an environment variable
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic3ZpajI4IiwiYSI6ImNtZmRuamh1ZDAzZjEyam9lbnQyZ2wyZ3EifQ.kac5rqRXjrS3QRkSTkYTpA';

// A simple debounce function to limit API calls
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function App() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');

  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);

  const getSuggestions = async (query, setter) => {
    if (query.length < 2) {
      setter([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_ACCESS_TOKEN}&autocomplete=true`
      );
      const data = await response.json();
      setter(data.features || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setter([]);
    }
  };

  // Create debounced versions of the fetch function
  const debouncedGetPickupSuggestions = useCallback(debounce(getSuggestions, 300), []);
  const debouncedGetDestinationSuggestions = useCallback(debounce(getSuggestions, 300), []);

  useEffect(() => {
    debouncedGetPickupSuggestions(pickup, setPickupSuggestions);
  }, [pickup, debouncedGetPickupSuggestions]);

  useEffect(() => {
    debouncedGetDestinationSuggestions(destination, setDestinationSuggestions);
  }, [destination, debouncedGetDestinationSuggestions]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pickup && destination) {
      try {
        const response = await fetch('http://localhost:5000/api/ride', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pickup, destination }),
        });

        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
          alert(`Ride request successful! From ${data.pickup} to ${data.destination}`);
        } else {
          setMessage(`Error: ${data.error}`);
          alert(`Error: ${data.error}`);
        }
      } catch (error) {
        const errorMessage = 'Failed to connect to the backend.';
        setMessage(errorMessage);
        alert(errorMessage);
        console.error('There was an error!', error);
      }
    } else {
      alert('Please enter both a pickup location and a destination.');
    }
  };
  
  const renderSuggestions = (suggestions, onSelect, setSuggestions) => {
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul className="suggestions-list">
        {suggestions.map((place) => (
          <li
            key={place.id}
            onClick={() => {
              onSelect(place.place_name);
              setSuggestions([]);
            }}
          >
            {place.place_name}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Private Taxi App</h1>
        <form onSubmit={handleSubmit} className="ride-form">
          <div className="form-group">
            <label htmlFor="pickup">Pickup Location:</label>
            <input
              type="text"
              id="pickup"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              placeholder="Enter pickup location"
              required
              autoComplete="off"
            />
            {renderSuggestions(pickupSuggestions, setPickup, setPickupSuggestions)}
          </div>
          <div className="form-group">
            <label htmlFor="destination">Destination:</label>
            <input
              type="text"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Enter destination"
              required
              autoComplete="off"
            />
            {renderSuggestions(destinationSuggestions, setDestination, setDestinationSuggestions)}
          </div>
          <button type="submit">Find a Ride</button>
        </form>
        {message && <p className="message">{message}</p>}
      </header>
    </div>
  );
}

export default App;