import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

type Params = { offerId: number }

export const useReplyYesToOffer = () => {
  //const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, Params>({
    mutationFn: (params: Params) =>
      axios.post<unknown>(`${backendUrl}/offers/${params.offerId}/accept`, {
        headers: {
          Accept: 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        withCredentials: true,
      }),
    onSuccess: (_, params) =>
      // queryClient.invalidateQueries({
      //   queryKey: ['parkingSpaceListing', params.listingId],
      // }),
      console.log('Offer accepted, but what happens now?'),
  })
}
