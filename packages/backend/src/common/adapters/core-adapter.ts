import Config from '../config'
import { getFromCore } from '../../services/common/adapters/core-adapter'
import { Contact } from 'onecore-types'

const coreBaseUrl = Config.core.url

const getMaterialChoiceStatuses = async (projectCode: string) => {
  const materialChoiceStatusResponse = await getFromCore({
    method: 'get',
    url: `${coreBaseUrl}/rentalproperties/material-choice-statuses?projectCode=${projectCode}&includeRentalProperties=false`,
  })

  return materialChoiceStatusResponse.data.content
}

const getMaterialChoices = async (apartmentId: string, contractId?: string) => {
  let url

  if (contractId) {
    url = `${coreBaseUrl}/rentalproperties/${apartmentId}/${contractId}/material-choices`
  } else {
    url = `${coreBaseUrl}/rentalproperties/${apartmentId}/material-choices`
  }

  const committedChoicesResponse = await getFromCore({
    method: 'get',
    url: url,
  })

  return committedChoicesResponse.data.content
}

export const getContact = async (contactCode: string) => {
  const contactResponse = await getFromCore({
    method: 'GET',
    url: `${coreBaseUrl}/contact/contactCode/${contactCode}`,
  })

  return contactResponse.data.content
}

export const getLease = async (leaseId: string) => {
  const contactResponse = await getFromCore({
    method: 'GET',
    url: `${coreBaseUrl}/leases/${encodeURIComponent(leaseId)}`,
  })

  return contactResponse.data.content
}

export const getInvoicesForContact = async (contact: Contact) => {
  const invoicesResponse = await getFromCore({
    method: 'GET',
    url: `${coreBaseUrl}/invoices/by-contact-code/${contact.contactCode}`,
  })

  return invoicesResponse.data.content
}

export { getMaterialChoiceStatuses, getMaterialChoices }
