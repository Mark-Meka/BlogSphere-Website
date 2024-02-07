const express = require('express');
const router = express.Router();
const readerController = require('../controllers/readerController');

// Route to display the reader's home page
router.get('/reader-home', readerController.getReaderHome);

// Route to display a specific article by ID
router.get('/reader/article/:articleId', readerController.getReaderArticle);

// Route to mark an article as read
router.post('/reader/mark-as-read/:articleId', readerController.markArticleAsRead);

// Route to display saved articles for the reader
router.get('/reader/saved-articles', readerController.getSavedArticles);

// Route to mark an article as saved
router.post('/reader/mark-as-saved/:articleId', readerController.markArticleAsSaved);

// Route to add a comment to an article
router.post('/reader/add-comment/:articleId', readerController.addComment);

router.post('/article/:id/comment', async (req, res) => {
    const { id } = req.params;
    const { userId, commentText } = req.body;
    await commentService.addComment(id, userId, commentText);
    res.redirect('/article/' + id); // Redirect back to the article page
  });

module.exports = router;
