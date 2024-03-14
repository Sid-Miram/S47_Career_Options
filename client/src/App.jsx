
// App.jsx

import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from './AddForm'; // Import the AddForm component
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null); // Change to null for initial state

  // Fetch data from the server when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/entities')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
    setUpdateFormData(null); // Set updateFormData to null when adding a new day
  };

  const handleFormSubmit = (formData) => {
    // Send the form data to the server
    // Here you can make a POST request to your API endpoint to add the new data
    console.log(formData);
    axios.post('http://localhost:3000/', formData)
      .then(() => {
        setShowForm(false); // Hide the form after successful submission
        fetchData(); // Fetch updated data
      })
      .catch(error => console.error('Error adding new day:', error));
  };

  const handleUpdateButtonClick = (entity) => {
    setUpdateFormData(entity);
    setShowForm(true);
  };

  const handleUpdateFormSubmit = (formData) => {
    // Send the updated form data to the server
    // Here you can make a PUT request to your API endpoint to update the data
    console.log(formData);
    axios.put(`http://localhost:3000/${updateFormData._id}`, formData)
      .then(() => {
        setShowForm(false); // Hide the form after successful submission
        fetchData(); // Fetch updated data
      })
      .catch(error => console.error('Error updating day:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/Delete-Entities/${id}`)
      .then(() => fetchData()) // Fetch updated data after deletion
      .catch(err => console.error('Error deleting day:', err));
  };

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
        {data.map((entity, index) => (
          <div className="entity" key={index}>
            <h2>Day {entity.day}: {entity.title}</h2>
            <ul>
              <li>{entity.actions}</li>
            </ul>
            <button onClick={() => handleDelete(entity._id)} className='delete'>Delete</button>
            <button onClick={() => handleUpdateButtonClick(entity)} className='update'>Update</button>
          </div>
        ))}
      </div>
      <footer className="footer">
        <p>&copy; 2024 The Descent. All rights forfeited.</p>
      </footer>
      {/* Form */}
      <div className="form-container">
        {showForm && <AddForm onSubmit={updateFormData ? handleUpdateFormSubmit : handleFormSubmit} initialFormData={updateFormData} />}
        {!showForm && <button onClick={handleAddButtonClick}>Add</button>}
      </div>
    </div>
  );
}

export default App;

