const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');

// Author Routes
router.get('/home', authorController.getAuthorHome);
router.get('/settings', authorController.getAuthorSettings);
router.get('/edit-article/:articleId', authorController.getAuthorEditArticle);
router.get('/create-new-draft', authorController.getAuthorCreateNewDraft);
router.post('/create-new-draft', authorController.postAuthorCreateNewDraft);
router.post('/edit-article/:articleId', authorController.postEditArticle);
router.post('/publish-article/:articleId', authorController.postPublishArticle);
router.post('/delete-article/:articleId', authorController.deleteArticle);

module.exports = router;
