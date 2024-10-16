// src/__tests__/PokemonList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PokemonList from '../components/PokemonList';
import '@testing-library/jest-dom';

// Mockeamos el hook `useFetchPokemon`
jest.mock('../hooks/useFetchPokemon', () => jest.fn());

import useFetchPokemon from '../hooks/useFetchPokemon';

describe('PokemonList Component', () => {
  // Casos de prueba

  test('renders loading state', () => {
    // Simulamos el estado de loading
    useFetchPokemon.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    // Verificamos que el texto "Loading..." esté en el documento
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    // Simulamos el estado de error
    useFetchPokemon.mockReturnValue({
      data: null,
      loading: false,
      error: true,
    });

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    // Verificamos que el texto "Error loading Pokémon" esté en el documento
    expect(screen.getByText(/Error loading Pokémon/i)).toBeInTheDocument();
  });

  test('renders Pokémon list correctly', async () => {
    // Simulamos la respuesta exitosa de la API
    useFetchPokemon.mockReturnValue({
      data: {
        results: [
          { name: 'bulbasaur' },
          { name: 'charmander' },
          { name: 'squirtle' },
        ],
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <PokemonList />
      </BrowserRouter>
    );

    // Verificamos que los nombres de los Pokémon se rendericen correctamente
    expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getByText(/squirtle/i)).toBeInTheDocument();
  });
});

  