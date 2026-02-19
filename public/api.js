/** API Helper Functions */
const API_BASE = '/api';

// Get token from localStorage
function getAuthToken() {
  return localStorage.getItem('token');
}

// Get authorization headers
function getAuthHeaders() {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
}

// Authentication APIs
const Auth = {
  register: async (firstName, lastName, email, password) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Books APIs
const Books = {
  getAll: async (page = 1, limit = 10, category = '', search = '') => {
    let url = `${API_BASE}/books?page=${page}&limit=${limit}`;
    if (category && category !== 'all') url += `&category=${category}`;
    if (search) url += `&search=${search}`;
    const res = await fetch(url);
    return res.json();
  },

  getById: async (id) => {
    const res = await fetch(`${API_BASE}/books/${id}`);
    return res.json();
  },

  getByCategory: async (category) => {
    const res = await fetch(`${API_BASE}/books/category/${category}`);
    return res.json();
  },

  create: async (bookData) => {
    const res = await fetch(`${API_BASE}/books`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData)
    });
    return res.json();
  },

  update: async (id, bookData) => {
    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(bookData)
    });
    return res.json();
  },

  delete: async (id) => {
    const res = await fetch(`${API_BASE}/books/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return res.json();
  }
};

// Users APIs
const Users = {
  getProfile: async () => {
    const res = await fetch(`${API_BASE}/users/profile`, {
      headers: getAuthHeaders()
    });
    return res.json();
  },

  updateProfile: async (userData) => {
    const res = await fetch(`${API_BASE}/users/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(userData)
    });
    return res.json();
  }
};

// Check if user is authenticated
function isAuthenticated() {
  return !!localStorage.getItem('token');
}

// Get current user
function getCurrentUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

// Require authentication - redirect to login if not authenticated
function requireAuth() {
  if (!isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}
