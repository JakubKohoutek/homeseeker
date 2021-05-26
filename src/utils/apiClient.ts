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
  id: number;
  name: string;
  locality: string;
  price: number;
  thumbnails: string[];
  images: string[];
  description: string;
  highlights: { type: string; name: string; value: unknown }[];
};

type SearchResult = {
  hash_id: number;
  name: string;
  locality: string;
  price: number;
  _links: {
    images: { href: string }[];
  };
};

type AdditionalInfo = {
  items: { type: string; name: string; value: unknown }[];
  text: { name: string; value: string };
  _embedded: {
    images: {
      id: number;
      _links: {
        self: {
          href: string;
        };
      };
    }[];
  };
};

export const getFlats = async (): Promise<Estate[]> => {
  const flats: Estate[] = [];

  const response = await fetch(
    'http://localhost:4321/api/estates?building_type_search=2|3&category_main_cb=1&category_sub_cb=8|9|10|11|6|7&category_type_cb=1&czk_price_summary_order2=0|8000000&estate_age=2&locality_country_id=112&locality_district_id=56|57&locality_region_id=10|11&ownership=1',
    { method: 'GET' }
  );
  const result = await response.json();

  for (const estate of result._embedded.estates as SearchResult[]) {
    const additionalInfoResponse = await fetch(
      `http://localhost:4321/api/estates/${estate.hash_id}?tms=1622031719009`,
      { method: 'GET' }
    );

    const additionalInfo: AdditionalInfo = await additionalInfoResponse.json();

    flats.push({
      id: estate.hash_id,
      name: estate.name.replace('Prodej bytu', 'Byt'),
      locality: estate.locality,
      price: estate.price,
      thumbnails: estate._links.images.map((image) => image.href),
      images: additionalInfo._embedded.images.map((image) => image._links.self.href),
      description: additionalInfo.text.name === 'Popis' ? additionalInfo.text.value : '',
      highlights: additionalInfo.items
    });
  }
  return flats;
};
