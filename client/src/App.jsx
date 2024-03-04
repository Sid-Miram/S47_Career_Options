

import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from './AddForm'; // Import the AddForm component

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:3000/entities')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData) => {
    // Send the form data to the server
    // Here you can make a POST request to your API endpoint to add the new data
    console.log(formData);
    setShowForm(false); // Hide the form after submission
  };

  let values = Object.values(data);

  return (
    <div className="App">
      <div className="Landing">
        <header className="header">
          <h1>The Descent</h1>
          <p>How to Lose Everything in 15 Days</p>
        </header>

        <section className="main-content">
          <p>Embark on a journey to lose it all...</p>
          <p>Step into the darkness and embrace the solitude of our haunted manor. Here, amidst the shadows and echoes of the past, you'll find solace in your loneliness.</p>
          <p>Our haunted halls whisper tales of sorrow and despair, inviting you to wander aimlessly through the corridors of melancholy.</p>
          <p>Now it's on to you, what to do on your last day of happiness, that is <span>16th</span> Day.</p>
        </section>
      </div>
      <div className="entity-container">
        {values.map((entity, index) => (
          <div className="entity" key={index}>
            <h2>Day {entity.day}: {entity.title}</h2>
            <ul>
              <li>{entity.actions}</li>
            </ul>
          </div>
        ))}
      </div>

      <footer className="footer">
        <p>&copy; 2024 The Descent. All rights forfeited.</p>
      </footer>

      {/* Form */}
      <div className="form-container">
        {showForm && <AddForm onSubmit={handleFormSubmit} />}
        {!showForm && <button onClick={handleAddButtonClick}>Add</button>}
      </div>
    </div>
  );
}

export default App;

