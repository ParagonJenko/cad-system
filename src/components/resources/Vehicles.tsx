// src/components/Vehicles.tsx
import React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer, Typography } from '@mui/material';
import { Vehicle } from './types';

interface VehiclesProps {
  vehicles: Vehicle[];
}

const Vehicles: React.FC<VehiclesProps> = ({ vehicles }) => {
  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="div" sx={{ padding: 2 }}>
        Vehicle Resources
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Details</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.id}</TableCell>
              <TableCell>{vehicle.type}</TableCell>
              <TableCell>{vehicle.status}</TableCell>
              <TableCell>{vehicle.details}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Vehicles;
