const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    const reducer = (sum, blog) => {
        return sum + blog.likes
    }
    return blogs.reduce(reducer, 0)
}


const favoriteBlog = (blogs) => {
    const reducer = (max, blog) => {
        if (max.likes < blog.likes) {
            return blog
        } else {
            return max
        }
    }
    return blogs.reduce(reducer, {likes: 0})
}


const mostBlogs = (blogs) => {
    const reducer = (max, blog) => {
        if (max.blogs < blog.blogs) {
            return blog
        } else {
            return max
        }
    }
    const counts = blogs.map(blog => blog.author)
    const authors = [...new Set(counts)]
    const authorCounts = authors.map(author => {
        const count = blogs.filter(blog => blog.author === author).length
        return {author: author, blogs: count}
    })
    return authorCounts.reduce(reducer, {blogs: 0})
}


const mostLikes = (blogs) => {
    const reducer = (max, blog) => {
        if (max.likes < blog.likes) {
            return blog
        } else {
            return max
        }
    }
    const counts = blogs.map(blog => blog.author)
    const authors = [...new Set(counts)]
    const authorCounts = authors.map(author => {
        const count = blogs.filter(blog => blog.author === author).reduce((sum, blog) => {
            return sum + blog.likes
        }, 0)
        return {author: author, likes: count}
    })
    return authorCounts.reduce(reducer, {likes: 0})
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}