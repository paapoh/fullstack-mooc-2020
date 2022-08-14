import { useState } from "react"
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, user, likeHandler }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const likeHandle = async (event) => {
    event.preventDefault()
    const newBlog = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1
    }
    likeHandler(newBlog)
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button id="toggleButton" onClick={toggleVisibility}>{visible ? 'hide' : 'show'}</button>
      {visible && <div>{blog.url}</div>}
      {visible && <div>likes {blog.likes}
      <button onClick={likeHandle}>like</button>
      </div>}
      {visible && <div>{blog.author}</div>}
      {user.username === blog.user.username && <button onClick={async () => {
        if(window.confirm(`remove ${blog.title} by ${blog.author}`)) {
          blogService.remove(blog.id)
          blogService.getAll().then(blogs => {
            blogs.sort ((a, b) => b.likes - a.likes)
            setBlogs( blogs )
          })
        }
      }
      }>remove</button>}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog