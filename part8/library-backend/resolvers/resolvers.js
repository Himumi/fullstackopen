const queries = require('./queries/queries');
const mutations = require('./mutations/mutations');
const subscription = require('./subscriptions/subscriptions');

module.exports = {
  Query: {
    ...queries,
  },
  Mutation: {
    ...mutations,
  },
  Subscription: {
    ...subscription,
  },
};
