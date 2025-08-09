import { Box, Skeleton, Stack } from '@mui/material';

export default function ProfileSkeleton() {
  return (
    <Box sx={{
      p: { xs: 0, sm: 4 },
      maxWidth: 480,
      mx: 'auto',
      mt: { xs: 0, sm: 6 },
      borderRadius: 4,
      boxShadow: { xs: 'none', sm: 3 },
      bgcolor: { xs: 'transparent', sm: 'background.paper' },
      overflow: 'hidden',
    }}>
      {/* Banner Skeleton */}
      <Box sx={{ height: 120, width: '100%', position: 'relative', bgcolor: 'grey.300' }}>
        <Skeleton variant="rectangular" width="100%" height={120} animation="wave" />
        {/* Avatar Skeleton */}
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: -40, display: 'flex', justifyContent: 'center' }}>
          <Skeleton variant="circular" width={80} height={80} sx={{ border: '3px solid #fff' }} animation="wave" />
        </Box>
      </Box>
      <Box sx={{ pt: 7, pb: 2, textAlign: 'center' }}>
        <Skeleton variant="text" width={160} height={36} sx={{ mx: 'auto', mb: 1 }} animation="wave" />
        <Skeleton variant="text" width={220} height={24} sx={{ mx: 'auto', mb: 0.5 }} animation="wave" />
        <Skeleton variant="text" width={100} height={18} sx={{ mx: 'auto' }} animation="wave" />
      </Box>
      {/* Action Buttons Skeleton */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 2 }}>
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} variant="rounded" width={110} height={36} animation="wave" />
        ))}
      </Box>
      {/* Sections Skeleton */}
      <Box sx={{ mt: 2, textAlign: 'left', px: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Skeleton variant="text" width={80} height={20} animation="wave" />
            <Skeleton variant="text" width={120} height={18} animation="wave" />
          </Box>
          <Box>
            <Skeleton variant="text" width={80} height={20} animation="wave" />
            <Skeleton variant="text" width={180} height={18} animation="wave" />
          </Box>
          <Box>
            <Skeleton variant="text" width={100} height={20} animation="wave" />
            <Skeleton variant="text" width={160} height={18} animation="wave" />
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}
