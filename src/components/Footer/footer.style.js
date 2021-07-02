import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const StyledFooter = styled.footer`
  width: 100%;
  min-width: max-content;
`
export const Footer1 = styled.div`
  margin-top: 3rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  div {
    color: rgba(0, 0, 0, 0.6);
  }
`
export const FooUl = styled.ul`
  text-decoration: none;
  margin: 0 0 1.5rem;
  padding: 0;
`
export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: rgba(0, 0, 0, 0.54);
  margin-bottom: 1.25rem;
  margin-top: 2.5rem;
  text-transform: uppercase;
`
export const FooLi = styled.li`
  display: list-item;
`
export const FooLink = styled(NavLink)`
  text-transform: capitalize;
  line-height: 2.5rem;
`
export const Footer2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const FooContact = styled.div`
  color: rgba(0, 0, 0, 0.52);
  line-height: 2rem;
`
