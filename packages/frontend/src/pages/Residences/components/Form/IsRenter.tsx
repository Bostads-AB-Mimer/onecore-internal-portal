import { Grid } from '@mui/material'
import { Control } from 'react-hook-form'

import { Inputs } from '../../Residences'
import Landlord from './Landlord'
import NumAdults from './NumAdults'
import NumChildren from './NumChildrent'
import HousingReferencePhone from './HousingReferencePhone'
import HousingReferenceEmail from './HousingReferenceEmail'

type Props = {
  control: Control<Inputs, any>
}

const IsRenter: React.FC<Props> = ({ control }) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Landlord control={control} />
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

      <Grid item xs={12}>
        <HousingReferenceEmail control={control} />
      </Grid>
    </Grid>
  )
}

export default IsRenter
