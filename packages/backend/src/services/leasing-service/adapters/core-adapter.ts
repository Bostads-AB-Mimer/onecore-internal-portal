import Config from '../../../common/config'
import { getFromCore } from '../../common/adapters/core-adapter'

const coreBaseUrl = Config.core.url

const getListingsWithApplicants = async () => {
  const url = `${coreBaseUrl}/listings-with-applicants`
  const listingsResponse = await getFromCore({
    method: 'get',
    url: url,
  })

  return listingsResponse.data
}

const getListingWithApplicants = async (listingId: string) => {
  const response = await getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/listing/${listingId}`,
  })

  return response.data
}

export { getListingsWithApplicants, getListingWithApplicants }
