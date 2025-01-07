import {
  IconButton,
  MenuItem,
  Menu,
  Typography,
  Divider,
  Backdrop,
} from '@mui/material'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'

import MenuLink from './MenuLink'

const SiteMenu = () => (
  <PopupState variant="popover" popupId="demo-popup-menu">
    {(popupState) => (
      <>
        <IconButton {...bindTrigger(popupState)} sx={{ padding: 0 }}>
          <MenuIcon />
        </IconButton>

        <Backdrop open={popupState.isOpen} onClick={popupState.close}>
          <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            elevation={0}
            sx={{ top: -16, left: 20 }}
          >
            <IconButton
              onClick={popupState.close}
              sx={{ position: 'absolute', top: 5, right: 10 }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="hMenu">Aktuellt</Typography>

            <MenuItem onClick={popupState.close} sx={styles.menuItem}>
              <MenuLink href="/parkingspaces" title="Parkeringsplatser" />
            </MenuItem>

            <Divider />

            <MenuItem onClick={popupState.close} sx={styles.menuItem}>
              <MenuLink href="/materialval" title="Materialval" />
            </MenuItem>

            <MenuItem onClick={popupState.close}>
              <MenuLink href="/bostader" title="Bostäder" />
            </MenuItem>
          </Menu>
        </Backdrop>
      </>
    )}
  </PopupState>
)

const styles = {
  menuItem: {
    minHeight: 20,
    marginRight: 20,
  },
}

export default SiteMenu
