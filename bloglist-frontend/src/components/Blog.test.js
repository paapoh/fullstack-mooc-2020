import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/Component-Testing-with-React-Testing-Library.html',
        likes: 10,
        user: {
            username: 'testipaapoh',
            name: 'paa poh'
        }
    }

    const user = {
        username: 'testipaapoh',
        name: 'paa poh'
    }


    render(<Blog blog={blog} user={user}/>)

    const title = screen.getByText(/Component testing is done with react-testing-library/i)
    const author = screen.getByText(/Robert C. Martin/i)
    //expect url to be hidden
    expect(screen.queryByText(/http:\/\/blog.cleancoder.com\/uncle-bob\/2017\/05\/05\/Component-Testing-with-React-Testing-Library.html/i)).not.toBeInTheDocument()
    //expect likes to be hidden
    expect(screen.queryByText(/10/i)).not.toBeInTheDocument()
} )

test('clicking the button shows url and likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/Component-Testing-with-React-Testing-Library.html',
        likes: 10,
        user: {
            username: 'testipaapoh2',
            name: 'paa poh'
        }
    }

    const user = {
        username: 'testipaapoh2',
        name: 'paa poh2'
    }

    render(<Blog blog={blog} user={user}/>)

    const userforevent = userEvent.setup()
    const button = screen.getByText(/show/i)
    await userforevent.click(button)

    const url = screen.getByText(/http:\/\/blog.cleancoder.com\/uncle-bob\/2017\/05\/05\/Component-Testing-with-React-Testing-Library.html/i)
    const likes = screen.getByText(/10/i)

    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
})

test('clicking the button twice shows url and likes', async () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/Component-Testing-with-React-Testing-Library.html',
        likes: 10,
        user: {
            username: 'testipaapoh3',
            name: 'paa poh'
        }
    }

    const user = {
        username: 'testipaapoh3',
        name: 'paa poh3'
    }

    const test = jest.fn()

    render(<Blog blog={blog} user={user} likeHandler={test}/>)

    const userforevent = userEvent.setup()
    const button = screen.getByText(/show/i)
    await userforevent.click(button)

    const userforevent2 = userEvent.setup()
    const likeButton = screen.getByText('like')
    await userforevent2.click(likeButton)
    await userforevent2.click(likeButton)

    expect(test.mock.calls).toHaveLength(2)
} )