import axios, { AxiosError } from 'axios'
import { useQuery } from '@tanstack/react-query'
import { Contact, Lease } from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

type NonEmptyArray<T> = [T, ...T[]]

export type Tenant = Omit<Contact, 'leases' | 'isTenant'> & {
  queuePoints: number
  currentHousingContract?: Lease
  upcomingHousingContract?: Lease
  parkingSpaceContracts?: Lease[]
  housingContracts: NonEmptyArray<Lease>
}

type Type =
  | {
      tenant: Tenant
      validationResult: { type: 'residential-area'; applicationType: 'Replace' }
    }
  | {
      tenant: Tenant
      validationResult: { type: 'property'; applicationType: 'Replace' }
    }
  | {
      tenant: Tenant
      validationResult: undefined
    }

export const useTenantWithValidation = (
  contactCode?: string,
  districtCode?: string,
  rentalObjectCode?: string
) =>
  useQuery<Type, AxiosError>({
    queryKey: ['tenant', contactCode],
    enabled: Boolean(contactCode && districtCode && rentalObjectCode),
    queryFn: () =>
      axios
        .get(
          `${backendUrl}/get-and-validate-tenant/${contactCode}/${districtCode}/${rentalObjectCode}`,
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
  })
