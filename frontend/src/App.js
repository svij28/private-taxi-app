import React, { useState } from 'react';
import './App.css';

function App() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');

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
        {message && <p className="message">{message}</p>}
      </header>
    </div>
  );
}

export default App;
