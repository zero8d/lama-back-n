export const booleanIze = (value: any) => {
  if (
    value === 'true' ||
    value === 'True' ||
    value === 'TRUE' ||
    value === '1'
  ) {
    return true
  }
  if (
    value === 'false' ||
    value === 'False' ||
    value === 'FALSE' ||
    value === '0'
  ) {
    return false
  }
  return undefined
}
