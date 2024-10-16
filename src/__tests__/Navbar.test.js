// src/components/Navbar.test.js
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import '@testing-library/jest-dom'; 

test('renders Navbar with correct links', () => {
  const { getByText } = render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );

  // Verificamos que los enlaces de navegación estén presentes
  const homeLink = getByText(/Home/i);
  const pokemonListLink = getByText(/Pokémon List/i);

  expect(homeLink).toBeInTheDocument();
  expect(homeLink.getAttribute('href')).toBe('/');
  
  expect(pokemonListLink).toBeInTheDocument();
  expect(pokemonListLink.getAttribute('href')).toBe('/pokemon');
});

