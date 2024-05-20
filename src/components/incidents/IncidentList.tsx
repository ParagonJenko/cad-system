import React from 'react';
import { Grid } from '@mui/material';
import IncidentCard from './IncidentCard';
import { Incident, LogEntry } from './types';

interface IncidentListProps {
  incidents: Incident[];
  updateStatus: (id: number, status: Incident['status']) => void;
  updateUrgency: (id: number, urgency: Incident['urgencyGrade']) => void;
  addLog: (id: number, log: LogEntry) => void; 
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, updateStatus, updateUrgency, addLog }) => {
  return (
    <Grid container spacing={2}>
      {incidents.map((incident) => (
        <Grid item xs={12} sm={12} md={12} key={incident.id}>
          <IncidentCard
            incident={incident}
            updateStatus={updateStatus}
            updateUrgency={updateUrgency}
            addLog={addLog}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default IncidentList;
