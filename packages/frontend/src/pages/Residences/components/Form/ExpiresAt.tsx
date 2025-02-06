import { FormControl, FormHelperText, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Control, Controller } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const ExpiresAt = ({ control }: Props) => (
  <Controller
    name="housingReference.expiresAt"
    control={control}
    render={({ field, fieldState }) => (
      <FormControl fullWidth>
        <Typography paddingBottom={1} variant="h2">
          Ej godkänd till och med *
        </Typography>

        <DatePicker format="YYYY-MM-DD" {...field} />

        <FormHelperText>{fieldState.error?.message}</FormHelperText>
      </FormControl>
    )}
  />
)

export default ExpiresAt
