import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { addNotification } from './reducers/notificationReducer'
import { createNewBlog, initializeBlogs, addNewLike, removeBlog } from './reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'


const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector(state => state.notification)
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  //console.log('notification', notification)
  //console.log('user', user)

  useEffect(() => {
        dispatch(initializeBlogs())
  }, [dispatch])

  //console.log(store.getState())
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    //console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)

      if(user !== null) {
        //console.log(user)
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
        )
        blogService.setToken(user.token)
        //setUser(user)
        setUsername('')
        setPassword('')
        dispatch(addNotification(`${username} logged in`, false, 5))

      } else {
        //console.log("else: " + user)
        setUsername('')
        setPassword('')
        dispatch(addNotification('wrong username or password', true, 5))
        window.localStorage.clear()
      }

    } catch (exception) {
      console.log('exception caught: ' + exception)
      dispatch(addNotification('wrong credentials', true, 5))
    }
  }

  // eslint-disable-next-line no-unused-vars
  const handleLogout = async (event) => {
    window.localStorage.clear()
    setUser(null)
  }

  const loginForm = () => (
    <div className='container'>
    <Form onSubmit={handleLogin}>
      <Form.Group>
      <Form.Label>username</Form.Label>
        <Form.Control
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
     
      <Form.Label>password</Form.Label>
        <Form.Control
          id='password'
          type="text"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
    
      <Button variant = 'primary' id="login-button" type='submit'>login</Button>
    </Form.Group>
    </Form>
    </div>
  )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createNewBlog(blogObject))
    dispatch(addNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, false, 5))
  }

  const addLike = async (blogToModify) => {
    dispatch(addNewLike(blogToModify))
  }

  const deleteBlog = async (id) => {
    dispatch(removeBlog(id))
  }

  if (user === null && notification === '') {
    return (
      <div className='container'>
        <h2>Blogs</h2>
        <h2>Log in to application</h2>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  } else if (user === null && notification !== '') {
    //console.log(notification)
    return (
      <div className="container">
        <h2>Blogs</h2>
        <Notification />
        <h2>Log in to application</h2>
        <div>
          {loginForm()}
        </div>
      </div>
    )
  }
  return (
    <div className='container'>
      <h2>Blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <Button variant='primary' id='logout-button' onClick={handleLogout}>logout</Button>

      <Togglable buttonLabel = 'create new blog' ref = {blogFormRef}>
        <BlogForm
          createBlog = {addBlog}
        />
      </Togglable>

      <div id='blogs'>
        <ul id='blog'>
          {blogs
            .sort((a, b) => b.likes > a.likes ? 1 : -1)
            .map(blog =>
              <Blog
                key = {blog.id}
                blog = {blog}
                addLike = {addLike}
                user = {user}
                deleteBlog = {deleteBlog}
              />
            )}
        </ul>
      </div>
    </div>
  )
}


export default App