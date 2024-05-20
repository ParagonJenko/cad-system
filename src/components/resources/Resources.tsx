// src/components/resources/Resources.tsx
import React from 'react';
import { Container, Typography } from '@mui/material';
import Vehicles from './Vehicles';
import useVehicles from '../../hooks/useVehicles';

const Resources: React.FC = () => {
  const { vehicles } = useVehicles();

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Resources
      </Typography>
      <Vehicles vehicles={vehicles} />
    </Container>
  );
};

export default Resources;
