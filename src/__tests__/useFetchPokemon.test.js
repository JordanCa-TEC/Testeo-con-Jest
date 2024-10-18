import axios from 'axios';
import { renderHook, act } from '@testing-library/react-hooks';
import useFetchPokemon from '../hooks/useFetchPokemon';
import { act as reactAct } from 'react'; 

jest.mock('axios');

describe('useFetchPokemon', () => {
  it('fetches and returns data successfully', async () => {
    const mockData = { name: 'pikachu' };
    axios.get.mockResolvedValueOnce({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() => 
      useFetchPokemon('https://pokeapi.co/api/v2/pokemon/pikachu')
    );

    await act(async () => {
      await waitForNextUpdate(); 
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('handles fetch failure', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => 
      useFetchPokemon('https://pokeapi.co/api/v2/pokemon/pikachu')
    );

    await act(async () => {
      await waitForNextUpdate();
    });

    expect(result.current.data).toBe(null);
    expect(result.current.error.message).toEqual(errorMessage);
  });
});
