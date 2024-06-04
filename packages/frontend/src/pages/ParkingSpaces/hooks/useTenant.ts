import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Listing } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export const useTenant = (q: string) =>
  useQuery<Array<Listing>, AxiosError>({
    queryKey: ['tenant', q],
    enabled: Boolean(q),
    queryFn: () =>
      axios
        .get(`${backendUrl}/tenant?q=${q}`, {
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
