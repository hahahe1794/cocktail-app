const BASE = ''

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: '请求失败' }))
    throw new Error(err.error || '请求失败')
  }
  return res.json()
}

export const api = {
  get(url, params = {}) {
    const qs = new URLSearchParams(
      Object.entries(params).filter(([_, v]) => v != null && v !== '')
    ).toString()
    return request(`${url}${qs ? '?' + qs : ''}`)
  },
  post(url, body) {
    return request(url, { method: 'POST', body: JSON.stringify(body) })
  },
  put(url, body) {
    return request(url, { method: 'PUT', body: JSON.stringify(body) })
  },
  delete(url) {
    return request(url, { method: 'DELETE' })
  },
}
