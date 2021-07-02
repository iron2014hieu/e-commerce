import React from 'react'
import { Redirect } from 'react-router-dom'
import path from 'src/constants/path'
import useAuthenticated from 'src/hooks/useAuthenticated'

export default function UnAuthenticated({ children }) {
  const authenticated = useAuthenticated()
  if (!authenticated) {
    return <Redirect to={path.login} />
  }
  return <>{children}</>
}
