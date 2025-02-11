import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { schemas } from 'onecore-types'
import { z } from 'zod'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

type CustomerCard = {
  applicationProfile: z.infer<typeof schemas.v1.ApplicationProfileSchema>
}

export const useCustomerCard = (contactCode: string) =>
  useQuery<CustomerCard, AxiosError>({
    queryKey: ['customer-card', contactCode],
    enabled: Boolean(contactCode),
    queryFn: async () =>
      await axios
        .get(`${backendUrl}/tbd`, {
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
