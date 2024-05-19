import React, { useState } from 'react';
import NavBar from './components/Navbar';
import IncidentForm from './components/incidents/IncidentForm';
import IncidentList from './components/incidents/IncidentList';
import { Container, Typography } from '@mui/material';
import { Incident } from './types';

const App: React.FC = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);

  const addIncident = (incident: Incident) => {
    setIncidents((prevIncidents) => [...prevIncidents, incident]);
  }

  const updateStatus = (id: number, status: Incident['status']) => {
    setIncidents((prevIncidents) =>
      prevIncidents.map((incident) =>
        incident.id === id ? { ...incident, status } : incident
      )
    );
  }

  return (
    <div>
      <NavBar />
      <Container>
        <Typography variant="h4" sx={{ mt: 3 }}>
          Computer Aided Dispatch System
        </Typography>
        <IncidentForm addIncident={addIncident} />
        <IncidentList incidents={incidents} updateStatus={updateStatus} />
      </Container>
    </div>
  );
}

export default App;
