import axios, { AxiosError } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

// TODO: Use from onecore-types when mim-15 is merged
export type InternalParkingSpaceSyncSuccessResponse = {
  invalid: Array<{
    rentalObjectCode: string
    err: Array<{ path: string; code: string }>
  }>
  insertions: {
    inserted: Array<{ rentalObjectCode: string; id: number }>
    failed: Array<{
      rentalObjectCode: string
      err: 'unknown' | 'active-listing-exists'
    }>
  }
}

export const useSyncInternalParkingSpaces = () => {
  const queryClient = useQueryClient()
  return useMutation<InternalParkingSpaceSyncSuccessResponse, AxiosError>({
    mutationFn: () =>
      axios
        .post<{ content: InternalParkingSpaceSyncSuccessResponse }>(
          `${backendUrl}/listings/sync-internal-from-xpand`,
          null,
          {
            headers: {
              Accept: 'application/json',
              'Access-Control-Allow-Credentials': true,
            },
            withCredentials: true,
          }
        )
        .then((res) => res.data.content),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ['parkingSpaceListings'],
      }),
  })
}
