// src/components/PokemonList.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetchPokemon from '../hooks/useFetchPokemon';

function PokemonList() {
  const { data, loading, error } = useFetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon</p>;

  return (
    <ul>
      {data.results.map((pokemon, index) => (
        <li key={index}>
          <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
