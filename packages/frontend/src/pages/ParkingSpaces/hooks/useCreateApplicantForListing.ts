import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export type CreateApplicantRequestParams = {
  parkingSpaceId: string
  applicationType: string
  contactCode: string
}

export const useCreateApplicantForListing = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, CreateApplicantRequestParams>({
    mutationFn: (params: CreateApplicantRequestParams) =>
      axios
        .post<unknown>(`${backendUrl}/listing/applicant`, params, {
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
