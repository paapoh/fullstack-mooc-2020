const blogsRouter = require('express').Router()
const Blog = require('../models/blog')



blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            response.status(400).send(error)
        })
})

blogsRouter.delete('/:id', async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } catch (exception) {
        next(exception)
    }
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