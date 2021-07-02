import React from 'react'
import Footer from 'src/components/Footer'
import HeaderAuth from 'src/components/HeaderAuth'
import PropTypes from 'prop-types'

export default function RegisterLayout({ children, title }) {
  return (
    <div>
      <HeaderAuth title={title} />
      {children}
      <Footer />
    </div>
  )
}
RegisterLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
  title: PropTypes.string
}
