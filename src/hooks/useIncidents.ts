import { useState, useEffect } from 'react';
import { Incident, MajorClass, MinorClass, LogEntry } from '../types';
import { subMinutes, subHours, subDays } from 'date-fns';

// Helper function to generate a random date within the past month
const getRandomDate = () => {
	const start = new Date();
	start.setMonth(start.getMonth() - 1);
	const end = new Date();
	return new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	).toISOString();
};

// Create fake incidents with specific date-times and logs
const fakeIncidents: Incident[] = [
	{
		id: 1,
		logs: [
			{ timestamp: new Date().toISOString(), message: 'Incident created' },
		],
		street: '123 Main St',
		city: 'Anytown',
		county: 'SomeCounty',
		postalCode: '12345',
		urgencyGrade: 'I Grade',
		status: 'Pending',
		majorClass: MajorClass.Burglary,
		minorClass: MinorClass.BurglaryInDwelling,
		timestamp: new Date().toISOString(), // now
	},
	{
		id: 2,
		logs: [
			{
				timestamp: subMinutes(new Date(), 16).toISOString(),
				message: 'Incident created',
			},
		],
		street: '456 Elm St',
		city: 'Othertown',
		county: 'OtherCounty',
		postalCode: '67890',
		urgencyGrade: 'S Grade',
		status: 'In Progress',
		majorClass: MajorClass.CriminalDamage,
		minorClass: MinorClass.CriminalDamageToMotorVehicle,
		timestamp: subMinutes(new Date(), 16).toISOString(), // 16 minutes ago
	},
	{
		id: 3,
		logs: [
			{
				timestamp: subHours(new Date(), 23).toISOString(),
				message: 'Incident created',
			},
		],
		street: '789 Maple St',
		city: 'Elsewhere',
		county: 'AnotherCounty',
		postalCode: '10111',
		urgencyGrade: 'E Grade',
		status: 'Resolved',
		majorClass: MajorClass.Drugs,
		minorClass: MinorClass.DrugTrafficking,
		timestamp: subHours(new Date(), 23).toISOString(), // 23 hours ago
	},
	{
		id: 4,
		logs: [
			{
				timestamp: subDays(new Date(), 2).toISOString(),
				message: 'Incident created',
			},
		],
		street: '101 Pine St',
		city: 'Somewhere',
		county: 'ThisCounty',
		postalCode: '12131',
		urgencyGrade: 'R Grade',
		status: 'Pending',
		majorClass: MajorClass.TheftHandling,
		minorClass: MinorClass.TheftFromMotorVehicle,
		timestamp: subDays(new Date(), 2).toISOString(), // 2 days ago
	},
	{
		id: 5,
		logs: [{ timestamp: getRandomDate(), message: 'Incident created' }],
		street: '202 Oak St',
		city: 'ThatTown',
		county: 'TheirCounty',
		postalCode: '14151',
		urgencyGrade: 'I Grade',
		status: 'In Progress',
		majorClass: MajorClass.AdditionalCrimeTypes,
		minorClass: MinorClass.RacistReligiousHateCrime,
		timestamp: getRandomDate(),
	},
	{
		id: 6,
		logs: [{ timestamp: getRandomDate(), message: 'Incident created' }],
		street: '303 Cedar St',
		city: 'YourTown',
		county: 'MyCounty',
		postalCode: '16171',
		urgencyGrade: 'S Grade',
		status: 'Resolved',
		majorClass: MajorClass.ViolenceAgainstThePerson,
		minorClass: MinorClass.AssaultWithInjury,
		timestamp: getRandomDate(),
	},
	{
		id: 7,
		logs: [{ timestamp: getRandomDate(), message: 'Incident created' }],
		street: '404 Birch St',
		city: 'HisTown',
		county: 'HerCounty',
		postalCode: '18191',
		urgencyGrade: 'E Grade',
		status: 'Pending',
		majorClass: MajorClass.TheftHandling,
		minorClass: MinorClass.HandlingStolenGoods,
		timestamp: getRandomDate(),
	},
	{
		id: 8,
		logs: [{ timestamp: getRandomDate(), message: 'Incident created' }],
		street: '505 Spruce St',
		city: 'OurTown',
		county: 'TheirCounty',
		postalCode: '20212',
		urgencyGrade: 'R Grade',
		status: 'Pending',
		majorClass: MajorClass.SexualOffences,
		minorClass: MinorClass.OtherSexual,
		timestamp: getRandomDate(),
	},
	{
		id: 9,
		logs: [{ timestamp: getRandomDate(), message: 'Incident created' }],
		street: '606 Walnut St',
		city: 'TheirCity',
		county: 'OtherCounty',
		postalCode: '23242',
		urgencyGrade: 'I Grade',
		status: 'In Progress',
		majorClass: MajorClass.FraudForgery,
		minorClass: MinorClass.OtherFraudForgery,
		timestamp: getRandomDate(),
	},
	{
		id: 10,
		logs: [{ timestamp: getRandomDate(), message: 'Incident created' }],
		street: '707 Ash St',
		city: 'AnotherTown',
		county: 'SomeCounty',
		postalCode: '25262',
		urgencyGrade: 'S Grade',
		status: 'Resolved',
		majorClass: MajorClass.ViolenceAgainstThePerson,
		minorClass: MinorClass.Harassment,
		timestamp: getRandomDate(),
	},
];

