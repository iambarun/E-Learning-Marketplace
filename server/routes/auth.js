import express from 'express';
import { register } from '../controllers/auth.js';

const router = express.Router();

router.get("/", (req, res) => {
  res.send('Welcome to the server!');
});

//router.get("/register", register);
router.post("/register", register);

// moddule.exports = router;
export default router;
