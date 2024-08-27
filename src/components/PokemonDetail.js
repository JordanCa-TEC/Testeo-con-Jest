// src/components/PokemonDetail.js
import React from 'react';
import useFetchPokemon from '../hooks/useFetchPokemon';
import { useParams } from 'react-router-dom';

function PokemonDetail() {
  const { name } = useParams();
  const { data, loading, error } = useFetchPokemon(`https://pokeapi.co/api/v2/pokemon/${name}`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading Pokémon details</p>;

  return (
    <div>
      <h1>{data.name}</h1>
      <img src={data.sprites.front_default} alt={data.name} />
      <p>Height: {data.height}</p>
      <p>Weight: {data.weight}</p>
      <p>Base experience: {data.base_experience}</p>
    </div>
  );
}

export default PokemonDetail;
