import { Grid } from '@mui/material'

import NumAdults from './Form/NumAdults'
import NumChildren from './Form/NumChildrent'

const ApplicantIsOwner: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6} margin={0}>
      <NumAdults />
    </Grid>

    <Grid item xs={12} sm={6} margin={0}>
      <NumChildren />
    </Grid>
  </Grid>
)

export default ApplicantIsOwner
