import React from 'react';
import './App.css';
import data from '../../Data.json';

function App() {
  const entity = data['id_1'];
  const { id, ...rest } = entity;
  const dayEntity = { day: id, ...rest };

  return (
    <div className="App">
      <header className="header">
        <h1>The Descent</h1>
        <p>How to Lose Everything in 15 Days</p>
      </header>

      <section className="main-content">
        <p>Embark on a journey to lose it all...</p>
        <p>Step into the darkness and embrace the solitude of our haunted manor. Here, amidst the shadows and echoes of the past, you'll find solace in your loneliness.</p>
        <p>Our haunted halls whisper tales of sorrow and despair, inviting you to wander aimlessly through the corridors of melancholy.</p>
      </section>


      <div className="entity-container">
        <div className="entity">
          <h2>Day {dayEntity.day}: {dayEntity.title}</h2>
          <ul>
            {dayEntity.actions.map((action, index) => (
              <li key={index}>{action}</li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2024 The Descent. All rights forfeited.</p>
      </footer>
    </div>
  );
}

export default App;
