import React from 'react';
import { Incident } from '../../types';
import IncidentCard from './IncidentCard';

interface IncidentListProps {
  incidents: Incident[];
  updateStatus: (id: number, status: Incident['status']) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({ incidents, updateStatus }) => {
  return (
    <div>
      {incidents.map((incident) => (
        <IncidentCard key={incident.id} incident={incident} updateStatus={updateStatus} />
      ))}
    </div>
  );
}

export default IncidentList;
