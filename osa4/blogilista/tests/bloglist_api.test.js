const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('Returned blogs equal right amount', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(6)
})

test('Returned blogs contain id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('Adding a blog increases amount', async () => {
    const testBlog = {
        title: 'Testiblogi',
        author: 'paavo',
        url: 'www.paavotestitsastdasdt.fi',
        likes: 21
    }
    
    const response = await api.post('/api/blogs').send(testBlog)
    expect(response.body.title).toBe(testBlog.title)
    
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('Likes default to 0', async () => {
    const testBlog = {
        title: 'Testiblogi2',
        author: 'paavo2',
        url: 'www.paavotestitsastdasdt2.fi',
    }

    const response = await api.post('/api/blogs').send(testBlog)
    expect(response.body.likes).toBe(0)
})

test('Blog having a null title and url returns 400 Bad Request', async () => {
    const testBlog = {
        author: 'paavo3',
        likes: 212
    }

    response = await api.post('/api/blogs').send(testBlog)
    expect(response.status).toBe(400)
})

test('Remove blog by id', async () => {
    let blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length)
    await api.delete(`/api/blogs/${blogs[0].id}`)
    blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
})

test('Edit blog by id', async () => {
    let blogs = await helper.blogsInDb()
    const blog = blogs[0]
    const newBlog = {
        likes: 420,
    }
    await api.put(`/api/blogs/${blog.id}`).send(newBlog)
    blogs = await helper.blogsInDb()
    expect(blogs[0].likes).toBe(420)
    expect(blogs[0].title).toBe(helper.initialBlogs[0].title)
})

afterAll(() => {
    mongoose.connection.close()
})