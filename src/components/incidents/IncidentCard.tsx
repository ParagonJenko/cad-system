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
          <strong>Address:</strong>
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {incident.street}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {incident.city}, {incident.state} {incident.postalCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Urgency Grade:</strong> {incident.urgencyGrade}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Major Class:</strong> {incident.majorClass}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Minor Class:</strong> {incident.minorClass}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <strong>Status:</strong> {incident.status}
        </Typography>
        <Button
          onClick={() => handleStatusChange('In Progress')}
          disabled={incident.status !== 'Pending'}
          sx={{ mr: 1 }}
        >
          Start
        </Button>
        <Button
          onClick={() => handleStatusChange('Resolved')}
          disabled={incident.status !== 'In Progress'}
        >
          Resolve
        </Button>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;
