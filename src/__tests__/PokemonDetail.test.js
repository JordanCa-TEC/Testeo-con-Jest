// src/__tests__/PokemonDetail.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import PokemonDetail from '../components/PokemonDetail';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import useFetchPokemon from '../hooks/useFetchPokemon';
import { useParams } from 'react-router-dom';

// Mockeamos el hook `useFetchPokemon`
jest.mock('../hooks/useFetchPokemon');

// Mockeamos el hook `useParams`
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

describe('PokemonDetail Component', () => {
  beforeEach(() => {
    // Limpiamos los mocks antes de cada test
    jest.clearAllMocks();
  });

  test('renders loading state', () => {
    useParams.mockReturnValue({ name: 'pikachu' });
    useFetchPokemon.mockReturnValue({ data: null, loading: true, error: null });

    render(
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('renders error state', () => {
    useParams.mockReturnValue({ name: 'pikachu' });
    useFetchPokemon.mockReturnValue({ data: null, loading: false, error: 'Error loading Pokémon details' }); // Mensaje de error actualizado

    render(
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    );

    expect(screen.getByText(/Error loading Pokémon details/i)).toBeInTheDocument();
  });

  test('renders Pokémon details correctly', () => {
    useParams.mockReturnValue({ name: 'pikachu' });
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

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toBeInTheDocument();
    expect(screen.getByText(/Height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/Weight: 60/i)).toBeInTheDocument();
    expect(screen.getByText(/Base experience: 112/i)).toBeInTheDocument();
  });

  test('handles no data state gracefully', () => {
    useParams.mockReturnValue({ name: 'unknown' });
    useFetchPokemon.mockReturnValue({ data: null, loading: false, error: null });

    render(
      <BrowserRouter>
        <PokemonDetail />
      </BrowserRouter>
    );

    // Puedes verificar que no hay detalles en el documento
    expect(screen.queryByText(/pikachu/i)).not.toBeInTheDocument();
  });
});
