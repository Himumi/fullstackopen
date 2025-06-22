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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};