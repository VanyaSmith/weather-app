import { json2qs } from './json2qs'

const HOST = process.env.NEXT_PUBLIC_HOST

interface ApiParams extends RequestInit {
  query?: Record<string, string | string[]> | URLSearchParams
  bodyData?: object
}

export async function api<T>(url: string, params: ApiParams = {}): Promise<T> {
  const { query, bodyData, ...fetchParams } = params

  const headers: HeadersInit = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(fetchParams.headers || {}),
  }

  fetchParams.headers = headers
  if (bodyData) {
    fetchParams.body = JSON.stringify(bodyData)
  }
  const qs = query ? '?' + json2qs(query as Record<string, string> | URLSearchParams) : ''
  const resultUrl = url[0] === '/' ? `${HOST}${url}` : url

  return fetch(resultUrl + qs, fetchParams)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText)
      }
      return response.json()
    })
    .catch((error: Error) => {
      console.log({ url: resultUrl + qs, fetchParams, error })
      throw error
    })
}
