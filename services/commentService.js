let nextCommentId = 1;
const comments = [];

const commentService = {
  getAllComments: () => {
    return comments;
  },

  addComment: (articleId, title, content) => { // Change the parameters to match your needs
    const newComment = {
      id: nextCommentId++,
      articleId,
      title, // Add a title to the comment
      content,
      createdAt: new Date() // Store the creation date of the comment
    };

    if (!articleId || !title || !content) { // Update validation
      // Handle invalid input
      throw new Error("Invalid comment data");
    }

    comments.push(newComment);
    return newComment;
  },

  getCommentsByArticleId: (articleId) => {
    return comments.filter(comment => comment.articleId === articleId);
  },


};

module.exports = commentService;
