import {
  FormControl,
  FormHelperText,
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
      rules={{
        // Since the design dictates we need to display the label as the first
        // value in the <Select> we need this ugly hack...
        pattern: {
          value: RegExp(`^(?!${RejectedReasons.DEFAULT_VALUE}).*`),
          message: 'Du behöver välja en anledning för att gå vidare',
        },
      }}
      render={({ field, fieldState }) => (
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Anledning ej godkänd *
          </Typography>

          <Select size="small" error={fieldState.invalid} {...field}>
            <MenuItem value={RejectedReasons.DEFAULT_VALUE}>
              Välj anledning
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
