import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Contact, Invoice } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export interface ContactResponse {
  data: {
    contact: Contact | undefined
    invoices: Invoice[] | undefined
  }
}

export const useContact = (contactCode: string) => {
  return useQuery<ContactResponse, AxiosError>({
    queryKey: ['contact'],
    queryFn: async () => {
      const { data } = await axios.get<{
        content: {
          contact: Contact | undefined
          invoices: Invoice[] | undefined
        }
      }>(`${backendUrl}/contacts/${contactCode}`, {
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer sometoken',
        },
        withCredentials: true,
      })

      return { data: data.content }
    },
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
