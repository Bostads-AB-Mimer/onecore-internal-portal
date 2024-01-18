import KoaRouter from '@koa/router'
import { getMaterialChoiceStatuses, getMaterialChoices } from './adapters/core-adapter'

export const routes = (router: KoaRouter) => {
  router.get('(.*)/rentalproperties/material-choice-statuses', async (ctx) => {
    ctx.body = await getMaterialChoiceStatuses('gryta')
  })

  router.get('(.*)/rentalproperties/:id/material-choices', async (ctx) => {
    ctx.body =  await getMaterialChoices(ctx.params.id)
  })

  router.get('(.*)/rentalproperties/:apartmentId/:contractId/material-choices', async (ctx) => {
    ctx.body = await getMaterialChoices(ctx.params.apartmentId, ctx.params.contractId)
  })
}


