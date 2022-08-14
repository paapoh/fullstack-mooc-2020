import { useState } from "react"

const BlogForm = (props) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [formVisible, setFormVisible] = useState(false)
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }

    const addBlog = async (event) => {
        event.preventDefault()
        props.createBlog({
            title, author, url
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setFormVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
            <div>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                title
                <input
                    id='titleInput'
                    role="textbox"
                    type="text"
                    value={title}
                    name="Title"
                    onChange={({ target }) => setTitle(target.value)}
                />
                </div>
                <div>
                author
                <input
                    id='authorInput'
                    role="textbox"
                    type="text"
                    value={author}
                    name="Author"
                    onChange={({ target }) => setAuthor(target.value)}
                />
                </div>
                <div>
                url
                <input
                    id='urlInput'
                    role="textbox"
                    type="text"
                    value={url}
                    name="Url"
                    onChange={({ target }) => setUrl(target.value)}
                />
                </div>
                <button id="createButton" type="submit">create</button>
            </form>
            </div>
            <button onClick={() => setFormVisible(false)}>cancel</button>
        </div>
        </div>
    )
}

export default BlogForm