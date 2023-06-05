import React from 'react'

const AddNewBlogForm = ({handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl}) => {
  return (
            <form onSubmit={handleCreateBlog}>
              <label>Title</label>
                <input
                  type='text'
                  value={title}
                  name='title'
                  onChange={({target}) => setTitle(target.value)}
                />
              <label>Author</label>
                <input
                  type='text'
                  value={author}
                  name='author'
                  onChange={({target}) => setAuthor(target.value)}
                />
              <label>URL</label>
                <input
                  type='text'
                  value={url}
                  name='url'
                  onChange={({target}) => setUrl(target.value)}
                />
                <button>add</button>
            </form>
  )
}

export default AddNewBlogForm;