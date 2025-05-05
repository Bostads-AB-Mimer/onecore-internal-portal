import { Box, MenuItem } from '@mui/material'
import { PopupState } from 'material-ui-popup-state/hooks'
import { Link } from 'react-router-dom'

const MenuLink = ({
  href,
  title,
  popupState,
}: {
  href: string
  title: string
  popupState: PopupState
}) => (
  <Link to={href}>
    <MenuItem onClick={popupState.close}>
      <Box sx={{ fontSize: 14, fontFamily: 'graphikRegular', color: '#000' }}>
        {title}
      </Box>
    </MenuItem>
  </Link>
)
export default MenuLink
