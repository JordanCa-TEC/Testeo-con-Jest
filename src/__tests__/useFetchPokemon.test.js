import { renderHook, act } from '@testing-library/react-hooks';
import axios from 'axios';
import useFetchPokemon from '../hooks/useFetchPokemon';

jest.mock('axios');

describe('useFetchPokemon', () => {
  const mockData = { name: 'Pikachu', height: 1, weight: 6 };

  it('should return data when the fetch is successful', async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchPokemon('https://pokeapi.co/api/v2/pokemon/pikachu')
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBe(null);
  });

  it('should set an error if the fetch fails', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() =>
      useFetchPokemon('https://pokeapi.co/api/v2/pokemon/pikachu')
    );

    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.loading).toBe(false);
    expect(result.current.data).toBe(null);
    expect(result.current.error.message).toBe(errorMessage);
  });
});
