// HousingReferenceReviewStatusComponentSwitcher
import React from 'react'
import { useFormContext } from 'react-hook-form'

import { ReviewStatus } from '../Residences'
import RejectedReason from './Form/RejectedReason'
import ExpiresAt from './Form/ExpiresAt'

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
