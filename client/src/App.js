import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { Container, Typography } from '@material-ui/core/index'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import SignUpForm from './components/SignUpForm'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogReducer'
import { checkLoggedUser, login } from './reducers/loginReducer'
import Users from './components/Users'
import User from './components/User'
import Menu from './components/Menu'
import BlogList from './components/BlogList'
import userService from './services/users'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch( initializeBlogs() )
  }, [])

  useEffect(() => {
    dispatch( checkLoggedUser() )
  }, [])

  const displayNotificationWith = (message, status='success') => {
    const seconds = 5
    dispatch( setNotification({ message, status }, seconds) )
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch( login(username, password) )

    setUsername('')
    setPassword('')
  }

  const handleSignUp = async ({ username, name, password }) => {
    try {
      await userService.create({ 
        username,
        name,
        password,
      })
      dispatch( login(username, password) )
    } catch (error) {
      const message = error.response.data.error
      const uniqueUsernameMessage = `The username: '${username}' has already been taken`
      const uniqueUsernameError = 'expected `username` to be unique'

      if ( message.includes(uniqueUsernameError) ) {
        return displayNotificationWith(uniqueUsernameMessage, 'error')
      }

      displayNotificationWith(message, 'error')
    }
  }

  const handleInputOnChange = (callback) => {
    return ({ target }) => {
      callback(target.value)
    }
  }

  const addBlog = async (blogObject) => {

    try {
      dispatch( createBlog(blogObject) )

      blogFormRef.current.toggleVisibility()
      displayNotificationWith(
        `a new blog ${blogObject.title} by ${blogObject.author} added`
      )
    } catch (exception) {
      displayNotificationWith(exception.response.data.error, 'error')
    }
  }

  const blogFormRef = useRef()
  const signUpFormRef = useRef()

  // Sort in descending order
  const sortedBlogsByLikes = blogs.sort((a,b) => b.likes - a.likes)

  if (user === null) {
    return (
      <Container>
        <Typography variant='h4' component='h2'>
          Log in to application
        </Typography>
        <Notification notification={notification} />
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsernameChange={handleInputOnChange(setUsername)}
          handlePasswordChange={handleInputOnChange(setPassword)}
        />
        <Togglable buttonLabel='Sign Up' ref={signUpFormRef}>
          <SignUpForm handleSignUp={handleSignUp} />
        </Togglable>
      </Container>
    )
  }

  return (
    <Container>
      <Typography variant='h4' component='h2'>
        blogs
      </Typography>
      <Menu />
      <Notification notification={notification} />

      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/blogs/:id'>
          <Blog setNotification={displayNotificationWith} />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>

          <BlogList blogs={sortedBlogsByLikes} />
        </Route>
      </Switch>
    </Container>
  )
}

export default App