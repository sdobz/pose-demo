import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

function Publishment() {
  return <Box sx={{my: 2}}>
    See <Link href="https://github.com/sdobz/pose-demo">the source code</Link>
  </Box>
}

export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create React App example with TypeScript
        </Typography>
        <Publishment />
      </Box>
    </Container>
  );
}
