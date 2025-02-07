import React from 'react'
import { useFormContext } from 'react-hook-form'

import RejectedReason from './Form/RejectedReason'
import ExpiresAt from './Form/ExpiresAt'
import { ReviewStatus } from '../constants'

const HousingReferenceReviewStatusComponentSwitcher = () => {
  const reviewStatus: ReviewStatus = useFormContext().watch(
    'housingReference.reviewStatus'
  )

  if (reviewStatus === ReviewStatus.REJECTED) {
    return (
      <React.Fragment>
        <RejectedReason />
        <ExpiresAt />
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default HousingReferenceReviewStatusComponentSwitcher
