export const isEmail = v =>
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)

export const payloadCreator = asyncFunc => async (arg, thunkAPI) => {
  try {
    const res = await asyncFunc(arg)
    return res
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
}
//thay name trong url (space => -, % nếu có => '' và nối -i.{_id})
export const generateNameId = ({ name, _id }) =>
  encodeURIComponent(`${name.replace(/\s/g, '-').replace(/%/g, '')}-i.${_id}`)

export const getIdFromNameId = url => {
  const arr = url.split('-i.')
  return arr[arr.length - 1]
}
export const rateSale = (original, sale) => {
  return Math.round(((original - sale) / original) * 100) + '%'
}
// var moneyTest_RE = /^\$?\d+((,\d{3})+)?(\.\d+)?$/;
export const formatMoney = (value, character = '.') =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, character)
export const numberFormat = value => new Intl.NumberFormat().format(value)
export const formatK = value => {
  const price = Number((Number(value) / 1000).toFixed(2))
  if (price > 1) {
    return price + 'k'
  }
  return value
}
// interface array: [{_id, ...data}]
export const convertArrayToObject = (array, _key) => {
  let result = {}
  for (const item of array) {
    result[item._id] = item
  }
  return result
}
