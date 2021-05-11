export function json2qs(obj?: Record<string, string> | URLSearchParams) {
  if (obj) {
    return new URLSearchParams(obj).toString()
  }
}
