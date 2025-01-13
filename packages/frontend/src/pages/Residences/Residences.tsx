import React from 'react'
import {
  Button,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

import { SearchBar } from '../../components'

const ResidencesPage: React.FC = () => {
  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const handleSearch = (searchString: string) => {
    console.log(searchString)
  }

  return (
    <Stack spacing={4} padding={0}>
      <Typography variant="h1">Bostäder - sökandeuppgifter</Typography>

      <Container maxWidth="md" disableGutters>
        <Stack spacing={2}>
          <SearchBar
            onChange={handleSearch}
            placeholder="Sök på person eller kundnummer"
          />

          <Paper elevation={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} padding={2}>
                <Grid item xs={12}>
                  <Typography variant="h1">Kundinformation</Typography>
                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Namn</TableCell>
                        <TableCell align="right">John Applebaum</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Personnummer</TableCell>
                        <TableCell align="right">111122334444</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Kundnummer</TableCell>
                        <TableCell align="right">P123456</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Telefonnummer</TableCell>
                        <TableCell align="right">0720-123 45 67</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Typography paddingBottom={1} variant="h2">
                    Boendeform
                  </Typography>
                  <Select
                    name="current-type-of-housing"
                    size="small"
                    defaultValue="0"
                    fullWidth
                  >
                    <MenuItem key={0} value={'0'}>
                      Välj ur lista
                    </MenuItem>
                    <MenuItem value="villa">Villa</MenuItem>
                    <MenuItem value="lägenhet">Lägenhet</MenuItem>
                    <MenuItem value="radhus">Radhus</MenuItem>
                  </Select>
                </Grid>

                <Grid item xs={12} sm={6} margin={0}>
                  <Typography paddingBottom={1} variant="h2">
                    Antal vuxna i hushåll
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      name="adult-count"
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6} margin={0}>
                  <Typography paddingBottom={1} variant="h2">
                    Antal barn i hushåll
                  </Typography>
                  <FormControl fullWidth>
                    <TextField
                      type="number"
                      name="children-count"
                      variant="outlined"
                      size="small"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Divider />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="h2">
                    Ange status boendereferens
                  </Typography>
                  <RadioGroup
                    name="status-housing-reference"
                    defaultValue="default"
                    row={isMinWidth600}
                  >
                    <FormControlLabel
                      value="approved"
                      control={<Radio />}
                      label="Godkänd"
                    />
                    <FormControlLabel
                      value="not-approved"
                      control={<Radio />}
                      label="Ej godkänd"
                    />
                    <FormControlLabel
                      value="contacted-no-response"
                      control={<Radio />}
                      label="Kontaktad - ej svar"
                    />
                    <FormControlLabel
                      value="no-reference-required"
                      control={<Radio />}
                      label="Referens krävs ej"
                    />
                  </RadioGroup>

                  <Table>
                    <TableBody>
                      <TableRow>
                        <TableCell>Referensuppgifter från kund</TableCell>
                        <TableCell align="right">2024-01-01</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          Boendereferens hanterad/uppdaterad
                        </TableCell>
                        <TableCell align="right">2024-01-01</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Senast uppdaterad av</TableCell>
                        <TableCell align="right">MaS</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Giltig till</TableCell>
                        <TableCell align="right">2024-07-01</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>

                  <Typography variant="h2" paddingBottom={1}>
                    Notering/kommentar
                  </Typography>
                  <FormControl fullWidth>
                    <TextareaAutosize
                      name="notes"
                      minRows={3}
                    ></TextareaAutosize>
                  </FormControl>
                </Grid>

                <Grid
                  item
                  container
                  justifyContent="center"
                  xs={12}
                  marginY={4}
                >
                  <Button type="submit" variant="contained">
                    Spara/uppdatera boendereferens
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Stack>
      </Container>
    </Stack>
  )
}

export default ResidencesPage
