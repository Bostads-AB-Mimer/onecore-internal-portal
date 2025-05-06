import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { Controller, useFormContext, useWatch } from 'react-hook-form'

const RejectedReason = () => {
  const { control } = useFormContext()
  const reviewStatus = useWatch({
    control,
    name: 'housingReference.reviewStatus',
  })

  if (reviewStatus !== 'REJECTED') {
    return null
  }

  return (
    <Controller
      name="housingReference.reasonRejected"
      control={control}
      rules={{
        required: { value: true, message: 'Du behöver välja en anledning' },
      }}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Anledning ej godkänd *
          </Typography>

          <Select
            size="small"
            error={fieldState.invalid}
            displayEmpty
            {...field}
          >
            <MenuItem value="" disabled>
              Välj ur lista
            </MenuItem>

            <MenuItem value="DEBT_TO_LANDLORD">Skuld</MenuItem>
            <MenuItem value="DISTURBANCE">Störningar</MenuItem>
            <MenuItem value="LATE_RENT_PAYMENT">Sena betalningar</MenuItem>
            <MenuItem value="MISMANAGEMENT">Vanvård</MenuItem>
          </Select>

          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default RejectedReason
