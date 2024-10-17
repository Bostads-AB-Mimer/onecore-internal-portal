import { useState } from 'react'
import { Button, IconButton, MenuItem, Backdrop, Menu } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { MoreHoriz } from '@mui/icons-material'

import { useRemoveApplicantFromListing } from '../hooks/useRemoveApplicantFromListing'
import { ReplyDialog } from './ReplyDialog'

export interface Props {
  applicantId: number
  applicantName: string
  listingAddress: string
  listingId: number
  disabled: boolean
}

export const RemoveApplicantFromListing = (props: Props) => {
  const removeListing = useRemoveApplicantFromListing()
  const [open, setOpen] = useState(false)

  const onRemove = () =>
    removeListing.mutate(props, {
      onSuccess: () => setOpen(false),
    })

  return (
    <>
      <PopupState
        variant="popover"
        popupId="remove-applicant-from-listing-popup-menu"
        disableAutoFocus={false}
        parentPopupState={null}
      >
        {(popupState) => (
          <>
            <IconButton {...bindTrigger(popupState)} sx={{ padding: 0 }}>
              <MoreHoriz />
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
              >
                <MenuItem onClick={popupState.close}>
                  <Button
                    variant="text"
                    onClick={() => setOpen(true)}
                    sx={{
                      color: 'black',
                      border: 'none',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Ta bort anmälan
                  </Button>
                </MenuItem>
              </Menu>
            </Backdrop>
          </>
        )}
      </PopupState>
      <ReplyDialog
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={onRemove}
        title="Ta bort intresseanmälan"
        content={`Vill du ta bort ${props.applicantName} som intressent för ${props.listingAddress}?`}
        isPending={removeListing.isPending}
      />
    </>
  )
}
