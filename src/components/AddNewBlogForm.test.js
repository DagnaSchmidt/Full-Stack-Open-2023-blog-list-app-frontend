import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import jest from 'jest-mock';
import AddNewBlogForm from './AddNewBlogForm';
import userEvent from '@testing-library/user-event';

test('add new blog', async () => {
    const createBlog = jest.fn();
    const user = userEvent.setup();
  
    render(<AddNewBlogForm handleCreateBlog={createBlog} />);

    const input1 = screen.getByPlaceholderText('text');
    const input2 = screen.getByPlaceholderText('author');
    const input3 = screen.getByPlaceholderText('url');
    const sendButton = screen.getByText('add');

    await user.type(input1, 'testing a form...');
    await user.type(input2, 'testing a form...');
    await user.type(input3, 'testing a form...');
    await user.click(sendButton);

    expect(createBlog.mock.calls).toHaveLength(1);
})
