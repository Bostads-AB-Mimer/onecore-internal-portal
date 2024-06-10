import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ApplicantStatus } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export type CreateApplicantRequestParams = {
  name: string
  nationalRegistrationNumber: string
  contactCode: string
  applicationType: string
  status: ApplicantStatus
  listingId: number
}

export const useCreateApplicantForListing = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, CreateApplicantRequestParams>({
    mutationFn: (params: CreateApplicantRequestParams) =>
      axios
        .post<unknown>(`${backendUrl}/listing/${params.listingId}`, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        })
        .then((res) => res.data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListings'],
      }),
  })
}
