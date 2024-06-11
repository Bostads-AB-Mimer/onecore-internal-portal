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

  router.get('(.*)/contact/search', async (ctx) => {
    // const result = (await new Promise((res) =>
    // setTimeout(
    // () =>
    // res({
    // ok: true,
    // data: [
    // { fullName: 'Foo Barsson', contactCode: 1 },
    // { fullName: 'Foo Barsson', contactCode: 2 },
    // { fullName: 'Foo Barsson', contactCode: 3 },
    // { fullName: 'Foo Barsson', contactCode: 4 },
    // { fullName: 'Foo Barsson', contactCode: 5 },
    // { fullName: 'Foo Barsson', contactCode: 6 },
    // ],
    // }),
    // 300
    // )
    // )) as any
    if (typeof ctx.query.q !== 'string') {
      ctx.status = 400
      return
    }

    const result = await coreAdapter.getContactBySearchQuery(ctx.query.q)

    if (result.ok) {
      ctx.status = 200
      ctx.body = result.data
    } else {
      ctx.status = 500
    }
  })

  router.post('(.*)/listing/:listingId', async (ctx) => {})
}
