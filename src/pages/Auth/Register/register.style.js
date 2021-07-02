import { Button } from 'src/assets/styles/util'
import styled from 'styled-components'

export const StyledRegister = styled.div`
  background-color: rgb(238, 77, 45);
  min-width: max-content;
`
export const Container = styled.div`
  /* background-image: url('https://cf.shopee.vn/file/99aaade6e275c3aa6592f9e26c2bfa21'); */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 60rem;
  width: 104rem;
  min-height: 37.5rem;
  position: relative;
`

export const Form = styled.form`
  width: 40rem;
  position: absolute;
  top: 8rem;
  right: -1rem;
  background-color: #fff;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
  border-radius: 0.25rem;
  padding: 3.5rem 3rem 3rem;
`
export const FormTitle = styled.div`
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #222;
  text-transform: capitalize;
`

export const FormControl = styled.div`
  margin-bottom: 0.5rem;
`
export const FormButton = styled.div`
  margin-bottom: 0.5rem;
  ${Button} {
    width: 100%;
    height: 4rem;
    font-size: 1.4rem;
    text-transform: uppercase;
  }
`
export const FormFooter = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  .link {
    margin-left: 0.4rem;
  }
`
