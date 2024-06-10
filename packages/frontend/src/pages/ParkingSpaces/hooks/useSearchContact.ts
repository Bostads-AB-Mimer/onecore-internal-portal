import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Contact } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export const useSearchContact = (q: string) =>
  useQuery<Array<Contact>, AxiosError>({
    queryKey: ['search-contact'],
    enabled: Boolean(q?.length >= 3),
    queryFn: () =>
      axios
        .get(`${backendUrl}/contact/search?q=${q}`, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        })
        .then((res) => res.data),
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
  })
