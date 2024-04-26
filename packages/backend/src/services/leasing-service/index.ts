import KoaRouter from '@koa/router'
import * as coreAdapter from './adapters/core-adapter'

export const routes = (router: KoaRouter) => {
  router.get('(.*)/leases/listings-with-applicants', async (ctx) => {
    const listings = await coreAdapter.getListingsWithApplicants()

    ctx.body = listings
  })

  router.get('(.*)/leases/listing-with-applicants/:leasingId', async (ctx) => {
    const listing = await coreAdapter.getListingWithApplicants(
      ctx.params.leasingId
    )

    ctx.body = listing
  })
}
