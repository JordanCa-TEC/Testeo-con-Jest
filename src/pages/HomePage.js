// src/pages/HomePage.js
import React from 'react';
import '../styles/styles.css';

function HomePage() {
  return (
    <div className='pokemon__body'>
      <img src="./images/logo-poke.png" alt="logo-pokemon"></img>
      <h1 className='pokemon__title'>Welcome to the Pokémon App</h1>
      <p className='pokemon__text'>Explore various Pokémon from the API.</p>
    </div>
  );
}

export default HomePage;
