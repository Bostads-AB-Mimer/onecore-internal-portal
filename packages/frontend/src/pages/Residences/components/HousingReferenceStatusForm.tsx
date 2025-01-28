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

import { Inputs } from '../Residences'
import NotApproved from './CurrentTypeOfHousingForm/NotApproved'

type Props = {
  control: Control<Inputs, any>
}

const HousingReferenceStatusForm = ({ control }: Props) => {
  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  const tabs: {
    [key: string]: JSX.Element | undefined
  } = {
    approved: undefined,
    'not-approved': <NotApproved control={control} />,
    'contacted-no-response': undefined,
    'no-reference-required': undefined,
  }

  return (
    <Controller
      name="housingReferenceStatus"
      control={control}
      render={({ field }) => (
        <>
          <FormControl>
            <Typography variant="h2">Ange status boendereferens *</Typography>

            <RadioGroup row={isMinWidth600} {...field}>
              <FormControlLabel
                value="approved"
                control={<Radio />}
                label="Godkänd"
              />
              <FormControlLabel
                value="not-approved"
                control={<Radio />}
                label="Ej godkänd"
              />
              <FormControlLabel
                value="contacted-no-response"
                control={<Radio />}
                label="Kontaktad - ej svar"
              />
              <FormControlLabel
                value="no-reference-required"
                control={<Radio />}
                label="Referens krävs ej"
              />
            </RadioGroup>
          </FormControl>

          {tabs[field.value]}
        </>
      )}
    />
  )
}

export default HousingReferenceStatusForm