// Define the sorting order for urgency grades
const urgencyGradeOrder = {
	'I Grade': 1,
	'S Grade': 2,
	'E Grade': 3,
	'R Grade': 4,
};

const useIncidents = () => {
	const [incidents, setIncidents] = useState<Incident[]>([]);

	useEffect(() => {
		// Simulate API call by setting fake incidents after a delay
		setTimeout(() => {
			const sortedIncidents = [...fakeIncidents].sort((a, b) => {
				return (
					urgencyGradeOrder[a.urgencyGrade] - urgencyGradeOrder[b.urgencyGrade]
				);
			});
			setIncidents(sortedIncidents);
		}, 10); // 1-second delay
	}, []);

	const addIncident = (incident: Incident) => {
		setIncidents((prevIncidents) => {
			const newIncidents = [...prevIncidents, incident];
			return newIncidents.sort((a, b) => {
				return (
					urgencyGradeOrder[a.urgencyGrade] - urgencyGradeOrder[b.urgencyGrade]
				);
			});
		});
	};

	const updateStatus = (id: number, status: Incident['status']) => {
		setIncidents((prevIncidents) => {
			const updatedIncidents = prevIncidents.map((incident) =>
				incident.id === id ? { ...incident, status } : incident
			);
			return updatedIncidents.sort((a, b) => {
				return (
					urgencyGradeOrder[a.urgencyGrade] - urgencyGradeOrder[b.urgencyGrade]
				);
			});
		});
	};

	const updateUrgency = (id: number, urgency: Incident['urgencyGrade']) => {
		setIncidents((prevIncidents) => {
			const updatedIncidents = prevIncidents.map((incident) =>
				incident.id === id ? { ...incident, urgencyGrade: urgency } : incident
			);
			return updatedIncidents.sort((a, b) => {
				return (
					urgencyGradeOrder[a.urgencyGrade] - urgencyGradeOrder[b.urgencyGrade]
				);
			});
		});
	};

	const addLog = (id: number, log: LogEntry) => {
		setIncidents((prevIncidents) => {
			const updatedIncidents = prevIncidents.map((incident) =>
				incident.id === id
					? { ...incident, logs: [...incident.logs, log] }
					: incident
			);
			return updatedIncidents.sort((a, b) => {
				return (
					urgencyGradeOrder[a.urgencyGrade] - urgencyGradeOrder[b.urgencyGrade]
				);
			});
		});
	};

	return {
		incidents,
		addIncident,
		updateStatus,
		updateUrgency,
		addLog,
	};
};

export default useIncidents;
