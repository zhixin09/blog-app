const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json({ author: 'david', content: 'first comment' });
});

module.exports = router;
