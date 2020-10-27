const mongoose = require('mongoose');
const supertest = require('supertest');
const Blog = require('../models/blog');
const app = require('../app');
const test_helper = require('./test_helper');

const api = supertest(app);

beforeEach(async() => {
  await Blog.deleteMany({});
  for (const blog of test_helper.initialBlogs) {
    await (new Blog(blog)).save();
  }
});
describe('get blogs', () => {
  test('bolgs are returned as json', async() => {
    await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/);
  });
});
describe('add a blog', () => {
  test('should blog have a id prop', async() => {
    const response = await api.get('/api/blogs');
    response.body.forEach(blog => {
      expect(blog.id).toBeDefined();
    });
  });
  test('should add a valid blog', async() => {
    await api.post('/api/blogs').send(test_helper.newBlog).expect(201).expect('Content-Type', /application\/json/);
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(test_helper.initialBlogs.length + 1);
  });
  test('should add a blog without likes but default with 0', async() => {
    const response = await api.post('/api/blogs').send(test_helper.blogWithoutLikes).expect(201).expect('Content-Type', /application\/json/);
    expect(response.body.likes).toBe(0);
  });
  test('should the blog need to have title and url', async() => {
    await api.post('/api/blogs').send(test_helper.errorBlog).expect(400).expect('Content-Type', /application\/json/);
  });
});
describe('update a blog', () => {
  test('should update a blog success', async() => {
    const id = test_helper.initialBlogs[0]._id;
    const response = await api.put(`/api/blogs/${id}`).send(test_helper.updateBlog).expect(200).expect('Content-Type', /application\/json/);
    expect(response.body.author).toBe(test_helper.updateBlog.author);
  });
});
describe('delete a blog', () => {
  test('should delete a blog success', async() => {
    const id = test_helper.initialBlogs[1]._id;
    await api.delete(`/api/blogs/${id}`).expect(204);
  });
});
afterAll(() => {
  mongoose.connection.close();
});