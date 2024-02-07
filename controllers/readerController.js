const express = require('express');
const readerService = require('../services/readerService');
const articleService = require('../services/articleService');
const commentService = require('../services/commentService');
const router = express.Router();

// Function to get the reader's home page
const getReaderHome = async (req, res, next) => {
  try {
    // Get published articles
    const publishedArticles = await articleService.getPublishedArticles();

    // Retrieve saved articles for the reader (assuming you have a readerId)
    const readerId = req.session.userId; // Replace with actual logic to get reader's ID
    const savedArticles = await readerService.getSavedArticles(readerId);

    res.render('reader/reader-home', { publishedArticles, savedArticles });
  } catch (err) {
    next(err);
  }
};

// Function to get a specific reader article
const getReaderArticle = async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.articleId);
    if (isNaN(articleId)) {
      return res.status(400).send("Invalid article ID");
    }

    const article = await articleService.getArticleById(articleId);
    const comments = await commentService.getCommentsByArticleId(articleId);

    if (!article) {
      return res.status(404).send("Article not found");
    }

    res.render('reader/reader-article', { article, comments }); // Pass the comments to the view
  } catch (err) {
    next(err);
  }
};


const markArticleAsRead = async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.articleId);
    if (isNaN(articleId)) {
      return res.status(400).send("Invalid article ID");
    }

    const readerId = req.session.userId; // Assuming you have a reader's user ID in the session
    // Update the database to mark the article as read by the current reader
    await readerService.markArticleAsRead(readerId, articleId);

    // Redirect back to the article or reader's home page
    res.redirect(`/reader/article/${articleId}`);
  } catch (err) {
    next(err);
  }
};


const getSavedArticles = async (req, res, next) => {
  try {
    const readerId = req.session.userId; // Assuming you have a reader's user ID in the session
    const savedArticles = await readerService.getSavedArticles(readerId);

    // Render a view to display the saved articles
    res.render('reader/saved-articles', { savedArticles });
  } catch (err) {
    next(err);
  }
};


const markArticleAsSaved = async (req, res, next) => {
  try {
    const articleId = parseInt(req.params.articleId);
    if (isNaN(articleId)) {
      return res.status(400).send("Invalid article ID");
    }

    const readerId = req.session.userId; // Assuming you have a reader's user ID in the session
    // Update the database to mark the article as saved by the current reader
    await readerService.markArticleAsSaved(readerId, articleId);

    // Redirect back to the article or reader's home page
    res.redirect(`/reader/article/${articleId}`);
  } catch (err) {
    next(err);
  }
};


// Function to add a comment to an article
const addCommentToArticle = async (articleId, title, content, res) => {
  try {
    // Assuming you have a commentService that adds comments to the database
    const comment = await commentService.addComment(articleId, title, content); // Call the updated addComment method
    // Redirect to the article page with a success message
    res.redirect(`/reader/article/${articleId}`);
  } catch (error) {
    console.error(error);
    // Handle the error and display an error message or redirect to an error page
    res.status(500).send('An error occurred while submitting the comment');
  }
};




module.exports = {
  addCommentToArticle,
  getReaderHome,
  getReaderArticle,
  markArticleAsRead,
  getSavedArticles,
  markArticleAsSaved,
};
