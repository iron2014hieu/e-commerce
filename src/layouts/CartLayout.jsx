import React from 'react'
import Footer from 'src/components/Footer'
import HeaderCart from 'src/components/HeaderCart'
import PropTypes from 'prop-types'
export default function CartLayout({ children }) {
  return (
    <div>
      <HeaderCart />
      {children}
      <Footer />
    </div>
  )
}
CartLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
