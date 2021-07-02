import { unwrapResult } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import path from 'src/constants/path'
import useAuthenticated from 'src/hooks/useAuthenticated'
import { unauthorize } from 'src/pages/Auth/auth.slice'
import { getCartPurChases } from 'src/pages/Cart/cart.slice'

export default function Authorization() {
  const status = useSelector(state => state.app.status)
  const history = useHistory()
  const dispatch = useDispatch()
  const authenticated = useAuthenticated()
  useEffect(() => {
    if (status === 401) {
      dispatch(unauthorize())
      history.push(path.login)
    }
  }, [dispatch, history, status])

  useEffect(() => {
    if (authenticated) {
      dispatch(getCartPurChases()).then(unwrapResult)
    }
  }, [authenticated, dispatch])
  return null
}
