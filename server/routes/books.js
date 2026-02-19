const express = require('express');
const { validate, validationResult } = require('express-validator');
const Book = require('../models/Book');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all books with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    let query = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { isbn: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const books = await Book.find(query)
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Book.countDocuments(query);

    res.json({
      books,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get books by category
router.get('/category/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create book (admin/seller only)
router.post('/', authenticate, authorize('seller', 'admin'), validate([
  require('express-validator').body('title').trim().notEmpty(),
  require('express-validator').body('author').trim().notEmpty(),
  require('express-validator').body('price').isFloat({ min: 0 }),
  require('express-validator').body('category').isIn(['Fiction', 'Non-fiction', 'Children', 'Science', 'Biographies', 'Self-help'])
]), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book({
      ...req.body,
      seller: req.user.userId
    });

    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book (admin/seller only)
router.put('/:id', authenticate, authorize('seller', 'admin'), async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Only allow seller/admin to update their own books
    if (book.seller.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this book' });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book (admin/seller only)
router.delete('/:id', authenticate, authorize('seller', 'admin'), async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.seller.toString() !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this book' });
    }

    await Book.findByIdAndRemove(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
