import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { Incident } from '../../types';

interface IncidentCardProps {
  incident: Incident;
  updateStatus: (id: number, status: Incident['status']) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, updateStatus }) => {
  const handleStatusChange = (newStatus: Incident['status']) => {
    updateStatus(incident.id, newStatus);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h5">{incident.description}</Typography>
        <Typography variant="body2" color="text.secondary">
          Address: {incident.street}, {incident.city}, {incident.state}, {incident.postalCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Severity: {incident.urgencyGrade}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Major Class: {incident.majorClass}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Minor Class: {incident.minorClass}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Status: {incident.status}
        </Typography>
        <Button onClick={() => handleStatusChange('In Progress')} disabled={incident.status !== 'Pending'}>Start</Button>
        <Button onClick={() => handleStatusChange('Resolved')} disabled={incident.status !== 'In Progress'}>Resolve</Button>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;
