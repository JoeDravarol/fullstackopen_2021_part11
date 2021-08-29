import React, { useState } from 'react'
import { TextField, Button, Box } from '@material-ui/core'

const SignUpForm = ({ handleSignUp }) => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    handleSignUp({
      username,
      name,
      password
    })

    setUsername('')
    setName('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <TextField
          id='username'
          label='username'
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          required
        />
      </div>
      <div>
        <TextField
          id='name'
          label='name'
          value={name}
          onChange={({ target }) => setName(target.value)}
          required
        />
      </div>
      <div>
        <TextField
          id='password'
          label='password'
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          required
        />
      </div>
      <Box mt={1}>
        <Button variant='contained' color='primary' type='submit'>
          Sign Up
        </Button>
      </Box>
    </form>
  )
}

export default SignUpForm
