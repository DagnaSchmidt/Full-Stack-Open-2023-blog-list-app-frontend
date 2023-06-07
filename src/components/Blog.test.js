import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
    const renderedBlog = {
        title: 'Sample 2 title', 
        author: 'Sample 2 author', 
        url: 'sample 2 url', 
        likes: 435, 
        id: '647b980a05c60c8e5c38b30f',
        user: {
            username: 'Dagna', 
            name: 'dag', 
            id: '647b3bd4f811cf85caa1ae4c'
        }
    };
    const loggedUser = {
        username: 'Dagna', 
        name: 'dag'
    };

    render(<Blog blog={renderedBlog} user={loggedUser} />);

    const title = screen.getByText('Sample 2 title');
    expect(title).toBeDefined();

    const author = screen.getByText('Sample 2 author');
    expect(author).toBeDefined();

    const url = screen.queryByText('sample 2 url');
    expect(url).toBeNull();

    const likes = screen.queryByText('435');
    expect(likes).toBeNull();

    // screen.debug();
})