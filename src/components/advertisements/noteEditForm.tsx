import React, { useState, FormEvent } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import { setNote } from '../../utils/apiClient';

import './noteEditForm.css';

type Props = {
  estateId: number;
  note: string;
  onClose: () => void;
};

const NoteEditForm: React.FC<Props> = ({ estateId, note, onClose }) => {
  const [newNote, setNewNote] = useState(note);
  const [submitting, setSubmitting] = useState(false);

  const handleNoteUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setSubmitting(true);
    await setNote(estateId, newNote);
    setSubmitting(false);
  };

  return (
    <Modal onClose={onClose} open>
      <div className="note-edit-form__wrapper">
        <Paper elevation={2} className="note-edit-form__paper">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column">
            <Typography component="h1" variant="h4" gutterBottom>
              Poznámka
            </Typography>
          </Box>
          <form
            method="post"
            noValidate
            onSubmit={handleNoteUpdate}
            className="note-edit-form">
            <TextField
              margin="normal"
              required
              fullWidth
              id="note"
              label="Note"
              name="note"
              defaultValue={newNote}
              onChange={(e): void => setNewNote(e.target.value)}
            />
            <Box display="flex" justifyContent="flex-end">
              <Button
                disabled={submitting}
                type="submit"
                variant="contained"
                color="primary">
                {submitting ? 'Aktualizuji...' : 'Odeslat'}
              </Button>
            </Box>
          </form>
        </Paper>
      </div>
    </Modal>
  );
};

export default NoteEditForm;
