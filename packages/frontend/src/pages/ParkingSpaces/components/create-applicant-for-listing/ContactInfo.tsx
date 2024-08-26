import { Box, Typography } from '@mui/material'

import { Tenant } from '../../hooks/useTenantWithValidation'

export const ContactInfo = (props: { tenant: Tenant | null }) => (
  <Box>
    <Box
      paddingTop="1rem"
      display="flex"
      justifyContent="space-between"
      flex="1"
    >
      <Typography>Namn</Typography>
      <Box>
        <Typography fontWeight="bold">{props.tenant?.fullName}</Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      justifyContent="space-between"
      flex="1"
      paddingTop="0.5rem"
    >
      <Typography>Adress</Typography>
      <Box>
        <Typography fontWeight="bold">
          {props.tenant?.address?.street} {props.tenant?.address?.number}
        </Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      justifyContent="space-between"
      flex="1"
      paddingTop="0.5rem"
    >
      <Typography>Område</Typography>
      <Box>
        <Typography fontWeight="bold">N/A</Typography>
      </Box>
    </Box>
    <Box
      display="flex"
      justifyContent="space-between"
      flex="1"
      paddingTop="0.5rem"
    >
      <Typography>Kontrakt</Typography>
      <Box>
        <Typography fontWeight="bold">
          {props.tenant?.leaseIds?.length}
        </Typography>
      </Box>
    </Box>
  </Box>
)
