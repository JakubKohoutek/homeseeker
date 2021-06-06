import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { EstateDTO, Status } from '../../types';

import { setNope } from '../../utils/apiClient';
import Emoji from '../emoji';

import './estate.css';
import classnames from 'classnames';
import NoteEditForm from './noteEditForm';

type Props = {
  estate: EstateDTO;
};

const Estate: React.FC<Props> = ({ estate }) => {
  const [working, setWorking] = useState(false);
  const [editingNote, setEditingNote] = useState(false);

  const handleNopeClick = async () => {
    setWorking(true);
    await setNope(estate.id);
    setWorking(false);
  };

  return (
    <div key={estate.id} className="estates__container">
      <div>
        <div className="estates__header">
          <div className="estates__title">
            {estate.data.name}, {estate.data.locality}
          </div>
          <div
            className={classnames({
              estates__price: true,
              'estates__price--red': estate.data.price >= 7800000,
              'estates__price--green': estate.data.price <= 7000000
            })}>
            {estate.data.price.toLocaleString('cs-CZ')}&nbsp;Kč
          </div>
        </div>
        <div>
          {estate.data.description.split('\n').map((paragraph, index) => (
            <p key={`${estate.id}_${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="estates__images-container">
        {estate.data.images.map((href) => (
          <img key={href} src={href} className="estates__image estates__image--wide" />
        ))}
      </div>
      <div className="action-bar">
        <Box marginLeft={1}>
          {estate.status !== Status.NOPE && (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleNopeClick}
              className="action-bar__item"
              disabled={working}>
              Nope&nbsp;
              <Emoji symbol="👎" label="Nope" />
            </Button>
          )}
        </Box>
        <Box marginLeft={1}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setEditingNote(true)}
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
            href={`https://www.sreality.cz/detail/1/2/3/4/${estate.id}`}
            target="_blank"
            rel="noreferrer"
            className="action-bar__item">
            Více
          </Button>
        </Box>
      </div>
      {editingNote && (
        <NoteEditForm
          estateId={estate.id}
          note={estate.note}
          onClose={() => setEditingNote(false)}
        />
      )}
    </div>
  );
};

export default Estate;
