import { Grid, FormControl, Typography, TextField } from '@mui/material'
import { Control, Controller } from 'react-hook-form'

import { Inputs } from '../../Residences'

type Props = {
  control: Control<Inputs, any>
}

const IsRenter: React.FC<Props> = ({ control }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography paddingBottom={1} variant="h2">
          Hyresvärd *
        </Typography>

        <Controller
          name="landlord"
          control={control}
          shouldUnregister
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                size="small"
                placeholder="Namn på nuvarande hyresvärd"
                {...field}
              />
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
        <Typography paddingBottom={1} variant="h2">
          Antal vuxna i hushåll *
        </Typography>

        <Controller
          name="numAdults"
          control={control}
          shouldUnregister
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                type="number"
                size="small"
                defaultValue={field.value}
                InputProps={{ inputProps: { min: 1 } }}
                {...field}
              />
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
        <Typography paddingBottom={1} variant="h2">
          Antal barn i hushåll *
        </Typography>

        <Controller
          name="numChildren"
          control={control}
          shouldUnregister
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField
                type="number"
                size="small"
                defaultValue={0}
                InputProps={{ inputProps: { min: 0 } }}
                {...field}
              />
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography paddingBottom={1} variant="h2">
          Telefonnummer hyresvärd *
        </Typography>

        <Controller
          name="phone"
          control={control}
          shouldUnregister
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField size="small" type="tel" {...field} />
            </FormControl>
          )}
        />
      </Grid>

      <Grid item xs={12}>
        <Typography paddingBottom={1} variant="h2">
          Mejladress hyresvärd
        </Typography>

        <Controller
          name="email"
          control={control}
          shouldUnregister
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField size="small" type="email" {...field} />
            </FormControl>
          )}
        />
      </Grid>
    </Grid>
  )
}

export default IsRenter
