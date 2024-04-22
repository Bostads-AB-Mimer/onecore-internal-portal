import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export interface ApartmentChoiceStatus {
  apartmentId: string
  numChoices: number
}

type Params = { id: string }

export const useParkingSpaceListing = (params: Params) => {
  return useQuery<ApartmentChoiceStatus[], AxiosError>({
    queryKey: ['parkingSpaceListing', params.id],
    queryFn: () =>
      axios
        .get<ApartmentChoiceStatus[]>(
          `${backendUrl}/leases/listings-with-applicants`,
          {
            headers: {
              Accept: 'application/json',
              'Access-Control-Allow-Credentials': true,
            },
            withCredentials: true,
          }
        )
        .then((res) => res.data),

    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })
}
