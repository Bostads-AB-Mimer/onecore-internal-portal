import { FormControl, MenuItem, Select, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { Control, Controller } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const NotApproved = ({ control }: Props) => (
  <Controller
    name="notApprovedReason"
    control={control}
    render={({ field }) => (
      <>
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Anledning ej godkänd *
          </Typography>

          <Select size="small" {...field}>
            <MenuItem key={0} value={'0'}>
              Välj anledning
            </MenuItem>
            <MenuItem value="foo">Foo</MenuItem>
            <MenuItem value="bar">Bar</MenuItem>
            <MenuItem value="qux">Qux</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Ej godkänd till och med *
          </Typography>

          <DatePicker />
        </FormControl>
      </>
    )}
  />
)

export default NotApproved
