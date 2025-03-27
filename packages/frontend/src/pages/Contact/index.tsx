import { Typography, Divider, Grid, Box } from '@mui/material'
import { useContact } from './hooks/useContact'
import { useParams } from 'react-router-dom'
import {
  LeaseStatus,
  PaymentStatus,
  paymentStatusTranslation,
} from 'onecore-types'

const backendUrl = import.meta.env.VITE_BACKEND_URL || '/api'

const getStatusName = (status: LeaseStatus) => {
  switch (status) {
    case LeaseStatus.Current:
      return 'Aktivt'
    case LeaseStatus.Upcoming:
      return 'Kommande'
    case LeaseStatus.AboutToEnd:
      return 'Uppsagt'
    case LeaseStatus.Ended:
      return 'Avslutat'
    default:
      return 'Okänt'
  }
}

const Contact = () => {
  const routeParams = useParams<'id'>()
  const { data } = useContact(routeParams.id ?? '')
  console.log('tenant1', data)
  const tenant = data?.data.contact
  const invoices = data?.data.invoices

  return (
    <>
      <Box>
        {tenant && (
          <>
            <Typography variant="h1">{tenant.fullName}</Typography>
            <Divider />
            <Typography variant="h2">Basinformation</Typography>
            <>
              <Grid container sx={{ marginLeft: 1, marginTop: 1 }}>
                <Grid item xs={12} md={4} lg={2} sx={{ marginBottom: 2 }}>
                  <b>Kontaktkod</b>
                </Grid>
                <Grid item xs={12} md={8} lg={4} sx={{ marginBottom: 2 }}>
                  {tenant.contactCode}
                </Grid>
                <Grid item xs={12} md={4} lg={2} sx={{ marginBottom: 2 }}>
                  <b>Personnummer</b>
                </Grid>
                <Grid item xs={12} md={8} lg={4} sx={{ marginBottom: 2 }}>
                  {tenant.nationalRegistrationNumber}
                </Grid>
                <Grid item xs={12} md={4} lg={2} sx={{ marginBottom: 2 }}>
                  <b>Adress</b>
                </Grid>
                <Grid item xs={12} md={8} lg={4} sx={{ marginBottom: 2 }}>
                  {tenant.address?.street} {tenant.address?.number}
                  <br />
                  {tenant.address?.postalCode}
                  <br />
                  {tenant.address?.city}
                  <br />
                </Grid>
              </Grid>
              {tenant.leases && (
                <>
                  <Divider />
                  <Typography variant="h2">Kontrakt</Typography>
                  {tenant.leases
                    ?.sort((lease1, lease2) => {
                      return lease1.status < lease2.status ? -1 : 1
                    })
                    .map((lease) => (
                      <Grid
                        container
                        sx={{ marginLeft: 1, marginTop: 1 }}
                        key={lease.leaseId}
                      >
                        <Grid item xs={12} key={lease.leaseId}>
                          {
                            <Typography variant="h3">
                              {lease.leaseId} ({getStatusName(lease.status)})
                            </Typography>
                          }
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                          <b>Typ</b>
                        </Grid>
                        <Grid item xs={12} md={8} lg={4}>
                          {lease.type}
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                          <b>Startdatum</b>
                        </Grid>
                        <Grid item xs={12} md={8} lg={4}>
                          {lease.leaseStartDate.toString().substring(0, 10)}
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                          <b>Slutdatum</b>
                        </Grid>
                        <Grid item xs={12} md={8} lg={4}>
                          {lease.leaseEndDate?.toString()}
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                          <b>Adress</b>
                        </Grid>
                        <Grid item xs={12} md={8} lg={4}>
                          {lease.address?.street}
                        </Grid>
                        <Grid item xs={12} md={4} lg={2}>
                          <b>Startdatum</b>
                        </Grid>
                        <Grid item xs={12} md={8} lg={4}>
                          {lease.rentalProperty?.address?.street.toString()}
                        </Grid>
                      </Grid>
                    ))}
                </>
              )}

              {invoices && (
                <>
                  <Divider />
                  <Typography variant="h2">Fakturor</Typography>
                  <Grid container>
                    <Grid item xs={2}>
                      <b>Fakturadatum</b>
                    </Grid>
                    <Grid item xs={2}>
                      <b>Förfallodatum</b>
                    </Grid>
                    <Grid item xs={3}>
                      <b>Fakturanummer</b>
                    </Grid>
                    <Grid item xs={3}>
                      <b>Belopp</b>
                    </Grid>
                    <Grid item xs={2}>
                      <b>Betalstatus</b>
                    </Grid>
                  </Grid>
                  {invoices
                    ?.sort((invoice1, invoice2) => {
                      return invoice1.fromDate < invoice2.fromDate ? 1 : -1
                    })
                    .map((invoice) => (
                      <Grid
                        container
                        sx={{ marginLeft: 1, marginTop: 1 }}
                        key={invoice.invoiceId}
                      >
                        <Grid item xs={2}>
                          {invoice.invoiceDate.toString().substring(0, 10)}
                        </Grid>
                        <Grid item xs={2}>
                          {invoice.expirationDate.toString().substring(0, 10)}
                        </Grid>
                        <Grid item xs={3}>
                          {invoice.invoiceId}
                        </Grid>
                        <Grid item xs={3}>
                          {invoice.amount}
                        </Grid>
                        <Grid item xs={2}>
                          {invoice.paymentStatus == PaymentStatus.Paid
                            ? 'Betald'
                            : 'Obetald'}
                        </Grid>
                      </Grid>
                    ))}
                </>
              )}
              <Divider />
            </>
          </>
        )}
      </Box>
    </>
  )
}

export default Contact
