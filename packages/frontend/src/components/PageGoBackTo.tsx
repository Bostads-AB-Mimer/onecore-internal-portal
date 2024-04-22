import { Box, IconButton, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

export const PageGoBackTo = (props: { to: string; text: string }) => (
  <Link to={props.to}>
    <Box display="flex" alignItems="center" paddingTop="2rem" gap="0.25rem">
      <IconButton size="small" sx={{ padding: 0, color: 'black' }}>
        <ArrowBackIosNewIcon fontSize="small" />
      </IconButton>
      <Typography variant="h2" paddingTop="0">
        {props.text}
      </Typography>
    </Box>
  </Link>
)
