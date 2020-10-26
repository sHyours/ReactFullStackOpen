const dummy = () => {
  return 1;
};
const totalLikes = (blogs) => {
  return blogs.reduce((s, blog) => s + blog.likes, 0);
};
const favoriteBlog = (blogs) => {
  const favoriteBlog = blogs.reduce((max, blog) => {
    if (!max || max.likes < blog.likes) return blog;
    return max;
  });
  return {
    title: favoriteBlog.title,
    author: favoriteBlog.author,
    likes: favoriteBlog.likes,
  };
};
const mostBlogs = (blogs) => {
  const authorList = {};
  const mostBlogs = blogs.reduce((max, blog) => {
    if (authorList[blog.author]) {
      authorList[blog.author]++;
    } else {
      authorList[blog.author] = 1;
    }
    if (authorList[blog.author] > max.blogs) {
      return {
        author: blog.author,
        blogs: authorList[blog.author],
      };
    } else {
      return max;
    }
  }, { blogs: 0 });
  return {
    author: mostBlogs.author,
    blogs: mostBlogs.blogs,
  };
};
const mostLike = (blogs) => {
  const authorList = {};
  const mostLike = blogs.reduce((max, blog) => {
    if (authorList[blog.author]) {
      authorList[blog.author] += blog.likes;
    } else {
      authorList[blog.author] = blog.likes;
    }
    if (authorList[blog.author] > max.likes) {
      return {
        author: blog.author,
        likes: authorList[blog.author],
      };
    } else {
      return max;
    }
  }, { likes: 0 });
  return {
    author: mostLike.author,
    likes: mostLike.likes,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLike
};