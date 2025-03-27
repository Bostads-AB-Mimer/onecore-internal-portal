import KoaRouter from '@koa/router'
import { routes as propertyInfoRoutes } from './services/property-info-service'
import { routes as leasesRoutes } from './services/leasing-service'
import { routes as tenantRoutes } from './services/tenant-service'

const router = new KoaRouter()

propertyInfoRoutes(router)
leasesRoutes(router)
tenantRoutes(router)

export default router
