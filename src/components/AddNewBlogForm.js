import React, {useState} from 'react';
import { getAll, create } from '../services/blogs.js';
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage} from '../reducers/notificationReducer.js';

const AddNewBlogForm = ({setBlogs, setAddNewBlogToggle}) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleCreateBlog = async (e) => {
        e.preventDefault();
    
        const newBlog = {
          title: title,
          author: author,
          url: url
        };
        try {
        await create(newBlog);
          const allBlogs = await getAll();
          setBlogs(allBlogs.reverse());
          setAddNewBlogToggle(false);
          dispatch(showSuccessMessage(`a new blog: ${title} successfully added!`));
        }
        catch (exception) {
          dispatch(showErrorMessage('failed to add a blog'));
        }
      };

  return (
            <form onSubmit={handleCreateBlog}>
              <label>Title</label>
                <input
                  type='text'
                  value={title}
                  name='title'
                  placeholder='title'
                  id='title'
                  onChange={({target}) => setTitle(target.value)}
                />
              <label>Author</label>
                <input
                  type='text'
                  value={author}
                  name='author'
                  placeholder='author'
                  id='author'
                  onChange={({target}) => setAuthor(target.value)}
                />
              <label>URL</label>
                <input
                  type='text'
                  value={url}
                  name='url'
                  placeholder='url'
                  id='url'
                  onChange={({target}) => setUrl(target.value)}
                />
                <button id='addBtn'>add</button>
            </form>
  );
};

export default AddNewBlogForm;