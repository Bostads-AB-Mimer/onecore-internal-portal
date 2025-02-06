import { Grid } from '@mui/material'

import NumAdults from './NumAdults'
import NumChildren from './NumChildrent'
import HousingReferencePhone from './HousingReferencePhone'
import HousingTypeDescription from './HousingTypeDescription'

const IsOther: React.FC = () => (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <HousingTypeDescription />
    </Grid>

    <Grid item xs={12} sm={6} margin={0}>
      <NumAdults />
    </Grid>

    <Grid item xs={12} sm={6} margin={0}>
      <NumChildren />
    </Grid>

    <Grid item xs={12}>
      <HousingReferencePhone />
    </Grid>
  </Grid>
)

export default IsOther
