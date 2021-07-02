import { useSelector } from 'react-redux'

export default function useAuthenticated() {
  return useSelector(state => Boolean(state.auth.profile._id))
}
