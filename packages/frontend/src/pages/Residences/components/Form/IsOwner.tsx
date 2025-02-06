import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'

import { Inputs } from '../../Residences'
import NumAdults from './NumAdults'
import NumChildren from './NumChildrent'

type Props = {
  control: Control<Inputs, any>
}

const IsOwner: React.FC<Props> = ({ control }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} margin={0}>
        <NumAdults control={control} />
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
        <NumChildren control={control} />
      </Grid>
    </Grid>
  )
}

export default IsOwner
