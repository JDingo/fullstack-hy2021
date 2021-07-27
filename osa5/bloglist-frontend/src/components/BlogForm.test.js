import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls onSubmit with correct information', () => {
    const createBlog = jest.fn()

    const component = render (
        <BlogForm createBlog={createBlog} />
    )

    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    const form = component.container.querySelector('form')

    fireEvent.change(titleInput, {
        target: { value: 'Test Title' }
    })
    fireEvent.change(authorInput, {
        target: { value: 'Test Author' }
    })
    fireEvent.change(urlInput, {
        target: { value: 'test.url' }
    })

    fireEvent.submit(form)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
    expect(createBlog.mock.calls[0][0].url).toBe('test.url')
})