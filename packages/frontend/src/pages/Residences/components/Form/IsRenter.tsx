import { Grid } from '@mui/material'

import Landlord from './Landlord'
import NumAdults from './NumAdults'
import NumChildren from './NumChildrent'
import HousingReferencePhone from './HousingReferencePhone'
import HousingReferenceEmail from './HousingReferenceEmail'

const IsRenter: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Landlord />
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

      <Grid item xs={12}>
        <HousingReferenceEmail />
      </Grid>
    </Grid>
  )
}

export default IsRenter
