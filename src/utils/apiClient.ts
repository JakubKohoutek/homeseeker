import { EstateDTO } from '../types';

export const getEstates = async (): Promise<EstateDTO[]> => {
  const response = await fetch('http://localhost:4321/api/estates', { method: 'GET' });
  const result: EstateDTO[] = await response.json();

  console.log(result);

  return result;
};
