import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React from 'react'
import { Control, Controller } from 'react-hook-form'

import { Inputs, ReviewStatus } from '../Residences'
import { default as RejectedReasonField } from './CurrentTypeOfHousingForm/RejectedReason'
import { default as ExpiresAtField } from './CurrentTypeOfHousingForm/ExpiresAt'

type Props = {
  control: Control<Inputs, any>
}

const HousingReferenceStatusForm = ({ control }: Props) => {
  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  const tabs: { [key: string]: JSX.Element } = {
    [ReviewStatus.REJECTED]: (
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
              value={ReviewStatus.APPROVED}
              control={<Radio />}
              label="Godkänd"
            />
            <FormControlLabel
              value={ReviewStatus.REJECTED}
              control={<Radio />}
              label="Ej godkänd"
            />
            <FormControlLabel
              value={ReviewStatus.CONTACTED_UNREACHABLE}
              control={<Radio />}
              label="Kontaktad - ej svar"
            />
            <FormControlLabel
              value={ReviewStatus.REFERENCE_NOT_REQUIRED}
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

export default HousingReferenceStatusForm
