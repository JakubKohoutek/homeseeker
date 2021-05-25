export const getHomes = async (): Promise<Response> => {
  const response = await fetch(`/api/homes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return await response.json();
};

export type Estate = {
  hash_id: number;
  locality: string;
  name: string;
  price: number;
  _links: {
    images: { href: string }[];
  };
};

export const getFlats = async (): Promise<Estate[]> => {
  const response = await fetch(
    'http://localhost:4321/api/estates?building_type_search=2|3&category_main_cb=1&category_sub_cb=8|9|10|11|6|7&category_type_cb=1&czk_price_summary_order2=0|8000000&estate_age=2&locality_country_id=112&locality_district_id=56|57&locality_region_id=10|11&ownership=1',
    {
      method: 'GET'
    }
  );
  const result = await response.json();

  return result._embedded.estates;
};
