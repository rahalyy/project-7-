const express = require('express');
const router = express.Router();
const Recommendation = require('../models/Recommendation');

router.get('/', async (req, res) => {
  const books = await Recommendation.find().populate('user', 'username');
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const book = await Recommendation.findById(req.params.id).populate('user', 'username');
  if (!book) return res.status(404).json({ message: 'Book not found' });
  res.json(book);
});

router.post('/', async (req, res) => {
  const { title, author, description, rating, userId } = req.body;
  const recommendation = new Recommendation({ title, author, description, rating, user: userId });
  const newRec = await recommendation.save();
  res.status(201).json(newRec);
});

router.post('/:id/like', async (req, res) => {
  const { userId } = req.body;
  const book = await Recommendation.findById(req.params.id);
  if (!book.likes.includes(userId)) book.likes.push(userId);
  else book.likes = book.likes.filter(id => id.toString() !== userId);
  await book.save();
  res.json(book);
});

router.post('/:id/comment', async (req, res) => {
  const { userId, text } = req.body;
  const book = await Recommendation.findById(req.params.id);
  book.comments.push({ user: userId, text });
  await book.save();
  res.json(book);
});

router.post('/:id/rate', async (req, res) => {
  const { userId, value } = req.body;
  const book = await Recommendation.findById(req.params.id);
  const existingRating = book.ratings.find(r => r.user.toString() === userId);
  if (existingRating) existingRating.value = value;
  else book.ratings.push({ user: userId, value });
  const total = book.ratings.reduce((sum, r) => sum + r.value, 0);
  book.rating = total / book.ratings.length;
  await book.save();
  res.json(book);
});

router.get('/recommendations/personalized/:userId', async (req, res) => {
  const books = await Recommendation.find().populate('user', 'username');
  books.sort((a, b) => b.rating - a.rating);
  res.json(books);
});

module.exports = router;
