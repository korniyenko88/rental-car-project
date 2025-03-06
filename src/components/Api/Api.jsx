import axios from 'axios';
import { useCallback } from 'react';

const API_BASE_URL = `https://car-rental-api.goit.global`;

export const fetchCars = useCallback(async (page, limit) => {
  const response = await axios.get(API_BASE_URL, {
    params: {
      page,
      limit,
    },
  });
  const data = response.data;

  return data;
});
