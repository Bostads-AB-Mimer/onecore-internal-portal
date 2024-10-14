import axios, { AxiosError, HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export type CreateApplicantRequestParams = {
  parkingSpaceId: string
  applicationType?: string
  contactCode: string
}

export const useCreateApplicantForListing = (listingId: number) => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, CreateApplicantRequestParams>({
    mutationFn: (params: CreateApplicantRequestParams) =>
      axios.post<unknown>(`${backendUrl}/listing/applicant`, params, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        withCredentials: true,
      }),
    onSuccess: () =>
      Promise.all([
        queryClient.refetchQueries({
          queryKey: ['parkingSpaceListing', String(listingId)],
        }),
        queryClient.invalidateQueries({
          queryKey: ['parkingSpaceListings'],
        }),
      ]),
    onError: (error: AxiosError) => {
      // if (
      //   error.response?.status === HttpStatusCode.BadRequest &&
      //   error.response.data.error === 'internal-credit-check-failed'
      // ) {
      if (
        error.response &&
        error.response.status === HttpStatusCode.BadRequest
      ) {
        error.message = 'Kreditkontroll misslyckades'
        return error
      }
      error.message = 'Försök igen eller kontakta support'
    },
  })
}
