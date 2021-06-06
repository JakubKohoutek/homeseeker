import { EstateDTO } from '../types';

const API_BASE = 'http://localhost:4321/api';

export const getEstates = async (): Promise<EstateDTO[]> => {
  const response = await fetch(`${API_BASE}/estates`, { method: 'GET' });
  const result: EstateDTO[] = await response.json();

  return result;
};

export const setNope = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE}/estates/${id}/status`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      status: 'nope'
    })
  });

  if (response.status >= 400) {
    console.warn(`Request for nope failed with status ${response.status}`);
  }
};

export const setNote = async (id: number, note: string): Promise<void> => {
  const response = await fetch(`${API_BASE}/estates/${id}/note`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      note
    })
  });

  if (response.status >= 400) {
    console.warn(`Request for nope failed with status ${response.status}`);
  }
};
