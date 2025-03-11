import axios from 'axios';


const API_BASE_URL = `https://car-rental-api.goit.global`;

export const fetchCars = async (page, limit) => {
  const response = await axios.get(`${API_BASE_URL}/cars`, {
    params: {
      page,
      limit,
    },
  });
 
  return response.data;
};
