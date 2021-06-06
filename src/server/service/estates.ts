import * as database from './database';

import fetch from 'node-fetch';

import { Estate } from '../../types';

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

export const getEstates = async (): Promise<Estate[]> => {
  const estates: Estate[] = [];

  const response = await fetch(
    'https://www.sreality.cz/api/cs/v2/estates?building_type_search=2|3&category_main_cb=1&category_sub_cb=8|9|10|11|6|7&category_type_cb=1&czk_price_summary_order2=0|8000000&estate_age=3&locality_country_id=112&locality_district_id=56|57&locality_region_id=10|11&ownership=1',
    { method: 'GET' }
  );
  const result = await response.json();

  for (const estate of result._embedded.estates as SearchResult[]) {
    const additionalInfoResponse = await fetch(
      `https://www.sreality.cz/api/cs/v2/estates/${estate.hash_id}?tms=1622031719009`,
      { method: 'GET' }
    );

    const additionalInfo: AdditionalInfo = await additionalInfoResponse.json();

    estates.push({
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

  return estates;
};

export const fetchAndStoreEstates = async (): Promise<void> => {
  try {
    const estates = await getEstates();

    for (const estate of estates) {
      const foundRecords = await database.runQuery('SELECT * FROM estates WHERE id=?', [
        estate.id
      ]);

      if (foundRecords.length === 0) {
        await database.runQuery(
          'INSERT INTO estates(id, status, note, data) VALUES(?,?,?,?)',
          [estate.id, 'new', '', JSON.stringify(estate)]
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
};
