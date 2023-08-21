import express from 'express';
const router = express.Router();

const imageRegex = /^\/.+\.(svg|png|jpg|jpeg)$/; // Updated regex pattern
const videoRegex = /^\/.+\.(mp4|ogv)$/; // Updated regex pattern

router.get(imageRegex, (req, res) => {
  const filePath = req.path;
  const rootURL = 'http://localhost:3000'; // Adjust the root URL
  res.redirect(303, `${rootURL}/src${filePath}`);
});

router.get(videoRegex, (req, res) => {
  const filePath = req.path;
  const rootURL = 'http://localhost:3000'; // Adjust the root URL
  res.redirect(303, `${rootURL}/src${filePath}`);
});

export default router;
