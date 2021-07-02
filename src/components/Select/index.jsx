import * as S from './select.style'
import PropTypes from 'prop-types'

export default function Select({
  onChange,
  value = '',
  title,
  options = [],
  titleValue = '',
  ...props
}) {
  const handleChange = event => {
    const value = event.target.value
    onChange && onChange(value)
  }
  return (
    <S.Select onChange={handleChange} value={value} {...props}>
      <option disabled value={titleValue}>
        {title}
      </option>
      {options.map(({ name, value }, index) => (
        <option key={index} value={value}>
          {name}
        </option>
      ))}
    </S.Select>
  )
}
Select.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  title: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      titleValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    })
  ),
  titleValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
}
