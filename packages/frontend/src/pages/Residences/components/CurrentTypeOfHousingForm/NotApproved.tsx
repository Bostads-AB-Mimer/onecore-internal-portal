import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Control, Controller } from 'react-hook-form'

import { Inputs, RejectedReasons } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const Rejected = ({ control }: Props) => (
  <>
    <Controller
      name="rejectedReason"
      control={control}
      shouldUnregister={true}
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

    <Controller
      name="expiresAt"
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
  </>
)

export default Rejected
