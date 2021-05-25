import React, { useState, useEffect } from 'react';

import { getFlats, Estate } from '../../utils/apiClient';

import './advertisements.css';

const Advertisements: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<Estate[]>([]);

  useEffect(() => {
    getFlats().then((result) => {
      setAdvertisements(result);
      console.dir(result);
    });
  }, []);

  return (
    <div className="advertisements">
      {advertisements.map((advertisement) => (
        <div key={advertisement.hash_id}>
          <div>
            {advertisement.name}, {advertisement.locality}&nbsp;
            <a
              href={`https://www.sreality.cz/detail/1/2/3/4/${advertisement.hash_id}`}
              target="_blank"
              rel="noreferrer">
              odkaz
            </a>
          </div>
          <div>{advertisement.price}</div>
          {advertisement._links.images.map((image) => (
            <img key={image.href} src={image.href} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Advertisements;
