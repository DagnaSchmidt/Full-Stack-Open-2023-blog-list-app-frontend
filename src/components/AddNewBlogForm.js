import React, {useState} from 'react';
import { getAll, create } from '../services/blogs.js';

const AddNewBlogForm = ({setErrorMessage, setBlogs, setAddNewBlogToggle}) => {
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
          setErrorMessage({title: `a new blog: ${title} successfully added!`, border: 'green'});
          setTimeout(() => {setErrorMessage(null);}, 5000);
          const allBlogs = await getAll();
          setBlogs(allBlogs.reverse());
          setAddNewBlogToggle(false);
        }
        catch (exception) {
          setErrorMessage({title: 'failed to add blog', border: 'red'});
          setTimeout(() => {setErrorMessage(null);}, 5000);
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