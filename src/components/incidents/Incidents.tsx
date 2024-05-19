import React from 'react';
import { Container, Typography } from '@mui/material';
import IncidentForm from './IncidentForm';
import IncidentList from './IncidentList';
import useIncidents from '../../hooks/useIncidents';

const Incidents: React.FC = () => {
  const { incidents, addIncident, updateStatus, updateUrgency } = useIncidents();

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 3 }}>
        Incidents
      </Typography>
      <IncidentForm addIncident={addIncident} />
      <IncidentList incidents={incidents} updateStatus={updateStatus} updateUrgency={updateUrgency} />
    </Container>
  );
};

export default Incidents;
