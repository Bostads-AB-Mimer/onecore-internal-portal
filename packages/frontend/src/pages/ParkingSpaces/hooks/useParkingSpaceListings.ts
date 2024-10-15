import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Listing } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export const useParkingSpaceListings = (
  type: GetListingWithApplicantFilterByType
) =>
  useQuery<Array<Listing>, AxiosError>({
    queryKey: ['parkingSpaceListings', type],
    queryFn: () =>
      axios
        .get(`${backendUrl}/leases/listings-with-applicants?type=${type}`, {
          headers: {
            Accept: 'application/json',
            'Access-Control-Allow-Credentials': true,
          },
          withCredentials: true,
        })
        .then((res) => res.data.content),
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
  })

// TODO: Use from onecore-types
export type GetListingWithApplicantFilterByType =
  | 'published'
  | 'ready-for-offer'
  | 'offered'
  | 'historical'
