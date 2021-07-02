import React from 'react'
import { Message } from './errorMessage.style'

export default function ErrorMessage({ errors, name }) {
  const error = errors[name]

  return <Message>{error && error.message}</Message>
}
