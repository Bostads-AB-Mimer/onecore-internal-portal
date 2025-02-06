import { FormControl, Typography, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const HousingReferenceEmail: React.FC<Props> = ({ control }) => (
  <Controller
    name="housingReference.email"
    control={control}
    shouldUnregister
    defaultValue=""
    render={({ field }) => (
      <FormControl fullWidth>
        <Typography paddingBottom={1} variant="h2">
          Mejladress hyresvärd
        </Typography>

        <TextField size="small" type="email" {...field} />
      </FormControl>
    )}
  />
)

export default HousingReferenceEmail
