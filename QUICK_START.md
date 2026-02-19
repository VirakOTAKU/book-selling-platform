# Quick Start Reference

## 🎯 What Was Built

A professional, production-ready book selling platform with:
- ✅ Node.js + Express backend
- ✅ MongoDB database
- ✅ RESTful API with authentication
- ✅ Modern responsive frontend
- ✅ User registration & login
- ✅ Book catalog with search & filtering
- ✅ User profiles
- ✅ Render deployment ready

## 📂 Project Location
```
c:\Users\virak\Downloads\Book Selling\project\
```

## ⚡ Quick Commands

### Install & Run Locally
```bash
cd c:\Users\virak\Downloads\Book Selling\project
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

### Visit in Browser
```
http://localhost:5000
```

### Test Account Features
1. Register at `/register.html`
2. Login at `/login.html`
3. Browse books at `/categories.html`
4. View profile at `/profile.html`

## 📁 File Structure

```
project/
├── server/
│   ├── models/
│   │   ├── Book.js          ← Book schema
│   │   ├── User.js          ← User schema
│   │   └── Order.js         ← Order schema
│   ├── routes/
│   │   ├── auth.js          ← Login/Register
│   │   ├── books.js         ← Book CRUD
│   │   └── users.js         ← Profile
│   ├── middleware/
│   │   └── auth.js          ← JWT authentication
│   └── index.js             ← Server entry point
├── public/
│   ├── index.html           ← Homepage
│   ├── login.html
│   ├── register.html
│   ├── profile.html
│   ├── categories.html
│   ├── aboutus.html
│   ├── contactus.html
│   ├── style.css            ← All styling
│   └── api.js               ← Frontend API client
├── .env.example             ← Copy & customize
├── package.json             ← Dependencies
├── render.yaml              ← Render config
├── README.md                ← Full documentation
└── DEPLOYMENT_GUIDE.md      ← Render instructions
```

## 🔧 Key Technologies

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3, Vanilla JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB (via Mongoose) |
| Authentication | JWT + bcryptjs |
| Security | CORS, Input validation |

## 🚀 3-Step Deployment

### 1. Setup MongoDB (5 min)
```
Website: https://www.mongodb.com/cloud/atlas
- Create free cluster
- Get connection string
- Add to .env: MONGODB_URI=...
```

### 2. Push to GitHub (5 min)
```bash
git init
git add .
git commit -m "Book selling platform v1"
git remote add origin https://github.com/username/book-selling.git
git push -u origin main
```

### 3. Deploy to Render (10 min)
```
Website: https://render.com
- Connect GitHub repo
- Add environment variables
- Click Deploy
- Get live URL!
```

## 📊 API Examples

### Register
```javascript
const result = await Auth.register('John', 'Doe', 'john@email.com', 'password123');
// Returns: { token, user }
```

### Get Books
```javascript
const books = await Books.getAll(1, 10, 'Fiction', '');
// Returns: { books: [...], pagination: {...} }
```

### Login
```javascript
const result = await Auth.login('john@email.com', 'password123');
// Stores token in localStorage automatically
```

## 🎨 Design Highlights

- **Professional Color Scheme**: Blue (#0b5ed7) primary color
- **Responsive Grid Layout**: 4 columns → 2 → 1 on small screens
- **Smooth Animations**: Card hover effects, button transitions
- **Clean Typography**: Inter font, excellent readability
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation
- **Modern Gradients**: Linear and radial gradient overlays

## 🔒 Security Features

- ✅ Password hashing (bcryptjs)
- ✅ JWT token authentication
- ✅ Secure headers (CORS enabled)
- ✅ Input validation (express-validator)
- ✅ Protected API routes
- ✅ Environment variables for secrets
- ✅ HTTPS on production (Render)

## 📝 Database Models

### User
```javascript
{
  firstName, lastName, email, password,
  phone, address, role, bio, profilePicture,
  isVerified, createdAt, updatedAt
}
```

### Book
```javascript
{
  title, author, isbn, description,
  category, price, discount, image,
  stock, rating, reviews, seller,
  createdAt, updatedAt
}
```

### Order
```javascript
{
  orderNumber, userId, items,
  totalAmount, shippingAddress,
  status, paymentStatus, paymentMethod,
  createdAt, updatedAt
}
```

## 🎯 Next Features to Add

1. **Shopping Cart** - Add items, update quantities
2. **Payment Integration** - Stripe/PayPal
3. **Order Management** - Track orders
4. **Reviews & Ratings** - User feedback
5. **Admin Dashboard** - Manage books & users
6. **Email Notifications** - Confirmation emails
7. **Wishlist** - Save favorite books
8. **Advanced Search** - Filters, sorting

## ⚠️ Important Notes

1. **Change JWT_SECRET** to something unique in production
2. **Whitelist MongoDB IP** (allow 0.0.0.0/0 for Render)
3. **.env never goes to git** (it's in .gitignore)
4. **Test locally first** before pushing to production
5. **Monitor Render logs** for debugging

## 📞 Support

- **Render Docs**: https://docs.render.com
- **MongoDB Atlas Help**: https://docs.mongodb.com
- **Express JS Guide**: https://expressjs.com
- **JWT Info**: https://jwt.io

---

**You're ready to go! 🚀** Start with local setup, then deploy to Render when ready.
