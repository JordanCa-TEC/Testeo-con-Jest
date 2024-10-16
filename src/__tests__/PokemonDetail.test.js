// src/__tests__/PokemonDetail.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonDetail from '../components/PokemonDetail';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mockeamos el hook `useFetchPokemon`
jest.mock('../hooks/useFetchPokemon', () => jest.fn());

// Mockeamos el hook `useParams`
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

import useFetchPokemon from '../hooks/useFetchPokemon';
import { useParams } from 'react-router-dom';

describe('PokemonDetail Component', () => {
  // Casos de prueba

  test('renders loading state', () => {
    // Simulamos el nombre del Pokémon
    useParams.mockReturnValue({ name: 'pikachu' });

    // Simulamos el estado de loading
    useFetchPokemon.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });

    render(
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    );

    // Verificamos que el texto "Loading..." esté en el documento
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    // Simulamos el nombre del Pokémon
    useParams.mockReturnValue({ name: 'pikachu' });

    // Simulamos el estado de error
    useFetchPokemon.mockReturnValue({
      data: null,
      loading: false,
      error: true,
    });

    render(
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    );

    // Verificamos que el texto "Error loading Pokémon details" esté en el documento
    expect(screen.getByText(/Error loading Pokémon details/i)).toBeInTheDocument();
  });

  test('renders Pokemon details correctly', () => {
    // Simulamos el nombre del Pokémon
    useParams.mockReturnValue({ name: 'pikachu' });

    // Simulamos la respuesta exitosa con datos de Pokémon
    useFetchPokemon.mockReturnValue({
      data: {
        name: 'pikachu',
        sprites: { front_default: 'https://img.pokemondb.net/sprites/sword-shield/normal/pikachu.png' },
        height: 4,
        weight: 60,
        base_experience: 112,
      },
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    );

    // Los detalles del Pokémon se rendericen correctamente
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toBeInTheDocument();
    expect(screen.getByText(/Height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/Base experience: 112/i)).toBeInTheDocument();
  });
});
