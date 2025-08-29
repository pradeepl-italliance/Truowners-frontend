// src/components/Bookings/MyBookings.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { buildApiUrl } from '../../../config/api'
import {
  handleApiError,
  validateApiResponse
} from '../../../utils/errorHandler'

// ────── MUI ──────────────────────────────────────────────────────────
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Grid
} from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PlaceIcon from '@mui/icons-material/Place'

const STATUS_GRADIENTS = {
  approved: 'linear-gradient(135deg, #4caf50, #81c784)',
  pending: 'linear-gradient(135deg, #ff9800, #ffb74d)',
  rejected: 'linear-gradient(135deg, #f44336, #e57373)',
  cancelled: 'linear-gradient(135deg, #9e9e9e, #bdbdbd)'
}

const MyBookings = () => {
  const navigate   = useNavigate()
  const { token, isAuthenticated, user } = useAuth()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  // ───── fetch ───────────────────────────────────────────────────────
  const fetchBookings = async () => {
    if (!isAuthenticated || user?.role !== 'user') {
      setLoading(false)
      return
    }

    try {
      const res = await fetch(buildApiUrl('/booking'), {
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
      })

      if (!res.ok) throw new Error(handleApiError(null, res))

      const data = await res.json()
      validateApiResponse(data)

      const { bookings = [] } = data.data ?? {}
      setBookings(bookings)
    } catch (err) {
      setError(err.message || handleApiError(err))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchBookings() }, [isAuthenticated, token]) // eslint-disable-line

  // ───── UI states ───────────────────────────────────────────────────
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    )
  }

  if (bookings.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Typography variant="h6">No bookings found.</Typography>
      </Box>
    )
  }

  // ───── render ──────────────────────────────────────────────────────
  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography 
        variant="h5" 
        sx={{ mb: 3, fontWeight: 600, textAlign: 'center' }}
      >
        My Bookings
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {bookings.map((b) => {
          const { _id, property, timeSlot, status, date } = b
          const loc = property.location

          return (
            <Grid item xs={12} sm={6} md={4} key={_id}>
              <Box
                sx={{
                  borderRadius: 3,
                  p: 0.5,
                  background: STATUS_GRADIENTS[status] || '#ddd'
                }}
              >
                <Card
                  sx={{
                    borderRadius: 2,
                    height: '100%',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    overflow: 'hidden',
                    textAlign: 'center'
                  }}
                  onClick={() => navigate(`/property/${property._id}`)}
                >
                  <CardContent sx={{ flexGrow: 1, width: '100%' }}>
                    {/* Title */}
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {property.title}
                    </Typography>

                    {/* Address */}
                    {loc?.address && (
                      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 0.5 }}>
                        <PlaceIcon sx={{ fontSize: 18, mr: 0.5 }} />
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {loc.address}{loc.city ? `, ${loc.city}` : ''}
                        </Typography>
                      </Box>
                    )}

                    {/* Date + Time */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                      <Chip
                        icon={<EventIcon />}
                        label={new Date(date).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                        size="small"
                      />
                      <Chip icon={<ScheduleIcon />} label={timeSlot} size="small" />
                    </Box>

                    {/* Status Row (opposite side) */}
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        mt: 2 
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          textTransform: 'capitalize',
                          color:
                            status === 'approved'
                              ? 'green'
                              : status === 'pending'
                              ? 'orange'
                              : 'red'
                        }}
                      >
                        {status}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default MyBookings