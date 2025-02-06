import { FormControl, Typography, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const HousingReferencePhone: React.FC<Props> = ({ control }) => (
  <Controller
    name="housingReference.phone"
    control={control}
    shouldUnregister
    defaultValue=""
    render={({ field }) => (
      <FormControl fullWidth>
        <Typography paddingBottom={1} variant="h2">
          Telefonnummer hyresvärd *
        </Typography>

        <TextField size="small" type="tel" {...field} />
      </FormControl>
    )}
  />
)

export default HousingReferencePhone
