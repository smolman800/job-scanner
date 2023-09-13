import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loading() {
  return (
    <Box minWidth={'100%'}>
      <LinearProgress color="inherit" />
    </Box>
  );
}
