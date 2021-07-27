import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders blog at first with only title and author', () => {
    const blog = {
        title: 'Test Title',
        author: 'Test Author',
        url: 'Test.url',
        likes: 0,
        user: {
            username: 'Tester'
        }
    }

    const component = render (
        <Blog blog={blog} username={'Tester'} />
    )

    expect(component.container).toHaveTextContent('Test Title')
    expect(component.container).toHaveTextContent('Test Author')
    expect(component.container).not.toHaveTextContent('Test.url')
    expect(component.container).not.toHaveTextContent('0')
})