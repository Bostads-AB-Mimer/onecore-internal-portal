import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export type CreateApplicantRequestParams = {
  parkingSpaceId: string
  applicationType?: string
  contactCode: string
}

export const useCreateApplicantForListing = (listingId: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    unknown,
    RequestError<CreateApplicantError>,
    CreateApplicantRequestParams
  >({
    mutationFn: (params: CreateApplicantRequestParams) =>
      axios
        .post<unknown>(`${backendUrl}/listing/applicant`, params, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        })
        .catch((error) => {
          return Promise.reject(mapCreateApplicantError(error))
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
  })

  type CreateApplicantError = 'internal-credit-check-failed' | 'unknown'
  type RequestError<Err> = {
    status: number
    errorCode: Err
    errorMessage: string
  }

  function mapCreateApplicantError(
    e: AxiosError<{ error?: CreateApplicantError; errorMessage: string }>
  ): RequestError<CreateApplicantError> {
    if (!e.response?.data) {
      return {
        status: 500,
        errorCode: 'unknown',
        errorMessage: 'Försök igen eller kontakta support',
      }
    }
    switch (e.response.data?.error) {
      case 'internal-credit-check-failed':
        return {
          status: 400,
          errorCode: 'internal-credit-check-failed',
          errorMessage: 'Kreditkontroll misslyckades',
        }
      default: {
        return {
          status: 500,
          errorCode: 'unknown',
          errorMessage: 'Försök igen eller kontakta support',
        }
      }
    }
  }
}
