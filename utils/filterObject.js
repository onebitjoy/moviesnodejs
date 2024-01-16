export const filterObject = (originalObj, ...allowedFields) => {
  let filteredObject = {}
  Object.keys(originalObj).forEach(key => {
    if (allowedFields.includes(key)) {
      filteredObject[key] = originalObj[key]
    }
  })
  return filteredObject
}