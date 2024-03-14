import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from './AddForm'; // Import the AddForm component for adding new entities
import LoginForm from './Login'; // Import the LoginForm component for user authentication
import axios from "axios";

// Utility functions for cookie management
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function deleteCookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

function App() {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(null);
  const [user, setUser] = useState(null); // State to manage the logged-in user

  // Fetch data from the server and load user from cookie on component mount
  useEffect(() => {
    const userData = getCookie('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:3000/entities')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleLogin = (userInfo) => {
    setUser(userInfo);
    setCookie('user', JSON.stringify(userInfo), 7); // Expires in 7 days
  };

  const handleLogout = () => {
    deleteCookie('user');
    setUser(null);
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
    setUpdateFormData(null); // Reset updateFormData when adding a new entity
  };

  const handleFormSubmit = (formData) => {
    console.log(formData); // For demonstration; replace with API call logic
    axios.post('http://localhost:3000/', formData)
      .then(() => {
        setShowForm(false); // Hide the form after submission
        fetchData(); // Fetch updated data
      })
      .catch(error => console.error('Error adding new entity:', error));
  };

  const handleUpdateButtonClick = (entity) => {
    setUpdateFormData(entity); // Set the entity to be updated
    setShowForm(true); // Show the form for updating
  };

  const handleUpdateFormSubmit = (formData) => {
    console.log(formData); // For demonstration; replace with API call logic
    axios.put(`http://localhost:3000/${updateFormData._id}`, formData)
      .then(() => {
        setShowForm(false); // Hide the form after submission
        fetchData(); // Fetch updated data
      })
      .catch(error => console.error('Error updating entity:', error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/Delete-Entities/${id}`)
      .then(() => fetchData()) // Fetch updated data after deletion
      .catch(error => console.error('Error deleting entity:', error));
  };

  // Display login form if user is not authenticated
  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Main application UI
  return (
    <div className="App">
      <div className="logout-container">
        <button onClick={handleLogout}>Logout</button>
      </div>
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
      <div className="form-container">
        {showForm && <AddForm onSubmit={updateFormData ? handleUpdateFormSubmit : handleFormSubmit} initialFormData={updateFormData} />}
        {!showForm && <button onClick={handleAddButtonClick}>Add New Entity</button>}
      </div>
    </div>
  );
}

export default App;
