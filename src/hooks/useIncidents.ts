import { useState } from 'react';
import { Incident } from '../types';

const useIncidents = () => {
	const [incidents, setIncidents] = useState<Incident[]>([]);

	const addIncident = (incident: Incident) => {
		setIncidents((prevIncidents) => [...prevIncidents, incident]);
	};

	const updateStatus = (id: number, status: Incident['status']) => {
		setIncidents((prevIncidents) =>
			prevIncidents.map((incident) =>
				incident.id === id ? { ...incident, status } : incident
			)
		);
	};

	return {
		incidents,
		addIncident,
		updateStatus,
	};
};

export default useIncidents;
