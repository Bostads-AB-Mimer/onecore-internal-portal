import { AxiosError } from 'axios'
import { useQuery, UseQueryResult } from '@tanstack/react-query'
import { schemas } from 'onecore-types'
import { z } from 'zod'

import apiClient from '../../../utils/api-client'

type CustomerCard = {
  applicationProfile: z.infer<typeof schemas.v1.ApplicationProfileSchema>
}

export const useCustomerCard = (
  contactCode?: string
): UseQueryResult<CustomerCard, AxiosError> =>
  useQuery<CustomerCard, AxiosError>({
    queryKey: ['customer-card', contactCode],
    enabled: Boolean(contactCode),
    queryFn: async () => {
      const f = await apiClient.get(`/contacts/${contactCode}/customer-card`)
      return f.data.content
    },
    retry: (failureCount: number, error: AxiosError) =>
      error.response?.status === 401 ? false : failureCount < 3,
  })
