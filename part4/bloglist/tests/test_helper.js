// eslint-disable-next-line no-unused-vars
const initialBlogs = [{
  _id: '5a422a851b54a676234d17f7',
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
  user: '5a422b3a1b54a676234d17f1',
  __v: 0
}, {
  _id: '5a422aa71b54a676234d17f8',
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
  user: '5a422b3a1b54a676234d17f1',
  __v: 0
}, {
  _id: '5a422b3a1b54a676234d17f9',
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
  __v: 0
}];
const newBlog = {
  userId: '5a422b3a1b54a676234d17f1',
  _id: '5a422bc61b54a676234d17fc',
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
};
const blogWithoutLikes = {
  userId: '5a422b3a1b54a676234d17f1',
  _id: '5a422b891b54a676234d17fa',
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
};
const errorBlog = {
  userId: '5a422b3a1b54a676234d17f1',
  _id: '5a422ba71b54a676234d17fb',
  author: 'Robert C. Martin',
  likes: 0,
};
const updateBlog = {
  userId: '5a422b3a1b54a676234d17f1',
  title: 'React patterns',
  author: 'Michael Jacker',
  url: 'https://reactpatterns.com/',
  likes: 7
};

const initialUser = [{
  _id: '5a422b3a1b54a676234d17f1',
  username: 'Bob',
  name: 'Bob',
  password: '12341',
  passwordHash: '$2b$10$C3cZ/tg/0d0TE0iyEhRsKOivbnfhkn.1yBARpL911/a/G1v2IJ7QS',
  blogs: [
    '5a422a851b54a676234d17f7', '5a422aa71b54a676234d17f8'
  ]
}];

const newUser = {
  username: 'Bobo',
  name: 'Bobo',
  password: '2314',
};

const errorUser = {
  username: 'Bob',
  name: 'Bob',
  password: '2314',
};
module.exports = {
  initialBlogs,
  newBlog,
  blogWithoutLikes,
  errorBlog,
  updateBlog,
  newUser,
  errorUser,
  initialUser
};