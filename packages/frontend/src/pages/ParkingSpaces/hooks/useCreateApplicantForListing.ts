import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

type Params = { listingId: number }

export const useCreateApplicantForListing = () => {
  const queryClient = useQueryClient()
  return useMutation<unknown, AxiosError, Params>({
    mutationFn: (params: Params) =>
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
