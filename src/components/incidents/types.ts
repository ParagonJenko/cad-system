// Define an enumeration for major classes
export enum MajorClass {
	NA = 'Not Assigned',
	Burglary = 'Burglary',
	CriminalDamage = 'Criminal Damage',
	Drugs = 'Drugs',
	FraudForgery = 'Fraud & Forgery',
	OtherNotifiableOffences = 'Other Notifiable Offences',
	Robbery = 'Robbery',
	SexualOffences = 'Sexual Offences',
	TheftHandling = 'Theft & Handling',
	ViolenceAgainstThePerson = 'Violence Against The Person',
	AdditionalCrimeTypes = 'Additional Crime Types',
}

// Define an enumeration for minor classes within each major class
export enum MinorClass {
	NA = 'Not Assigned',
	BurglaryInDwelling = 'Burglary in a dwelling',
	BurglaryInOtherBuildings = 'Burglary in other buildings',

	CriminalDamageToDwelling = 'Criminal damage to dwelling',
	CriminalDamageToMotorVehicle = 'Criminal damage to motor vehicle',
	CriminalDamageToOtherBuilding = 'Criminal damage to other building',
	OtherCriminalDamage = 'Other criminal damage',

	DrugTrafficking = 'Drug trafficking',
	OtherDrugs = 'Other drugs',
	PossessionOfDrugs = 'Possession of drugs',

	OtherFraudForgery = 'Other fraud and forgery',

	GoingEquipped = 'Going equipped',
	OtherNotifiable = 'Other notifiable',

	BusinessProperty = 'Business property',
	PersonalProperty = 'Personal property',

	OtherSexual = 'Other sexual',
	Rape = 'Rape',

	HandlingStolenGoods = 'Handling stolen goods',
	MotorVehicleInterferenceTampering = 'Motor vehicle interference and tampering',
	OtherTheft = 'Other theft',
	TheftFromMotorVehicle = 'Theft from motor vehicle',
	TheftFromShops = 'Theft from shops',
	TheftPerson = 'Theft person',
	TheftTakingOfMotorVehicle = 'Theft/taking of motor vehicle',
	TheftTakingOfPedalCycle = 'Theft/taking of pedal cycle',

	AssaultWithInjury = 'Assault with injury',
	CommonAssault = 'Common assault',
	Harassment = 'Harassment',
	MurderHomicide = 'Murder (homicide)',
	OffensiveWeapon = 'Offensive weapon',
	OtherViolence = 'Other violence',
	WoundingGBH = 'Wounding/GBH',

	GunCrime = 'Gun crime',
	MotorVehicleCrime = 'Motor vehicle crime',
	DomesticCrime = 'Domestic crime',
	RacistReligiousHateCrime = 'Racist and religious hate crime',
	HomophobicCrime = 'Homophobic crime',
	AntiSemiticCrime = 'Anti-semitic crime',
	IslamophobicCrime = 'Islamophobic crime',
	MostSeriousViolence = 'Most Serious violence',
	ASB = 'Anti Social Behaviour',
	MOPAC7 = 'MOPAC7', // MOPAC 7 priority crimes are crimes which have a high impact on victims; they are burglary, criminal damage, robbery, theft from a motor vehicle, theft from a person, theft of a motor vehicle and violence with injury.
	RobberyOfMobilePhone = 'Robbery of mobile phone',
	VWI = 'Violence with injury',
	LBWDischarges = 'Lethal barrel weapon discharges',
	KnifeCrime = 'Knife crime',
	KIV = 'Keep in view',
}

export interface LogEntry {
	timestamp: string; // ISO 8601 date string
	message: string;
}

export interface Incident {
	id: number;
	logs: LogEntry[];
	street: string;
	city: string;
	county: string;
	postalCode: string;
	urgencyGrade: 'I Grade' | 'S Grade' | 'E Grade' | 'R Grade'; // I = 15 minutes, S = 60 minutes, E = 48 hours, R = Referred
	status:
		| 'Pending'
		| 'In Progress'
		| 'Resolved'
		| 'Closed'
		| 'Cancelled'
		| 'Referred'
		| 'Escalated'
		| 'Awaiting Resources'
		| 'Follow-Up Required'
		| 'On Hold'
		| 'Transporting'
		| 'Arrived on Scene'
		| 'Under Review';
	assignedTo?: string;
	majorClass: MajorClass;
	minorClass: MinorClass;
	timestamp: string; // ISO 8601 date string
}
