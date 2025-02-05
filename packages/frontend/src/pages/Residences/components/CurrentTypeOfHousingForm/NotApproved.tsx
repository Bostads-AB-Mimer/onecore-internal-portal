import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Control, Controller } from 'react-hook-form'
import dayjs from 'dayjs'

import { Inputs, RejectedReasons } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const Rejected = ({ control }: Props) => (
  <>
    <FormControl fullWidth>
      <Typography paddingBottom={1} variant="h2">
        Anledning ej godkänd *
      </Typography>

      <Controller
        name="rejectedReason"
        control={control}
        render={({ field }) => (
          <Select size="small" {...field}>
            <MenuItem value="">Välj anledning</MenuItem>
            <MenuItem value={RejectedReasons.DEBT_TO_LANDLORD}>Skuld</MenuItem>
            <MenuItem value={RejectedReasons.DISTURBANCE}>Störningar</MenuItem>
            <MenuItem value={RejectedReasons.LATE_RENT_PAYMENT}>
              Sena betalningar
            </MenuItem>
            <MenuItem value={RejectedReasons.MISMANAGEMENT}>Vanvård</MenuItem>
          </Select>
        )}
      />
    </FormControl>

    <FormControl fullWidth>
      <Typography paddingBottom={1} variant="h2">
        Ej godkänd till och med *
      </Typography>

      <Controller
        name="expiresAt"
        control={control}
        render={({ field }) => (
          <DatePicker
            // defaultValue={dayjs('2022-01-04')} // why no workie?
            {...field}
          />
        )}
      />
    </FormControl>
  </>
)

export default Rejected
