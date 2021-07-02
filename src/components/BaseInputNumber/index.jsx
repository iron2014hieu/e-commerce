import PropTypes from 'prop-types'
export default function BaseInputNumber({ onChange, value, onBlur, ...props }) {
  const handleChange = event => {
    const val = event.target.value
    if ((/^[0-9]+$/.test(val) || val === '') && onChange) {
      onChange(val)
    }
  }
  const handleBlur = event => {
    const val = event.target.value
    onBlur && onBlur(val)
  }
  return (
    <input
      type="text"
      onChange={handleChange}
      onBlur={handleBlur}
      value={value}
      {...props}
    />
  )
}
BaseInputNumber.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
