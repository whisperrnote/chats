import { Box, Skeleton, Stack, Tabs, Tab } from '@mui/material';

export default function ProfileSkeleton() {
  return (
    <Box sx={{
      p: { xs: 0, sm: 4 },
      maxWidth: 600,
      mx: 'auto',
      mt: { xs: 0, sm: 6 },
      borderRadius: 4,
      boxShadow: { xs: 'none', sm: 3 },
      bgcolor: { xs: 'transparent', sm: 'background.paper' },
      overflow: 'hidden',
    }}>
      {/* Cover/Header Skeleton */}
      <Box sx={{ position: 'relative' }}>
        <Box sx={{ height: { xs: 140, sm: 180 } }}>
          <Skeleton 
            variant="rectangular" 
            width="100%" 
            height="100%"
            sx={{ borderRadius: { xs: 0, sm: '16px 16px 0 0' } }}
            animation="wave" 
          />
        </Box>
        
        {/* Avatar Skeleton */}
        <Box sx={{
          position: 'absolute',
          bottom: -40,
          left: { xs: '50%', sm: 32 },
          transform: { xs: 'translateX(-50%)', sm: 'none' },
        }}>
          <Skeleton 
            variant="circular" 
            width={80} 
            height={80} 
            sx={{ 
              border: '4px solid white',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            }} 
            animation="wave" 
          />
        </Box>
      </Box>

      {/* Profile Info Skeleton */}
      <Box sx={{ 
        pt: 6, 
        px: { xs: 2, sm: 4 }, 
        pb: 3,
        ml: { xs: 0, sm: 7 },
      }}>
        <Stack spacing={1} alignItems={{ xs: 'center', sm: 'flex-start' }}>
          <Skeleton variant="text" width={200} height={40} animation="wave" />
          <Skeleton variant="text" width={120} height={20} animation="wave" />
          <Skeleton variant="text" width={300} height={24} animation="wave" />
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Skeleton variant="rounded" width={80} height={24} animation="wave" />
            <Skeleton variant="rounded" width={100} height={24} animation="wave" />
            <Skeleton variant="rounded" width={90} height={24} animation="wave" />
          </Stack>
        </Stack>
      </Box>

      {/* Actions Skeleton */}
      <Box sx={{ px: { xs: 2, sm: 4 }, pb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mb: 2 }}>
          <Skeleton variant="rounded" width={120} height={48} animation="wave" />
          <Skeleton variant="rounded" width={100} height={48} animation="wave" />
          <Skeleton variant="rounded" width={48} height={48} animation="wave" />
        </Stack>
        <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="rounded" width={40} height={40} animation="wave" />
          ))}
        </Stack>
      </Box>

      {/* Tabs Skeleton */}
      <Box sx={{ px: { xs: 2, sm: 4 } }}>
        <Stack direction="row" spacing={4} sx={{ borderBottom: 1, borderColor: 'divider', pb: 1 }}>
          <Skeleton variant="text" width={80} height={40} animation="wave" />
          <Skeleton variant="text" width={80} height={40} animation="wave" />
          <Skeleton variant="text" width={80} height={40} animation="wave" />
        </Stack>
        
        {/* Tab Content Skeleton */}
        <Box sx={{ pt: 3, pb: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Skeleton variant="text" width={140} height={28} animation="wave" />
              <Stack spacing={2} sx={{ mt: 2 }}>
                {[...Array(3)].map((_, i) => (
                  <Stack key={i} direction="row" spacing={2} alignItems="center">
                    <Skeleton variant="circular" width={24} height={24} animation="wave" />
                    <Box sx={{ flex: 1 }}>
                      <Skeleton variant="text" width={100} height={20} animation="wave" />
                      <Skeleton variant="text" width={160} height={18} animation="wave" />
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Box>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}
