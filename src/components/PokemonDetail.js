// src/components/PokemonDetail.js
import React from 'react';
import useFetchPokemon from '../hooks/useFetchPokemon';
import { useParams } from 'react-router-dom';
import '../styles/styles.css';

function PokemonDetail() {
  const { name } = useParams();
  const { data, loading, error } = useFetchPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (loading) return <p className='pokemon__info'>Loading...</p>;
  if (error) return <p className='pokemon__info'>Error loading Pokémon details</p>;

  return (
    <div className='pokemon__data'>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
      <p>Base experience: {data.base_experience}</p>
    </div>
  );
}

export default PokemonDetail;
