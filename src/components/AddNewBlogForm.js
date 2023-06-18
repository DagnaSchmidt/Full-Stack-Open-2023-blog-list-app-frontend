import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { showSuccessMessage, showErrorMessage} from '../reducers/notificationReducer.js';
import { addNewBlog } from '../reducers/blogsReducer.js';
import { addBtn, inputContainer } from '../styles/styles.js';

const AddNewBlogForm = ({setAddNewBlogToggle}) => {
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
          dispatch(addNewBlog(newBlog));
          setAddNewBlogToggle(false);
          dispatch(showSuccessMessage(`a new blog: ${title} successfully added!`));
        }
        catch (exception) {
          dispatch(showErrorMessage('failed to add a blog'));
        }
      };

  return (
            <form onSubmit={handleCreateBlog}>
              <div style={inputContainer}>
                <label>Title</label>
                  <input
                    type='text'
                    value={title}
                    name='title'
                    placeholder='title'
                    id='title'
                    onChange={({target}) => setTitle(target.value)}
                  />
              </div>
              <div style={inputContainer}>
                <label>Author</label>
                  <input
                    type='text'
                    value={author}
                    name='author'
                    placeholder='author'
                    id='author'
                    onChange={({target}) => setAuthor(target.value)}
                  />
              </div>
              <div style={inputContainer}>
                <label>URL</label>
                <input
                  type='text'
                  value={url}
                  name='url'
                  placeholder='url'
                  id='url'
                  onChange={({target}) => setUrl(target.value)}
                />
              </div>
              <button style={addBtn} id='addBtn'>add</button>
            </form>
  );
};

export default AddNewBlogForm;