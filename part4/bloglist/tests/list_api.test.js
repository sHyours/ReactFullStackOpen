const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const test_helper = require('./test_helper');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async() => {
  await Blog.deleteMany({});
  for (const blog of test_helper.initialBlogs) {
    await (new Blog(blog)).save();
  }
  await User.deleteMany({});
  for (const user of test_helper.initialUser) {
    await (new User(user)).save();
  }
});
describe('login', () => {
  test('should login suceesful', async() => {
    const response = await api.post('/api/login').send(test_helper.initialUser[0]).expect(200).expect('Content-Type', /application\/json/);
    expect(response.body.token).toBeDefined();
  });
});
describe('get blogs', () => {
  test('bolgs are returned as json', async() => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
  });
});
describe('add a blog', () => {
  let token = null;
  beforeEach(async() => {
    const response = await api.post('/api/login').send(test_helper.initialUser[0]).expect(200).expect('Content-Type', /application\/json/);
    token = response.body.token;
  });
  test('should blog have a id prop', async() => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
  test('should add a valid blog', async() => {
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(test_helper.newBlog).expect(200).expect('Content-Type', /application\/json/);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(test_helper.initialBlogs.length + 1);
    expect(response.body[0].user.username).toBeDefined();
  });
  test('should add a blog without likes but default with 0', async() => {
    const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(test_helper.blogWithoutLikes).expect(200).expect('Content-Type', /application\/json/);
    expect(response.body.likes).toBe(0);
  });
  test('should the blog need to have title and url', async() => {
    await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(test_helper.errorBlog).expect(400).expect('Content-Type', /application\/json/);
  });
});
describe('update a blog', () => {
  let token = null;
  beforeEach(async() => {
    const response = await api.post('/api/login').send(test_helper.initialUser[0]).expect(200).expect('Content-Type', /application\/json/);
    token = response.body.token;
  });
  test('should update a blog success', async() => {
    const id = test_helper.initialBlogs[0]._id;
    const response = await api.put(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).send(test_helper.updateBlog).expect(200).expect('Content-Type', /application\/json/);
    expect(response.body.author).toBe(test_helper.updateBlog.author);
  });
});
describe('delete a blog', () => {
  let token = null;
  beforeEach(async() => {
    const response = await api.post('/api/login').send(test_helper.initialUser[0]).expect(200).expect('Content-Type', /application\/json/);
    token = response.body.token;
  });
  test('should delete a blog success', async() => {
    const id = test_helper.initialBlogs[1]._id;
    await api.delete(`/api/blogs/${id}`).set('Authorization', `Bearer ${token}`).expect(204);
  });
});
describe('add a user', () => {
  test('should return user with blogs', async() => {
    const response = await api.get('/api/users/').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body[0].blogs[0].url).toBeDefined();
  });
  test('should the valid user haven to be added', async() => {
    await api.post('/api/users/').send(test_helper.newUser).expect(200);
    const response = await api.get('/api/users/').expect(200).expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(test_helper.initialUser.length + 1);
  });
  test('should the error user haven\'t to be added', async() => {
    const response = await api.post('/api/users/').send(test_helper.errorUser).expect(400);
    expect(response.body.error).toBe('username and password are at least three characters are required.');
  });
});
afterAll(() => {
  mongoose.connection.close();
});