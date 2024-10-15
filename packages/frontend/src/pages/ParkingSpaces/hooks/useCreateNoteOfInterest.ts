import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { RequestError } from '../../../types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export type CreateNoteOfInterestRequestParams = {
  parkingSpaceId: string
  applicationType?: string
  contactCode: string
}

export const useCreateNoteOfInterest = (listingId: number) => {
  const queryClient = useQueryClient()
  return useMutation<
    unknown,
    RequestError<CreateNoteOfInterestErrorCodes>,
    CreateNoteOfInterestRequestParams
  >({
    mutationFn: (params: CreateNoteOfInterestRequestParams) =>
      axios
        .post<unknown>(`${backendUrl}/listing/applicant`, params, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        })
        .catch((error) => {
          return Promise.reject(mapCreateNoteOfInterestError(error))
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

  //todo: import from types when merged
  enum CreateNoteOfInterestErrorCodes {
    InternalCreditCheckFailed = 'internal-credit-check-failed',
    Unknown = 'unknown',
  }

  function mapCreateNoteOfInterestError(
    e: AxiosError<{
      error?: CreateNoteOfInterestErrorCodes
      errorMessage: string
    }>
  ): RequestError<CreateNoteOfInterestErrorCodes> {
    if (!e.response?.data) {
      return {
        status: 500,
        errorCode: CreateNoteOfInterestErrorCodes.Unknown,
        errorMessage: 'Försök igen eller kontakta support',
      }
    }
    switch (e.response.data?.error) {
      case CreateNoteOfInterestErrorCodes.InternalCreditCheckFailed:
        return {
          status: 400,
          errorCode: CreateNoteOfInterestErrorCodes.InternalCreditCheckFailed,
          errorMessage: 'Kreditkontroll misslyckades',
        }
      default: {
        return {
          status: 500,
          errorCode: CreateNoteOfInterestErrorCodes.Unknown,
          errorMessage: 'Försök igen eller kontakta support',
        }
      }
    }
  }
}
