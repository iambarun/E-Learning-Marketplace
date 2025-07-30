import express from 'express';

const router = express.Router();

router.get("/", (req, res) => {
  res.send('Welcome to the server!');
});

router.get("/register", (req, res) => {
  res.send('Register User');
});

// moddule.exports = router;
export default router;
