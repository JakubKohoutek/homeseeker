import React, { useState, useEffect } from 'react';

import { EstateDTO } from '../../types';

import Estate from './estate';

import { getEstates } from '../../utils/apiClient';

import './advertisements.css';

const Advertisements: React.FC = () => {
  const [advertisements, setAdvertisements] = useState<EstateDTO[]>([]);

  useEffect(() => {
    getEstates().then((result) => {
      setAdvertisements(result);
      console.dir(result);
    });
  }, []);

  return (
    <div className="advertisements">
      {advertisements.map((advertisement) => (
        <Estate estate={advertisement} key={advertisement.id} />
      ))}
    </div>
  );
};

export default Advertisements;
