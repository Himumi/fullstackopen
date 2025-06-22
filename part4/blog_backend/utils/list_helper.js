const _ = require('lodash');

const dummy = () => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes);
  const max = Math.max(...likes);
  return blogs.find(blog => blog.likes === max);
};

const mostBlogs = blogs => {
  const mapper = (value, key) => new Object({ author: key, blogs: value });
  const filtered = _.map(_.countBy(blogs, 'author'), mapper);
  return _.maxBy(filtered, 'blogs');
};

const mostLikes = blogs => {
  const reducer = (result, value, key) => {
    result[value.author] = (result[value.author] || 0) + value.likes;
    return result;
  };
  const mapper = (value, key) => new Object({ author: key, likes: value });
  return _.maxBy(_.map(_.reduce(blogs, reducer, {}), mapper), 'likes');
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
};