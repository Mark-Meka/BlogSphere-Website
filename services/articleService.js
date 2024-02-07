// Sample data for articles
let articles = [
  { id: 1, title: 'Published Article 1', content: 'Content of Article 1', status: 'published' },
  { id: 2, title: 'Published Article 2', content: 'Content of Article 2', status: 'published' },
  { id: 3, title: 'Draft Article 1', content: 'Content of Draft Article 1', status: 'draft' },
];

// Improved ID generation function
let nextId = articles.length + 1;
const getNextId = () => nextId++;

// Function to get all published articles
const getPublishedArticles = () => {
  return articles.filter(article => article.status === 'published');
};

// Function to get all draft articles
const getDraftArticles = () => {
  return articles.filter(article => article.status === 'draft');
};

// Function to get an article by ID
const getArticleById = (articleId) => {
  return articles.find(article => article.id === parseInt(articleId, 10));
};

// Function to create a new draft article
const createDraftArticle = (title, content) => {
  const newDraft = {
    id: getNextId(),
    title,
    content,
    status: 'draft'
  };
  articles.push(newDraft);
  return newDraft;
};

// Function to update an existing article
const updateArticle = (articleId, updatedData) => {
  const articleIndex = articles.findIndex(article => article.id === parseInt(articleId, 10));
  if (articleIndex === -1) return null;

  articles[articleIndex] = { ...articles[articleIndex], ...updatedData };
  return articles[articleIndex];
};

// Function to create a new article (published or draft)
const createNewArticle = (title, content, status) => {
  const newArticle = {
    id: getNextId(),
    title,
    content,
    status: status || 'draft'
  };
  articles.push(newArticle);
  return newArticle;
};

// Function to delete an article
const deleteArticle = (articleId) => {
  const index = articles.findIndex(article => article.id === parseInt(articleId, 10));
  if (index !== -1) {
    articles.splice(index, 1);
    return true; // Article deleted successfully
  }
  return false; // Article not found or couldn't be deleted
};


const publishArticle = (articleId) => {
  const article = getArticleById(articleId);

  if (article && article.status === 'draft') {
    article.status = 'published';
    return true; // Article published successfully
  }

  return false; // Article not found or couldn't be published
};

const articleService = {
  getPublishedArticles,
  getDraftArticles,
  getArticleById,
  createDraftArticle,
  updateArticle,
  createNewArticle,
  deleteArticle,
  publishArticle,
};

module.exports = articleService;
