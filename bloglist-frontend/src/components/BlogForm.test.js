import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('call onSubmit with the right data', async () => {
    const test = jest.fn()

    const userforevent = userEvent.setup()

    render(<BlogForm createBlog={test} />)

    const showButton = screen.getByText(/new blog/i)
    await userforevent.click(showButton)

    const title = await screen.getAllByRole('textbox')[0]
    const author = await screen.getAllByRole('textbox')[1]
    const url = await screen.getAllByRole('textbox')[2]

    await userforevent.type(title, 'test title')
    await userforevent.type(author, 'test author')
    await userforevent.type(url, 'test url')

    const form = await screen.getByText('create')
    await userforevent.click(form)

    expect(test.mock.calls[0][0].title).toBe('test title')
    expect(test.mock.calls[0][0].author).toBe('test author')
    expect(test.mock.calls[0][0].url).toBe('test url')
} )