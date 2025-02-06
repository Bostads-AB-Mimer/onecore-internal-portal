import { Grid } from '@mui/material'

import NumAdults from './NumAdults'
import NumChildren from './NumChildrent'

const IsOwner: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} margin={0}>
        <NumAdults />
      </Grid>

      <Grid item xs={12} sm={6} margin={0}>
        <NumChildren />
      </Grid>
    </Grid>
  )
}

export default IsOwner
