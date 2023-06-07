import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import jest from 'jest-mock';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import Blog from './Blog';

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

test('renders content', () => {
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
});

test('render url and likes when btn is clicked', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();
    render(<Blog blog={renderedBlog} user={loggedUser} />);

    const button = screen.getByText('view details');
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(1);

    const url = screen.getByText('sample 2 url');
    expect(url).toBeDefined();

    const likes = screen.getByText('435');
    expect(likes).toBeDefined();
});

test('double clicked add like', async () => {
    const user = userEvent.setup();
    const mockHandler = jest.fn();
    render(<Blog blog={renderedBlog} user={loggedUser} />);

    const button = screen.getByText('add');
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);

    const likes = screen.getByText('437');
    expect(likes).toBeDefined();
});