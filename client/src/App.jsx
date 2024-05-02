import React, { useState, useEffect } from 'react';
import './App.css';
import AddForm from './AddForm'; // Assuming this is a form component you've created
import LoginForm from './Login'; // Assuming this is a login form component you've created
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
  const [user, setUser] = useState(null);
  const [sortCriteria, setSortCriteria] = useState('day'); // State for sorting criteria

  // Fetch data from the server and load user from cookie on component mount
  useEffect(() => {
    const userData = getCookie('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    fetchData();
  }, [sortCriteria]); // Re-fetch data when sort criteria changes

  const fetchData = () => {
    axios.get('http://localhost:3000/entities')
      .then(response => {
        const sortedData = response.data.sort((a, b) => {
          if (typeof a[sortCriteria] === "number") {
            return a[sortCriteria] - b[sortCriteria];
          }
          return a[sortCriteria].localeCompare(b[sortCriteria], 'en', {numeric: true});
        });
        setData(sortedData);
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleLogin = (loginCredentials) => {
    axios.post('http://localhost:3000/login', loginCredentials)
        .then(response => {
            const token = response.data; 
            console.log("JWT Token:", token); // Logging the token
            setCookie('jwt_token', token, 7); // Save JWT token in cookie
            setCookie('user', JSON.stringify({ username: loginCredentials.username }), 7);
            setUser({ username: loginCredentials.username });
        })
        .catch(error => console.error('Error during login:', error));
  };

  const handleLogout = () => {
    deleteCookie('jwt_token');
    deleteCookie('user');
    setUser(null);
  };

  const handleAddButtonClick = () => {
    setShowForm(true);
    setUpdateFormData(null);
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

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  const handleSortCriteriaChange = (e) => {
    setSortCriteria(e.target.value);
  };
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
        <div className="sort-container">
        <label htmlFor="sortCriteria">Sort by:</label>
        <select id="sortCriteria" value={sortCriteria} onChange={handleSortCriteriaChange}>
          <option value="day">Day</option>
          <option value="title">Title</option>
          {/* Add other sorting options as needed */}
        </select>
      </div>
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
