const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        url: body.url,
        likes: body.likes,
        author: body.author,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    if (blog.user.toString() !== user.id) {
        return response.status(401).json({ error: 'user is not authorized' })
    }
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
        response.json(blog)
    } catch (exception) {
        next(exception)
    }
})

module.exports = blogsRouter