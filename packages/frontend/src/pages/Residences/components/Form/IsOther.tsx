import { Grid, FormControl, Typography, TextField } from '@mui/material'
import { Control } from 'react-hook-form'

import NumAdults from './NumAdults'
import { Inputs } from '../../Residences'
import NumChildren from './NumChildrent'
import HousingReferencePhone from './HousingReferencePhone'

type Props = {
  control: Control<Inputs, any>
}

const IsOther: React.FC<Props> = ({ control }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <Typography paddingBottom={1} variant="h2">
            Beskriv boende *
          </Typography>

          <TextField size="small" />
        </FormControl>
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
        <NumAdults control={control} />
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
        <NumChildren control={control} />
      </Grid>

      <Grid item xs={12}>
        <HousingReferencePhone control={control} />
      </Grid>
    </Grid>
  )
}

export default IsOther
