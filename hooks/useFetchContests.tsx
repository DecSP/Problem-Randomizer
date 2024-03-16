import { client } from '@/lib/apis'
import useFetch from '@/hooks/useFetch'

const KEY = '/api/list-contest'

export const useFetchContests = () => {
  return useFetch(() => client.getListContest(), [KEY])
}
