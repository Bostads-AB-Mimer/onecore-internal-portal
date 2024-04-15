import Config from '../../../common/config'
import {getFromCore} from "../../common/adapters/core-adapter";

const coreBaseUrl = Config.core.url

const getListingsWithApplicants = async () => {
  const url = `${coreBaseUrl}/listings-with-applicants`
  console.log("doing req at url: ", url)
  const committedChoicesResponse = await getFromCore({
    method: 'get',
    url: url
  })

  return committedChoicesResponse.data
}
export { getListingsWithApplicants }
