import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

type Params = { listingId: number; applicantId: number }

export const useReplyNoToOffer = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, Params>({
    mutationFn: (params: Params) =>
      axios.delete<unknown>(`${backendUrl}/applicant/${params.applicantId}`, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        withCredentials: true,
      }),
    onSuccess: (_, params) =>
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListing', params.listingId],
      }),
  })
}
