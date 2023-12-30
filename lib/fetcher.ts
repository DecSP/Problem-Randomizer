export default async function fetcher<T>(
  info: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  try {
    const resp = await fetch(info, init)
    return await resp.json()
  } catch (error: any) {
    return await Promise.reject(error)
  }
}
