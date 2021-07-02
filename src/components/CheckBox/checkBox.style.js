import styled from 'styled-components'

export const CheckBox = styled.label`
  display: inline-block;
  position: relative;
  cursor: pointer;
  user-select: none;
`
export const CheckBoxBox = styled.div`
  box-shadow: inset 0 2px rgb(0 0 0 / 2%);
  width: 18px;
  height: 18px;
  border: 1px solid rgba(0, 0, 0, 0.14);
  border-radius: 2px;
  text-align: center;
  user-select: none;
  position: relative;
  :before {
    position: absolute;
    content: '';
    height: 5px;
    width: 9px;
    border-left: 2px solid #fff;
    border-bottom: 2px solid #fff;
    transform: rotate(-45deg);
    left: 3px;
    top: 3px;
    display: none;
  }
  :hover {
    box-shadow: inset 0 2px 1px 0 rgb(0 0 0 / 9%);
  }
`
export const CheckBoxInput = styled.input`
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  :checked ~ ${CheckBoxBox} {
    background: #ee4d2d;
    border-color: #ee4d2d;
  }
  :checked ~ ${CheckBoxBox}:before {
    display: block;
  }
`
