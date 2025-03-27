import KoaRouter from '@koa/router'
import {
  getContact,
  getInvoicesForContact,
  getLease,
} from '../../common/adapters/core-adapter'
import { generateRouteMetadata } from 'onecore-utilities'
import { Contact } from 'onecore-types'

export const routes = (router: KoaRouter) => {
  router.get('(.*)/contacts/:contactCode', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const contact = await getContact(ctx.params.contactCode)

    if (contact && contact.leaseIds && contact.leaseIds.length > 0) {
      contact.leases = []
      for (const leaseId of contact.leaseIds) {
        const lease = await getLease(leaseId)
        contact.leases.push(lease)
      }
    }

    const invoices = await getInvoicesForContact(contact)

    ctx.body = { content: { contact, invoices }, ...metadata }
  })
}
