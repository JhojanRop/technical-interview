export const request = async (endpoint, options) => {
  try {
    const res = await fetch(endpoint, options)
    if (!res.ok) throw await res.json()
    return await res.json()
  } catch (err) {
    throw err
  }
}