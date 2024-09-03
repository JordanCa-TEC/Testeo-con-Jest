// src/components/Navbar.js
import { Link } from 'react-router-dom';
import React from 'react';
import '../styles/styles.css';

function Navbar() {
  return (
    <nav>
      <ul className='pokemon__ul'>
        <li className='pokemon__menu'><Link to="/">Home</Link></li>
        <li className='pokemon__menu'><Link to="/pokemon">Pokémon List</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
