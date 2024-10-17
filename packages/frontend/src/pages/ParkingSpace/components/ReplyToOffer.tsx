import { useState } from 'react'
import { Button, IconButton, MenuItem, Backdrop, Menu } from '@mui/material'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import { MoreHoriz } from '@mui/icons-material'

import { useReplyYesToOffer } from '../hooks/useReplyYesToOffer'
import { useReplyNoToOffer } from '../hooks/useReplyNoToOffer'
import { ReplyDialog } from './ReplyDialog'

export interface Props {
  applicantId: number
  applicantName: string
  listingAddress: string
  listingId: number
  disabled: boolean
}

export const ReplyToOffer = (props: Props) => {
  const replyYes = useReplyYesToOffer()
  const replyNo = useReplyNoToOffer()
  const [replyYesOpen, setReplyYesOpen] = useState(false)
  const [replyNoOpen, setReplyNoOpen] = useState(false)

  const onReplyYes = () =>
    replyYes.mutate(props, {
      onSuccess: () => setReplyYesOpen(false),
    })

  const onReplyNo = () =>
    replyNo.mutate(props, {
      onSuccess: () => setReplyYesOpen(false),
    })

  return (
    <>
      <PopupState
        variant="popover"
        popupId="reply-to-offer-popup-menu"
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
                    onClick={() => setReplyYesOpen(true)}
                    sx={{
                      color: 'black',
                      border: 'none',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Tacka ja
                  </Button>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                  <Button
                    variant="text"
                    onClick={() => setReplyNoOpen(true)}
                    sx={{
                      color: 'black',
                      border: 'none',
                      backgroundColor: 'transparent',
                      '&:hover': {
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    Tacka nej
                  </Button>
                </MenuItem>
              </Menu>
            </Backdrop>
          </>
        )}
      </PopupState>
      <ReplyDialog
        open={replyYesOpen}
        onClose={() => setReplyYesOpen(false)}
        onConfirm={onReplyYes}
        title="Tacka ja"
        content={`Vill du ta bort ${props.applicantName} som intressent för ${props.listingAddress}?`}
        isPending={replyYes.isPending}
      />

      <ReplyDialog
        open={replyNoOpen}
        onClose={() => setReplyNoOpen(false)}
        onConfirm={onReplyNo}
        title="Tacka nej"
        content={`Vill du ta bort ${props.applicantName} som intressent för ${props.listingAddress}?`}
        isPending={replyNo.isPending}
      />
    </>
  )
}
