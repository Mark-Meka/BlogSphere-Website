const express = require('express');
const articleService = require('../services/articleService');
const userService = require('../services/userService');
const authorController = require('../controllers/authorController');
// getAuthorHome: Display the author's homepage with lists of published and draft articles
const getAuthorHome = (req, res) => {
  try {
    const publishedArticles = articleService.getPublishedArticles(); // Fetch published articles
    const draftArticles = articleService.getDraftArticles(); // Fetch draft articles

    // Render the author's home page with the fetched data
    res.render('author/author-home', {
      publishedArticles: publishedArticles,
      draftArticles: draftArticles
    });
  } catch (error) {
    // Handle any errors that occur during fetching data
    res.status(500).send('Error occurred while fetching data');
  }
};

// Display the author's settings page
const getAuthorSettings = (req, res) => {
  // Assuming you have a function in userService to get user data
  const userData = userService.getUserData();
  res.render('author/author-settings', { userData });
};

// Display a page to edit a specific article
const getAuthorEditArticle = (req, res) => {
  const articleId = req.params.articleId;
  const article = articleService.getArticleById(articleId);
  if (!article) {
    return res.render('error', { error: { message: 'No article found for editing.' } });
  }
  res.render('author/author-edit-article', { article });
};

// Display page to create a new draft
const getAuthorCreateNewDraft = (req, res) => {
  res.render('author/create-new-draft');
};

// Handle creation of a new draft
const postAuthorCreateNewDraft = (req, res) => {
  const { title, content } = req.body;
  articleService.createDraftArticle(title, content);
  res.redirect('/author/home');
};

// Handle submission of an edited article
const postEditArticle = (req, res) => {
  const articleId = req.params.articleId;
  const { title, content } = req.body;
  articleService.updateArticle(articleId, { title, content });
  res.redirect('/author/home');
};

// Handle the deletion of an article
const deleteArticle = (req, res) => {
  const articleId = req.params.articleId;
  const success = articleService.deleteArticle(articleId);
  if (success) {
    // Article deleted successfully
    res.redirect('/author/home'); // Redirect to the author's home page
  } else {
    // Article not found or couldn't be deleted
    res.status(404).render('error', { error: { message: 'Article not found' } });
  }
};


const postPublishArticle = (req, res) => {
  const articleId = req.params.articleId;
  const success = articleService.publishArticle(articleId);
  if (success) {
    // Article published successfully
    res.redirect('/author/home'); // Redirect to the author's home page
  } else {
    // Article not found or couldn't be published
    res.status(404).render('error', { error: { message: 'Article not found' } });
  }
};




module.exports = {
  getAuthorHome,
  getAuthorSettings,
  getAuthorEditArticle,
  getAuthorCreateNewDraft,
  postAuthorCreateNewDraft,
  postEditArticle,
  postPublishArticle,
  deleteArticle,
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match 'admin'
  if (username === 'admin' && password === 'admin') {
      // If credentials are correct, redirect to the author's home page
      res.redirect('/author/home');
  } else {
      // If credentials are incorrect, render the login page with an error message
      res.render('login', { error: 'Invalid Credentials' });
  }
};