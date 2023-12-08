export default async function fetcher<T>(
  info: RequestInfo,
  init?: RequestInit,
) {
  try {
    const resp = await fetch(info, init)
    return (await resp.json()) as Promise<T>
  } catch (error) {
    console.log(error)
  }
}
