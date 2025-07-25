const pubsub = require('../helpers/pubsub');

const bookAdded = {
  subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED'),
};

module.exports = bookAdded;
