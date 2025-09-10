import React, { useState } from 'react';
import './App.css';

function App() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pickup && destination) {
      alert(`Finding a ride from ${pickup} to ${destination}`);
      // Here you would typically call an API to get a ride
    } else {
      alert('Please enter both a pickup location and a destination.');
    }
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
            />
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
            />
          </div>
          <button type="submit">Find a Ride</button>
        </form>
      </header>
    </div>
  );
}

export default App;