import React from 'react';
import { Container, Typography } from '@mui/material';

const Dashboard: React.FC = () => (
  <Container>
    <Typography variant="h4" sx={{ mt: 3 }}>
      Dashboard
    </Typography>
    <Typography>
      Welcome to the dashboard!
    </Typography>
    {/* Add more dashboard content here */}
  </Container>
);

export default Dashboard;
