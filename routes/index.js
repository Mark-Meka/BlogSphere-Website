const express = require('express');
const authorController = require('../controllers/authorController');
const readerController = require('../controllers/readerController');

const router = express.Router();

// Author Routes
router.get('/author/home', authorController.getAuthorHome);
router.get('/author/settings', authorController.getAuthorSettings);
router.get('/author/edit-article/:articleId', authorController.getAuthorEditArticle);
router.get('/author/create-new-draft', authorController.getAuthorCreateNewDraft);
router.post('/author/create-new-draft', authorController.postAuthorCreateNewDraft);
router.post('/author/edit-article/:articleId', authorController.postEditArticle);
router.post('/author/publish-article/:articleId', authorController.postPublishArticle);
router.post('/author/delete-article/:articleId', authorController.deleteArticle);
router.get('/', (req, res) => {
  res.render('login'); // Modify as needed, for example, to render a specific view
});

// Reader Routes
router.get('/reader/home', readerController.getReaderHome);
router.get('/reader/article/:articleId', readerController.getReaderArticle);
router.post('/reader/mark-as-read/:articleId', readerController.markArticleAsRead);
router.get('/reader/saved-articles', readerController.getSavedArticles);
router.post('/reader/mark-as-saved/:articleId', readerController.markArticleAsSaved);

// Add the corrected route for adding a comment
router.post('/article/:articleId/comment', async (req, res) => {
  const articleId = req.params.articleId;
  const { title, content } = req.body;

  try {
    // Call the addComment function from readerController to handle comment submission
    await readerController.addCommentToArticle(articleId, title, content, res);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while submitting the comment');
  }
});

// Login Routes
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'admin') {
    res.redirect('/author/home');
  } else {
    res.render('login', { error: 'Invalid credentials' });
  }
});

router.get('/guest', (req, res) => {
  res.redirect('/reader/home');
});

module.exports = router;
