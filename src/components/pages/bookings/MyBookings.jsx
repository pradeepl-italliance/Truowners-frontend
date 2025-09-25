// src/components/Bookings/MyBookings.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { buildApiUrl } from '../../../config/api'
import { handleApiError, validateApiResponse } from '../../../utils/errorHandler'
import {
  Box,
  Paper,
  Typography,
  Chip,
  CircularProgress,
  Alert,
  Grid,
  Divider
} from '@mui/material'
import EventIcon from '@mui/icons-material/Event'
import ScheduleIcon from '@mui/icons-material/Schedule'
import PlaceIcon from '@mui/icons-material/Place'

const STATUS_COLORS = {
  approved: '#4caf50',
  pending: '#ff9800',
  rejected: '#f44336',
  cancelled: '#9e9e9e'
}

const MyBookings = () => {
  const navigate = useNavigate()
  const { token, isAuthenticated, user } = useAuth()

  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
      <CircularProgress />
    </Box>
  )

  if (error) return (
    <Box sx={{ maxWidth: 480, mx: 'auto', mt: 4 }}>
      <Alert severity="error">{error}</Alert>
    </Box>
  )

  if (bookings.length === 0) return (
    <Box sx={{ textAlign: 'center', mt: 6 }}>
      <Typography variant="h6">No bookings found.</Typography>
    </Box>
  )

  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>
      <Typography
        variant="h5"
        sx={{ mb: 4, fontWeight: 600, textAlign: 'center' }}
      >
        My Bookings
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {bookings.map((b) => {
          const { _id, property, timeSlot, status, date } = b
          const loc = property.location

          // Capitalize BHK using string method
          const titleWithCapitalBHK = property.title
            .split(' ')
            .map(word => word.toLowerCase() === 'bhk' ? 'BHK' : word)
            .join(' ')

          return (
            <Grid item xs={12} sm={6} md={4} key={_id}>
              <Paper
                elevation={3}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: 3,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
                onClick={() => navigate(`/property/${property._id}`)}
              >
                {/* Status Bar */}
                <Box sx={{ height: 6, backgroundColor: STATUS_COLORS[status] || '#ddd' }} />

                {/* Card Content */}
                <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
                  {/* Title with BHK capitalized */}
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 600, wordBreak: 'break-word' }}
                  >
                    {titleWithCapitalBHK}
                  </Typography>

                  {/* Address */}
                  {loc?.address && (
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5 }}>
                      <PlaceIcon sx={{ fontSize: 18, mt: 0.5 }} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ wordBreak: 'break-word' }}
                      >
                        {loc.address}{loc.city ? `, ${loc.city}` : ''}
                      </Typography>
                    </Box>
                  )}

                  <Divider sx={{ my: 1 }} />

                  {/* Date + Time with better vertical padding */}
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip
                      icon={<EventIcon />}
                      label={new Date(date).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                      sx={{
                        px: 1.5,
                        borderRadius: 2,
                        minHeight: 36, // taller chip
                        '& .MuiChip-label': {
                          py: 0.8 // more padding inside
                        }
                      }}
                    />
                    <Chip
                      icon={<ScheduleIcon />}
                      label={timeSlot}
                      sx={{
                        px: 1.5,
                        borderRadius: 2,
                        minHeight: 36,
                        '& .MuiChip-label': {
                          py: 0.8
                        }
                      }}
                    />
                  </Box>

                  {/* Status */}
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      textTransform: 'capitalize',
                      color: STATUS_COLORS[status] || 'black',
                      mt: 1,
                      alignSelf: 'flex-end'
                    }}
                  >
                    {status}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default MyBookings
