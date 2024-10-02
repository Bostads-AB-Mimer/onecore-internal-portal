import axios, { AxiosError } from 'axios'
import { useSuspenseQuery } from '@tanstack/react-query'
import {
  ApplicantStatus,
  DetailedApplicant,
  LeaseStatus,
  Listing,
  Offer,
} from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

export interface ParkingSpaceListing {
  [key: string]: any
}

type Params = { id: number }
export type OfferApplicant = {
  id: number
  listingId: number
  offerId: number
  applicantId: number
  status: ApplicantStatus
  applicationType: 'Replace' | 'Additional'
  queuePoints: number
  address: string
  hasParkingSpace: boolean
  housingLeaseStatus: LeaseStatus
  priority: number
  sortOrder: number
  createdAt: Date

  // Below properties comes from applicant table
  applicationDate: Date
  name: string
}

type OfferWithOfferApplicants = Offer & {
  selectedApplicants: Array<OfferApplicant>
}

type ResultType = Listing & {
  applicants: Array<DetailedApplicant>
  offers: Array<OfferWithOfferApplicants>
}

export const useParkingSpaceListing = (params: Params) =>
  useSuspenseQuery<ResultType, AxiosError>({
    queryKey: ['parkingSpaceListing', params.id],
    queryFn: () =>
      axios
        .get<{ content: ResultType }>(
          `${backendUrl}/leases/listing-with-applicants/${params.id}`,
          {
            headers: {
              Accept: 'application/json',
              'Access-Control-Allow-Credentials': true,
            },
            withCredentials: true,
          }
        )
        .then((res) => res.data.content),
    retry: (failureCount: number, error: AxiosError) => {
      if (error.response?.status === 401) {
        return false
      } else {
        return failureCount < 3
      }
    },
  })
