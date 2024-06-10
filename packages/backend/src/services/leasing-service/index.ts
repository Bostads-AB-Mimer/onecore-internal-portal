import KoaRouter from '@koa/router'
import * as coreAdapter from './adapters/core-adapter'

export const routes = (router: KoaRouter) => {
  router.get('(.*)/leases/listings-with-applicants', async (ctx) => {
    const listings = await coreAdapter.getListingsWithApplicants()

    ctx.body = listings
  })

  router.get('(.*)/leases/listing-with-applicants/:leasingId', async (ctx) => {
    try {
      const response = await coreAdapter.getListingWithApplicants(
        ctx.params.leasingId
      )

      ctx.status = 200
      ctx.body = response
    } catch (err) {
      console.log(err)
      ctx.status = 500
    }
  })

  router.delete('(.*)/applicant/:applicantId', async (ctx) => {
    const result = await coreAdapter.removeApplicant(ctx.params.applicantId)

    ctx.body = result
  })

  router.get('(.*)/contact/search/:query', async (ctx) => {
    const natRegNumber = /^\d{8}-\d{4}$/
    const query = natRegNumber.test(ctx.params.query)
      ? coreAdapter.getContactByNatRegNumber(ctx.params.query)
      : coreAdapter.getContactByContactCode(ctx.params.query)

    const result = await query

    if (result.ok) {
      ctx.status = 200
      ctx.body = result.data
    } else {
      ctx.status = 500
    }
  })
}
