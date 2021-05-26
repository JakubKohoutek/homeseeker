import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { getFlats, Estate } from '../../utils/apiClient';
import Emoji from '../emoji';

import './advertisements.css';
import classnames from 'classnames';

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
        <div key={advertisement.id} className="advertisements__container">
          <div>
            <div className="advertisements__header">
              <div className="advertisements__title">
                {advertisement.name}, {advertisement.locality}
              </div>
              <div
                className={classnames({
                  advertisements__price: true,
                  'advertisements__price--red': advertisement.price >= 7800000,
                  'advertisements__price--green': advertisement.price <= 7000000
                })}>
                {advertisement.price.toLocaleString('cs-CZ')}&nbsp;Kč
              </div>
            </div>
            <div>
              {advertisement.description.split('\n').map((paragraph, index) => (
                <p key={`${advertisement.id}_${index}`}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="advertisements__images-container">
            {advertisement.images.map((href) => (
              <img
                key={href}
                src={href}
                className="advertisements__image advertisements__image--wide"
              />
            ))}
          </div>
          <div className="action-bar">
            <Box marginLeft={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => alert('TODO - uved duvod')}
                className="action-bar__item">
                Nope&nbsp;
                <Emoji symbol="👎" label="Nope" />
              </Button>
            </Box>
            <Box marginLeft={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => alert('TODO')}
                className="action-bar__item">
                Přidat poznámku
              </Button>
            </Box>
            <Box marginLeft={1}>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => alert('TODO')}
                className="action-bar__item">
                Zálohovat informace
              </Button>
            </Box>
            <Box marginLeft={1}>
              <Button
                variant="contained"
                color="primary"
                href={`https://www.sreality.cz/detail/1/2/3/4/${advertisement.id}`}
                target="_blank"
                rel="noreferrer"
                className="action-bar__item">
                Více
              </Button>
            </Box>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Advertisements;
