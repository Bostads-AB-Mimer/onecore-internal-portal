import KoaRouter from '@koa/router'
import { routes as propertyInfoRoutes } from './services/property-info-service'
import { routes as commentsRoutes } from './services/leasing-service/comments'
import { routes as contactsRoutes } from './services/leasing-service/contacts'
import { routes as offersRoutes } from './services/leasing-service/offers'
import { routes as listingsRoutes } from './services/leasing-service/listings'

const router = new KoaRouter()

commentsRoutes(router)
contactsRoutes(router)
offersRoutes(router)
listingsRoutes(router)

propertyInfoRoutes(router)

export default router
