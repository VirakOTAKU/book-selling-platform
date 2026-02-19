const { Low, JSONFile } = require('lowdb');
const path = require('path');
const fs = require('fs');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Create database adapter
const adapter = new JSONFile(path.join(dataDir, 'db.json'));
const db = new Low(adapter);

// Default data structure
async function initializeDatabase() {
  await db.read();
  
  if (!db.data) {
    db.data = {
      users: [],
      books: [],
      orders: [],
      orderItems: []
    };
    await db.write();
  }
  
  console.log('✅ Lowdb database initialized');
}

// Helper functions
const Database_Helper = {
  getUser: (email) => {
    return db.data.users.find(u => u.email === email);
  },

  getUserById: (id) => {
    return db.data.users.find(u => u.id === id);
  },

  createUser: (firstName, lastName, email, hashedPassword) => {
    const id = Math.max(...db.data.users.map(u => u.id || 0), 0) + 1;
    const newUser = {
      id,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone: '',
      role: 'customer',
      bio: '',
      profilePicture: null,
      isVerified: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.data.users.push(newUser);
    db.write();
    return { lastID: id };
  },

  getBooks: (limit = 10, offset = 0, category = null, search = null) => {
    let results = [...db.data.books];

    if (category && category !== 'all') {
      results = results.filter(b => b.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(b =>
        b.title.toLowerCase().includes(searchLower) ||
        b.author.toLowerCase().includes(searchLower) ||
        (b.isbn && b.isbn.toLowerCase().includes(searchLower))
      );
    }

    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return results.slice(offset, offset + limit);
  },

  getBookCount: (category = null, search = null) => {
    let results = db.data.books;

    if (category && category !== 'all') {
      results = results.filter(b => b.category === category);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(b =>
        b.title.toLowerCase().includes(searchLower) ||
        b.author.toLowerCase().includes(searchLower) ||
        (b.isbn && b.isbn.toLowerCase().includes(searchLower))
      );
    }

    return results.length;
  },

  getBookById: (id) => {
    return db.data.books.find(b => b.id === parseInt(id));
  },

  createBook: (title, author, category, price, description, sellerId) => {
    const id = Math.max(...db.data.books.map(b => b.id || 0), 0) + 1;
    const newBook = {
      id,
      title,
      author,
      isbn: null,
      description: description || '',
      category: category || 'Fiction',
      price: parseFloat(price),
      discount: 0,
      image: 'https://via.placeholder.com/96x128',
      stock: 0,
      rating: 0,
      sellerId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    db.data.books.push(newBook);
    db.write();
    return { lastID: id };
  },

  updateBook: (id, data) => {
    const bookIndex = db.data.books.findIndex(b => b.id === parseInt(id));
    if (bookIndex !== -1) {
      db.data.books[bookIndex] = {
        ...db.data.books[bookIndex],
        ...data,
        updatedAt: new Date().toISOString()
      };
      db.write();
    }
  },

  deleteBook: (id) => {
    db.data.books = db.data.books.filter(b => b.id !== parseInt(id));
    db.write();
  },

  updateUser: (userId, data) => {
    const userIndex = db.data.users.findIndex(u => u.id === userId);
    if (userIndex !== -1) {
      db.data.users[userIndex] = {
        ...db.data.users[userIndex],
        ...data,
        updatedAt: new Date().toISOString()
      };
      db.write();
    }
  }
};

module.exports = { db, Database_Helper, initializeDatabase };
