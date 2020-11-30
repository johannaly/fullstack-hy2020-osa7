import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setNewTitle] = useState('')
  const [author, setNewAuthor] = useState('')
  const [url, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>New Blog</h2>
      <Form onSubmit= {addBlog}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
                    
          <Form.Control
            id='title'
            value={title}
            onChange={handleTitleChange}
          />
      
        <Form.Label>Author:</Form.Label>
                    
          <Form.Control
            id='author'
            type = 'text'
            value = {author}
            onChange = {handleAuthorChange}
          />
        
        <Form.Label>Url:</Form.Label>
          <Form.Control
            id='url'
            type = "text"
            value = {url}
            onChange = {handleUrlChange}
          />
        
        <Button variant='primary' id='createNew-button' type = "submit">create new</Button>
      </Form.Group>
      </Form>
    </div>
  )
}




export default BlogForm