const express = require('express');
const { body, validationResult } = require('express-validator');
const { Database_Helper } = require('../database');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

// Get all books with pagination and filters
router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;
    
    const offset = (page - 1) * limit;
    const books = Database_Helper.getBooks(parseInt(limit), offset, category, search);
    const total = Database_Helper.getBookCount(category, search);

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
router.get('/:id', (req, res) => {
  try {
    const book = Database_Helper.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create book (admin/seller only)
router.post('/', authenticate, authorize('seller', 'admin'), [
  body('title').trim().notEmpty(),
  body('author').trim().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('category').isIn(['Fiction', 'Non-fiction', 'Children', 'Science', 'Biographies', 'Self-help'])
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, author, category, price, description } = req.body;
    const result = Database_Helper.createBook(title, author, category, price, description, req.user.userId);

    const book = Database_Helper.getBookById(result.lastID);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update book
router.put('/:id', authenticate, authorize('seller', 'admin'), (req, res) => {
  try {
    const book = Database_Helper.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.sellerId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updateData = {};
    const allowedFields = ['title', 'author', 'description', 'category', 'price', 'discount', 'stock', 'image'];
    
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    }

    Database_Helper.updateBook(req.params.id, updateData);
    const updatedBook = Database_Helper.getBookById(req.params.id);
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete book
router.delete('/:id', authenticate, authorize('seller', 'admin'), (req, res) => {
  try {
    const book = Database_Helper.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.sellerId !== req.user.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    Database_Helper.deleteBook(req.params.id);
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
