import KoaRouter from '@koa/router'

import { generateRouteMetadata } from 'onecore-utilities'

import * as coreAdapter from './adapters/core-adapter'

export const routes = (router: KoaRouter) => {
  router.get('(.*)/leases/listings-with-applicants', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const listings = await coreAdapter.getListingsWithApplicants()

    ctx.body = {
      content: listings,
      ...metadata,
    }
  })

  router.get('(.*)/leases/listing-with-applicants/:leasingId', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    try {
      const response = await coreAdapter.getListingWithApplicants(
        ctx.params.leasingId
      )

      ctx.status = 200
      ctx.body = { content: response, ...metadata }
    } catch (err) {
      console.log(err)
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error', ...metadata }
    }
  })

  router.delete('(.*)/applicant/:applicantId', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const result = await coreAdapter.removeApplicant(ctx.params.applicantId)

    ctx.body = { content: result, ...metadata }
  })

  router.get('(.*)/contacts/search', async (ctx) => {
    const metadata = generateRouteMetadata(ctx, ['q'])
    if (typeof ctx.query.q !== 'string') {
      ctx.status = 400
      ctx.body = { reason: 'Invalid query parameter', ...metadata }
      return
    }

    const result = await coreAdapter.getContactsDataBySearchQuery(ctx.query.q)

    if (result.ok) {
      ctx.status = 200
      ctx.body = { content: result.data, ...metadata }
    } else {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error', ...metadata }
    }
  })

  router.get('(.*)/contact/:contactCode', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const result = await coreAdapter.getTenantByContactCode(
      ctx.params.contactCode
    )

    if (result.ok) {
      ctx.status = 200
      ctx.body = { content: result.data, ...metadata }
    } else {
      ctx.status = 500
      ctx.body = { error: 'Internal Server Error', ...metadata }
    }
  })

  router.get(
    '(.*)/get-and-validate-tenant/:contactCode/:districtCode/:rentalObjectCode',
    async (ctx) => {
      const getTenant = await coreAdapter.getTenantByContactCode(
        ctx.params.contactCode
      )

      if (!getTenant.ok) {
        ctx.status = 500
        return
      }

      const validate = await Promise.all([
        coreAdapter.validatePropertyRentalRules(
          ctx.params.contactCode,
          ctx.params.rentalObjectCode
        ),
        coreAdapter.validateResidentialAreaRentalRules(
          ctx.params.contactCode,
          ctx.params.districtCode
        ),
      ]).then(([validatePropertyResult, validateResidentialAreaResult]) => {
        if (!validatePropertyResult.ok || !validateResidentialAreaResult.ok) {
          return { ok: false } as const
        }

        if (validatePropertyResult.data.applicationType === 'Replace') {
          return {
            ok: true,
            tenant: getTenant.data,
            validationResult: { applicationType: 'Replace', type: 'property' },
          } as const
        }

        if (validateResidentialAreaResult.data.applicationType === 'Replace') {
          return {
            ok: true,
            tenant: getTenant.data,
            validationResult: {
              applicationType: 'Replace',
              type: 'residential-area',
            },
          } as const
        }

        return { ok: true, tenant: getTenant.data } as const
      })

      console.log(validate)
      if (!validate.ok) {
        ctx.status = 500
        return
      }

      console.log({
        tenant: validate.tenant,
        validationResult: validate.validationResult,
      })
      ctx.status = 200
      ctx.body = {
        tenant: validate.tenant,
        validationResult: validate.validationResult,
      }
    }
  )

  router.post('(.*)/listing/applicant', async (ctx) => {
    const metadata = generateRouteMetadata(ctx)
    const params = ctx.request.body
    const result =
      await coreAdapter.createNoteOfInterestForInternalParkingSpace(params)

    if (result.ok) {
      ctx.status = 200
      ctx.body = {
        content: result.data,
        ...metadata,
      }
    } else {
      ctx.status = 500
      ctx.body = { error: result.err, ...metadata }
    }
  })
}
