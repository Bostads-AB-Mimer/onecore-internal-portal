import React from 'react'
import {
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextareaAutosize,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material'

const ResidencesPage: React.FC = () => {
  const isMinWidth600 = useMediaQuery('(min-width:600px)')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
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
            <FormControl fullWidth>
              <InputLabel>Nuvarande boendeform</InputLabel>
              <Select
                id="current-type-of-housing"
                label="Nuvarande boendeform"
                size="small"
                defaultValue=""
              >
                <MenuItem value="villa">Villa</MenuItem>
                <MenuItem value="lägenhet">Lägenhet</MenuItem>
                <MenuItem value="radhus">Radhus</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} margin={0}>
            <Typography paddingBottom={1} variant="h2">
              Antal vuxna i hushåll
            </Typography>
            <FormControl fullWidth>
              <TextField
                type="number"
                id="adult-count"
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
                id="children-count"
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h2">Ange status boendereferens</Typography>
            <RadioGroup
              id="status-housing-reference"
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
                  <TableCell>Boendereferens hanterad/uppdaterad</TableCell>
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
              <TextareaAutosize id="notes" minRows={3}></TextareaAutosize>
            </FormControl>
          </Grid>

          <Grid item container justifyContent="center" xs={12} marginTop={4}>
            <Button type="submit">Spara/uppdatera boendereferens</Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default ResidencesPage
