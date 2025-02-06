import React from 'react'
import { useFormContext } from 'react-hook-form'

import { HousingTypes } from '../Residences'
import ApplicantIsRenter from './ApplicantIsRenter'
import ApplicantIsOwner from './ApplicantIsOwner'
import ApplicantIsOther from './ApplicantIsOther'

const HousingTypeComponentSwitcher = () => {
  const housingType: HousingTypes = useFormContext().watch('housingType')

  const components = {
    [HousingTypes.RENTAL]: <ApplicantIsRenter />,
    [HousingTypes.SUB_RENTAL]: <ApplicantIsRenter />,
    [HousingTypes.LIVES_WITH_FAMILY]: <ApplicantIsRenter />,
    [HousingTypes.LODGER]: <ApplicantIsOwner />,
    [HousingTypes.OWNS_HOUSE]: <ApplicantIsOwner />,
    [HousingTypes.OWNS_FLAT]: <ApplicantIsOwner />,
    [HousingTypes.OWNS_ROW_HOUSE]: <ApplicantIsOwner />,
    [HousingTypes.OTHER]: <ApplicantIsOther />,
  }

  return components[housingType]
}

export default HousingTypeComponentSwitcher
