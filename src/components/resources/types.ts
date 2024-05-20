// src/types.ts
export enum VehicleType {
	IncidentResponseVehicle = 'Incident Response Vehicle',
	ArmedResponseVehicle = 'Armed Response Vehicle',
	DogUnit = 'Dog Unit',
	RoadsPolicingUnit = 'Roads Policing Unit',
}

export enum VehicleStatus {
	Available = 'Available',
	Allocated = 'Allocated',
	InUse = 'In Use',
	Maintenance = 'Maintenance',
}

export interface Vehicle {
	id: string;
	type: VehicleType;
	status: VehicleStatus;
	details: string; // Additional details like vehicle number, driver name, etc.
}
