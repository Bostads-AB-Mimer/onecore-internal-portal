import { Box, Skeleton } from '@mui/material'

import { ContactInfoRow } from './ContactInfo'

export const ContactInfoLoading = () => (
  <Box
    paddingTop="0.5rem"
    display="flex"
    width="100%"
    justifyContent="space-between"
    flex="1"
  >
    <Box width="100%">
      <ContactInfoRow
        label="Namn"
        value={<Skeleton variant="rectangular" width="125px" />}
      />
      <ContactInfoRow
        label="Personnummer"
        value={<Skeleton variant="rectangular" width="100px" />}
      />
      <ContactInfoRow
        label="Kundnummer"
        value={<Skeleton variant="rectangular" width="100px" />}
      />
      <ContactInfoRow
        label="Adress"
        value={<Skeleton variant="rectangular" width="150px" />}
      />
      <ContactInfoRow
        label="Område"
        value={<Skeleton variant="rectangular" width="75px" />}
      />
      <ContactInfoRow
        label="Kontrakt"
        value={<Skeleton variant="rectangular" width="25px" />}
      />
      <ContactInfoRow
        label="Köpoäng"
        value={<Skeleton variant="rectangular" width="50px" />}
      />
    </Box>
  </Box>
)
