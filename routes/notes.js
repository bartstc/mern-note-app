const express = require('express');
const router = express.Router();

const Note = require('../models/note');

router.get('/', (req, res) => {
  Note.find()
    .then(notes => res.json(notes))
    .catch(err => console.log(err));
});

router.post('/', (req, res) => {
  const { titleValue, descriptionValue, editing } = req.body;

  const newNote = new Note({
    titleValue,
    descriptionValue,
    editing
  });

  newNote.save()
    .then(note => res.json(note))
    .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
  Note.findById(req.params.id)
    .then(note => note.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

router.post('/:id', (req, res) => {
  Note.findById(req.params.id, (err, note) => {
    if (!note) res.status(404).send('Data is not found!')
    else
      note.descriptionValue = req.body.descriptionValue;

    note.save()
      .then(note => {
        res.json('Note updated');
      })
      .catch(err => res.status(404).send('Update not possible!'));
  });
});

module.exports = router;