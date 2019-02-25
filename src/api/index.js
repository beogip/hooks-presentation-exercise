const API_URL = 'http://www.thecolorapi.com/id?hex='

export async function getColorName(color) {
  const response = await fetch(`${API_URL}${color.replace('#', '')}`)
  const result = await response.json()
  return result.name.value
}
