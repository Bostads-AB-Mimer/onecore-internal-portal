import Config from '../../../common/config'
import { getFromCore } from '../../common/adapters/core-adapter'
import { Contact, DetailedApplicant, Listing } from 'onecore-types'

const coreBaseUrl = Config.core.url

const getListingsWithApplicants = async () => {
  const url = `${coreBaseUrl}/listings-with-applicants`
  const listingsResponse = await getFromCore({
    method: 'get',
    url: url,
  })

  return listingsResponse.data
}

const getListingWithApplicants = async (
  listingId: string
): Promise<Listing & { applicants: DetailedApplicant[] }> => {
  const listing: Promise<Listing> = getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/listing/${listingId}`,
  }).then((res) => res.data)

  const applicants: Promise<DetailedApplicant[]> = getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/listing/${listingId}/applicants/details`,
  }).then((res) => res.data)

  const [listingResult, applicantsResult] = await Promise.all([
    listing,
    applicants,
  ])

  return {
    ...listingResult,
    applicants: applicantsResult || [],
  }
}

const removeApplicant = async (applicantId: string) => {
  const response = await getFromCore({
    method: 'delete',
    url: `${coreBaseUrl}/applicants/${applicantId}/by-manager`,
  })

  return response.data
}

type Result<T, E> = { ok: false; err: E } | { ok: true; data: T }

const getContactByNatRegNumber = async (
  natRegNumber: string
): Promise<Result<Contact, unknown>> => {
  try {
    const url = `${coreBaseUrl}/contact/${natRegNumber}`
    const result = await getFromCore({
      method: 'get',
      url: url,
    })

    return { ok: true, data: result.data }
  } catch (err) {
    return { ok: false, err }
  }
}

const getContactByContactCode = async (
  contactCode: string
): Promise<Result<Contact, unknown>> => {
  try {
    const url = `${coreBaseUrl}/contact/contact-code/${contactCode}`
    const result = await getFromCore({
      method: 'get',
      url: url,
    })

    return { ok: true, data: result.data }
  } catch (err) {
    return { ok: false, err }
  }
}

export {
  getListingsWithApplicants,
  getListingWithApplicants,
  removeApplicant,
  getContactByNatRegNumber,
  getContactByContactCode,
}
