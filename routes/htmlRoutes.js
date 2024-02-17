const path = require('path');
const router = require('express').Router();


// When users visit the root of the website, we will give them the index.html file
router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

// When users vist /notes, serve them the notes.html file
router.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

module.exports = router;