import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledHeader = styled.div`
  width: 100%;
  min-width: max-content;
  box-shadow: 0 6px 6px rgb(0 0 0 / 6%);
`
export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
`
export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
`
export const HeaderIcon = styled(Link)`
  margin-bottom: 0.5rem;
  svg {
    fill: #ee4d0d;
    width: auto;
    height: 4.2rem;
  }
`
export const HeaderTitle = styled.div`
  color: #222;
  font-size: 2.4rem;
  margin-left: 1.2rem;
`
