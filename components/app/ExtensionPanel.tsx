import { Box, Typography } from '@mui/material';

export default function ExtensionPanel() {
  return (
    <Box sx={{ position: 'fixed', right: 0, top: 0, width: 320, height: '100vh', bgcolor: 'background.paper', boxShadow: 4, p: 3 }}>
      <Typography variant="h6">Extensions & Bots</Typography>
      {/* List bots, integrations, web3 wallets, etc. */}
    </Box>
  );
}
