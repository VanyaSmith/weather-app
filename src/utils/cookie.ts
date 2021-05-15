export function setCookie(name: string, value: object) {
  const cookie = [name, '=', encodeURI(JSON.stringify(value)), '; path=/;'].join('')
  document.cookie = cookie
}

export function readCookie<T>(name: string, cookie?: string): T | undefined {
  let curCookie = cookie ? decodeURI(cookie) : ''
  if (typeof document !== 'undefined' && !cookie) {
    curCookie = document.cookie
  }
  if (!curCookie) return

  let matchResult = curCookie.match(new RegExp(name + '=([^;]+)'))
  if (matchResult) {
    return JSON.parse(matchResult[1])
  }
}
