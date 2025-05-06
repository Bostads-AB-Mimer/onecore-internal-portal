import React from 'react'
import {
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import HousingReferenceReviewStatusComponentSwitcher from '../HousingReferenceReviewStatusComponentSwitcher'

const ReviewStatus = () => {
  const { control } = useFormContext()

  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  return (
    <Grid container columnSpacing={1} className="form-field-group">
      <Grid item xs={12}>
        <Controller
          name="housingReference.reviewStatus"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <Typography variant="h2">Ange status boendereferens *</Typography>

              <RadioGroup
                row={isMinWidth600}
                {...field}
                sx={{ paddingLeft: '10px' }}
              >
                <FormControlLabel
                  value="APPROVED"
                  control={<Radio />}
                  label="Godkänd"
                />
                <FormControlLabel
                  value="REJECTED"
                  control={<Radio />}
                  label="Ej godkänd"
                />
                <FormControlLabel
                  value="CONTACTED_UNREACHABLE"
                  control={<Radio />}
                  label="Kontaktad - ej svar"
                />
                <FormControlLabel
                  value="REFERENCE_NOT_REQUIRED"
                  control={<Radio />}
                  label="Referens krävs ej"
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        <HousingReferenceReviewStatusComponentSwitcher />
      </Grid>
    </Grid>
  )
}

export default ReviewStatus
