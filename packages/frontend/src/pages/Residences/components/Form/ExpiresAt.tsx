import { FormControl, FormHelperText, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Controller, useFormContext } from 'react-hook-form'

const ExpiresAt = () => {
  const { control } = useFormContext()

  return (
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
}

export default ExpiresAt
