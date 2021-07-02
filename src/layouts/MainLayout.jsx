import React from 'react'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'
import PropTypes from 'prop-types'

export default function MainLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
MainLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ])
}
