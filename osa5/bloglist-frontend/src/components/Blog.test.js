import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    const mockLikeHandler = jest.fn()
    const mockDeleteHandler = jest.fn()

    beforeEach(() => {
        const blog = {
            title: 'Test Title',
            author: 'Test Author',
            url: 'Test.url',
            likes: 0,
            user: {
                username: 'Tester'
            }
        }

        component = render(
            <Blog blog={blog} username={'Tester'} handleLike={mockLikeHandler} handleDelete={mockDeleteHandler} />
        )
    })

    test('renders blog at start with only title and author', () => {
        expect(component.container).toHaveTextContent('Test Title')
        expect(component.container).toHaveTextContent('Test Author')
        expect(component.container).not.toHaveTextContent('Test.url')
        expect(component.container).not.toHaveTextContent('0')
    })

    test('renders blog with full info after opened', () => {
        const button = component.getByText('Show')
        fireEvent.click(button)

        expect(component.container).toHaveTextContent('Test Title')
        expect(component.container).toHaveTextContent('Test Author')
        expect(component.container).toHaveTextContent('Test.url')
        expect(component.container).toHaveTextContent('0')
    })

    test('clicking like button twice calls mock function twice', () => {
        const showButton = component.getByText('Show')
        fireEvent.click(showButton)

        const likeButton = component.getByText('Like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)

        expect(mockLikeHandler.mock.calls).toHaveLength(2)
    })
})