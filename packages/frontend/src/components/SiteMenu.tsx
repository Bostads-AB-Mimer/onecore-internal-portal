import { IconButton, MenuItem, Menu, Typography, Backdrop } from '@mui/material'
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

            <MenuItem
              onClick={popupState.close}
              sx={{ width: '200px' }}
              disabled
            >
              <Typography variant="h1">Aktuellt</Typography>
            </MenuItem>

            <MenuLink
              href="/bilplatser"
              title="Bilplatser"
              popupState={popupState}
            />

            <MenuLink
              href="/materialval"
              title="Materialval"
              popupState={popupState}
            />

            <MenuLink
              href="/sokandeprofil"
              title="Sökandeprofil"
              popupState={popupState}
            />
          </Menu>
        </Backdrop>
      </>
    )}
  </PopupState>
)

export default SiteMenu
