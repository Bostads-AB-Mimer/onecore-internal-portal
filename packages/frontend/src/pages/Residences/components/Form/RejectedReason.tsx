import {
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { Controller, useFormContext } from 'react-hook-form'

import { RejectedReasons } from '../../constants'

const RejectedReason = () => {
  const { control } = useFormContext()

  return (
    <Controller
      name="housingReference.reasonRejected"
      control={control}
      shouldUnregister
      defaultValue=""
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

            <MenuItem value={RejectedReasons.DEBT_TO_LANDLORD}>Skuld</MenuItem>
            <MenuItem value={RejectedReasons.DISTURBANCE}>Störningar</MenuItem>
            <MenuItem value={RejectedReasons.LATE_RENT_PAYMENT}>
              Sena betalningar
            </MenuItem>
            <MenuItem value={RejectedReasons.MISMANAGEMENT}>Vanvård</MenuItem>
          </Select>

          <FormHelperText>{fieldState.error?.message}</FormHelperText>
        </FormControl>
      )}
    />
  )
}

export default RejectedReason
