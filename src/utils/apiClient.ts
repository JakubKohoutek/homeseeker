export const getHomes = async (): Promise<Response> => {
  const response = await fetch(`/api/homes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
};
