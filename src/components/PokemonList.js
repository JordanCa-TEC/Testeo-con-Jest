// src/components/PokemonList.js
import React from 'react';
import { Link } from 'react-router-dom';
import useFetchPokemon from '../hooks/useFetchPokemon';
import '../styles/styles.css';

function PokemonList() {
  const { data, loading, error } = useFetchPokemon('https://pokeapi.co/api/v2/pokemon?limit=10');

  if (loading) return <p className='pokemon__info'>Loading...</p>;
  if (error) return <p className='pokemon__info'>Error loading Pokémon</p>;

  return (
    <ul className='pokemon__list_style'>
      {data.results.map((pokemon, index) => (
        <li key={index}>
          <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
