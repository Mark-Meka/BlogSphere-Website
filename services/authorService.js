// authorService.js

// Sample data for articles authored by a specific author
// This could be replaced with a database implementation
const articles = [
  { id: 1, title: 'Draft Article 1', status: 'draft', authorId: 1 },
  { id: 2, title: 'Draft Article 2', status: 'draft', authorId: 1 },
  // Add more articles as needed
];

// Function to get draft articles by an author
const getDraftArticlesByAuthor = (authorId) => {
  return articles.filter(article => article.status === 'draft' && article.authorId === authorId);
};

// Function to get published articles by an author
const getPublishedArticlesByAuthor = (authorId) => {
  return articles.filter(article => article.status === 'published' && article.authorId === authorId);
};

// Additional functions related to author functionalities can be added here
// For example: updateAuthorProfile, createArticle, updateArticle, deleteArticle, etc.

module.exports = {
  getDraftArticlesByAuthor,
  getPublishedArticlesByAuthor,
  // Export additional functions as they are implemented
};
