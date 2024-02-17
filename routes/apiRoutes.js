const router = require('express').Router();
const store = require('../db/store');

// /api/notes responds with all notes from database
router.get('/notes', (req, res) => {
  store.getNotes()
  .then((notes) => {
    return res.json(notes)
  })
  .catch((err) => res.status(500).json(err));
})

router.post('/notes', (req, res) => {
  store.addNote(req.body)
  .then((note) => {
    return res.json(note)
  })
  .catch((err) => res.status(500).json(err));
})

// : is a placeholder for the notes id that is clicked on
router.delete('/notes/:id', (req, res) => {
  store.removeNote(req.params.id)
  .then(() => res.json({ok:true}))
  .catch((err) => res.status(500).json(err));
})

module.exports = router;