import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Contact, Lease } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

type NonEmptyArray<T> = [T, ...T[]]

export type Tenant = Omit<Contact, 'leases' | 'isTenant'> & {
  queuePoints: number
  currentHousingContract?: Lease
  upcomingHousingContract?: Lease
  parkingSpaceContracts?: Lease[]
  housingContracts: NonEmptyArray<Lease>
}

export const useContactByContactCode = (contactCode?: string) =>
  useQuery<Tenant, AxiosError>({
    queryKey: ['contact', contactCode],
    enabled: Boolean(contactCode),
    queryFn: () =>
      axios
        .get(`${backendUrl}/contact/${contactCode}`, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        })
        .then((res) => res.data.content),
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
  })
