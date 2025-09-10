import React, { useState } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import './App.css';

const libraries = ['places'];

function App() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');

  const [autocompletePickup, setAutocompletePickup] = useState(null);
  const [autocompleteDestination, setAutocompleteDestination] = useState(null);

  const onLoadPickup = (autocomplete) => {
    setAutocompletePickup(autocomplete);
  };

  const onPlaceChangedPickup = () => {
    if (autocompletePickup !== null) {
      const place = autocompletePickup.getPlace();
      if (place && place.formatted_address) {
        setPickup(place.formatted_address);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const onLoadDestination = (autocomplete) => {
    setAutocompleteDestination(autocomplete);
  };

  const onPlaceChangedDestination = () => {
    if (autocompleteDestination !== null) {
      const place = autocompleteDestination.getPlace();
      if (place && place.formatted_address) {
        setDestination(place.formatted_address);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (pickup && destination) {
      try {
        const response = await fetch('http://localhost:5001/api/ride', {
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

  return (
    <LoadScript
      googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"
      libraries={libraries}
    >
      <div className="App">
        <header className="App-header">
          <h1>Private Taxi App</h1>
          <form onSubmit={handleSubmit} className="ride-form">
            <div className="form-group">
              <label htmlFor="pickup">Pickup Location:</label>
              <Autocomplete
                onLoad={onLoadPickup}
                onPlaceChanged={onPlaceChangedPickup}
              >
                <input
                  type="text"
                  id="pickup"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  placeholder="Enter pickup location"
                  required
                />
              </Autocomplete>
            </div>
            <div className="form-group">
              <label htmlFor="destination">Destination:</label>
              <Autocomplete
                onLoad={onLoadDestination}
                onPlaceChanged={onPlaceChangedDestination}
              >
                <input
                  type="text"
                  id="destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="Enter destination"
                  required
                />
              </Autocomplete>
            </div>
            <button type="submit">Find a Ride</button>
          </form>
          {message && <p className="message">{message}</p>}
        </header>
      </div>
    </LoadScript>
  );
}

export default App;