import { useEffect, useState } from 'react'

interface UseFetchParams<T> {
  api: () => Promise<T>
  keys?: string[]
}

function useFetch<T>(params: UseFetchParams<T>) {
  const { api, keys } = params
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState<T>()

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const res = await api()
        if (res) {
          setData(res)
        }
      } catch (error) {
        setIsError(true)
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
    // eslint-disable-next-line
  }, keys ?? [])

  return {
    isError,
    isLoading,
    data,
  }
}

export default useFetch
