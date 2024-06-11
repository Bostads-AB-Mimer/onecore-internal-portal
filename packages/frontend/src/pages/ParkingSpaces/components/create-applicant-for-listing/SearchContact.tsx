import { Box, Autocomplete, TextField, MenuItem } from '@mui/material'
import { Contact } from 'onecore-types'
import { useState, useMemo, useCallback } from 'react'

import * as utils from '../../../../utils'
import { useSearchContact } from '../../hooks/useSearchContact'

export const SearchContact = (props: {
  onSelect: (contact: Contact) => void
  contact: Contact | null
}) => {
  const [searchString, setSearchString] = useState<string>('')

  const contactQuery = useSearchContact(searchString)

  const onSetSearchString = useMemo(
    () => utils.debounce((value: string) => setSearchString(value), 500),
    []
  )

  const handleSearch = useCallback(
    (v: string) => {
      onSetSearchString(v)
    },
    [onSetSearchString]
  )

  const onSelect = (c: Contact) => {
    props.onSelect(c)
  }

  return (
    <Box paddingTop="1rem">
      <Autocomplete<Contact>
        getOptionLabel={(v) => v.fullName}
        filterOptions={(v) => v}
        options={contactQuery.data ?? []}
        renderInput={(params) => (
          <TextField {...params} label="Add a location" fullWidth />
        )}
        onInputChange={(_, v) => handleSearch(v)}
        renderOption={(props, v) => (
          <MenuItem {...props} key={v.contactCode}>
            {v.fullName}
          </MenuItem>
        )}
        onChange={(_, v) => {
          if (v) {
            onSelect(v)
          }
        }}
        getOptionKey={(v) => v.contactCode}
        value={props.contact}
        ListboxProps={{ style: { maxHeight: 125 } }}
      />
    </Box>
  )
}
