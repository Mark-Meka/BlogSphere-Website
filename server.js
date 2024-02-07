const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');

// Middleware for parsing body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Session configuration
app.use(session({
    secret: 'your_secret_key', // Replace with your secret key
    resave: false,
    saveUninitialized: true
}));

// Static file serving should come after the session and bodyParser configuration
app.use(express.static(path.join(__dirname, 'public')));


// Import routes
const indexRouter = require('./routes/index');
const authorRoutes = require('./routes/authorRoutes');

// Use routes
app.use('/', indexRouter); // This should handle the root URL
app.use('/author', authorRoutes);

// Error handling middleware should be at the end
app.use((err, req, res, next) => {
  console.error("Error Details:", err); // Log the full error details
  res.status(500).send('Something broke!');
});


const authenticateUser = (username, password) => {
  // Your authentication logic here
  // Return 'author' if username and password are 'admin', else return null
  return username === 'admin' && password === 'admin' ? 'author' : null;
};



// Server initialization
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


app.get('/article/:id', (req, res) => {
  const articleId = req.params.id;
  const article = articleService.getArticleById(articleId); // Fetch the article

  // Ensure article has createdAt and lastModified properties
  res.render('article', { 
      article: article,
      createdAt: article.createdAt,
      lastModified: article.lastModified 
  });
});




module.exports = app;
