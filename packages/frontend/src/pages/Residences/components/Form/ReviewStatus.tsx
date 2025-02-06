import React from 'react'
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { Inputs, ReviewStatus as ReviewStatusEnum } from '../../Residences'
import { default as RejectedReasonField } from './RejectedReason'
import { default as ExpiresAtField } from './ExpiresAt'

type Props = {
  control: Control<Inputs, any>
}

const ReviewStatus = ({ control }: Props) => {
  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  const tabs: { [key: string]: JSX.Element } = {
    [ReviewStatusEnum.REJECTED]: (
      <>
        <RejectedReasonField control={control} />
        <ExpiresAtField control={control} />
      </>
    ),
  }

  return (
    <Controller
      name="housingReference.reviewStatus"
      control={control}
      shouldUnregister
      render={({ field }) => (
        <FormControl fullWidth>
          <Typography variant="h2">Ange status boendereferens *</Typography>

          <RadioGroup row={isMinWidth600} {...field}>
            <FormControlLabel
              value={ReviewStatusEnum.APPROVED}
              control={<Radio />}
              label="Godkänd"
            />
            <FormControlLabel
              value={ReviewStatusEnum.REJECTED}
              control={<Radio />}
              label="Ej godkänd"
            />
            <FormControlLabel
              value={ReviewStatusEnum.CONTACTED_UNREACHABLE}
              control={<Radio />}
              label="Kontaktad - ej svar"
            />
            <FormControlLabel
              value={ReviewStatusEnum.REFERENCE_NOT_REQUIRED}
              control={<Radio />}
              label="Referens krävs ej"
            />
          </RadioGroup>

          {tabs[field.value]}
        </FormControl>
      )}
    />
  )
}

export default ReviewStatus
