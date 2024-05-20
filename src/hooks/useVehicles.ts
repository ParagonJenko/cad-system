// src/hooks/useVehicles.ts
import { useState, useEffect } from 'react';
import {
	Vehicle,
	VehicleType,
	VehicleStatus,
} from '../components/resources/types';

const useVehicles = () => {
	const [vehicles, setVehicles] = useState<Vehicle[]>([]);

	useEffect(() => {
		// Fake data
		const fakeVehicles: Vehicle[] = [
			{
				id: '1',
				type: VehicleType.IncidentResponseVehicle,
				status: VehicleStatus.Available,
				details: 'Vehicle 1 details',
			},
			{
				id: '2',
				type: VehicleType.ArmedResponseVehicle,
				status: VehicleStatus.Allocated,
				details: 'Vehicle 2 details',
			},
			{
				id: '3',
				type: VehicleType.DogUnit,
				status: VehicleStatus.InUse,
				details: 'Vehicle 3 details',
			},
			{
				id: '4',
				type: VehicleType.RoadsPolicingUnit,
				status: VehicleStatus.Maintenance,
				details: 'Vehicle 4 details',
			},
		];
		setVehicles(fakeVehicles);
	}, []);

	return { vehicles };
};

export default useVehicles;
