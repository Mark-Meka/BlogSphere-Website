// Sample data structure for saved articles by readers
let savedArticlesByReaders = [
  { readerId: 1, savedArticleIds: [1, 3] },
  { readerId: 2, savedArticleIds: [2, 3] },
  // Add more entries for different readers
];

// Function to get saved articles for a specific reader
const getSavedArticles = (readerId) => {
  const readerData = savedArticlesByReaders.find(entry => entry.readerId === readerId);
  return readerData ? readerData.savedArticleIds : [];
};

// Function to save an article for a reader
const saveArticleForReader = (readerId, articleId) => {
  const readerData = savedArticlesByReaders.find(entry => entry.readerId === readerId);

  if (readerData) {
    if (!readerData.savedArticleIds.includes(articleId)) {
      readerData.savedArticleIds.push(articleId);
    }
  } else {
    // If the reader does not exist in the array, add them with the new saved article
    savedArticlesByReaders.push({ readerId, savedArticleIds: [articleId] });
  }
};

// Function to remove a saved article for a reader
const removeSavedArticleForReader = (readerId, articleId) => {
  const readerData = savedArticlesByReaders.find(entry => entry.readerId === readerId);

  if (readerData) {
    readerData.savedArticleIds = readerData.savedArticleIds.filter(id => id !== articleId);
  }
};

module.exports = {
  getSavedArticles,
  saveArticleForReader,
  removeSavedArticleForReader
};
