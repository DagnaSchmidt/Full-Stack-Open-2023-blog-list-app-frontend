import React, {useState} from 'react';
import AddNewBlogForm from './AddNewBlogForm.js';
import BlogsList from './BlogsList.js';

const Main = () => {
    const [addNewBlogToggle, setAddNewBlogToggle] = useState(false);

  return (
    <div>
        <h2>Blogs</h2>
        {addNewBlogToggle &&
            <AddNewBlogForm setAddNewBlogToggle={setAddNewBlogToggle} />
        }
        <button onClick={() => setAddNewBlogToggle(!addNewBlogToggle)}>{addNewBlogToggle ? 'cancel' : 'add new blog'}</button>
        <h5>List of blogs:</h5>
        <BlogsList />
    </div>
  );
};

export default Main;