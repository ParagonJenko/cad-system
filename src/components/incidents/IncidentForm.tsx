import React, { useState } from 'react';
import { TextField, Button, Box, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Incident, MajorClass, MinorClass } from '../../types';

interface IncidentFormProps {
  addIncident: (incident: Incident) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ addIncident }) => {
  const [description, setDescription] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [urgencyGrade, setUrgencyGrade] = useState<Incident['urgencyGrade']>('E Grade');
  const [majorClass, setMajorClass] = useState<MajorClass>(MajorClass.NA);
  const [minorClass, setMinorClass] = useState<MinorClass>(MinorClass.NA);


    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newIncident: Incident = {
      id: Date.now(),
      description,
      street,
      city,
      state,
      postalCode,
      urgencyGrade,
      status: 'Pending',
      majorClass,
      minorClass,
    };
    addIncident(newIncident);
    setDescription('');
    setStreet('');
    setCity('');
    setState('');
    setPostalCode('');
    setUrgencyGrade('I Grade');
    setMajorClass(MajorClass.Burglary);
    setMinorClass(MinorClass.BurglaryInDwelling);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
       <TextField
        label="Street"
        value={street}
        onChange={(e) => setStreet(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="State"
        value={state}
        onChange={(e) => setState(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <TextField
        label="Postal Code"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        fullWidth
        required
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="urgencyGrade-label">Urgency Grade</InputLabel>
        <Select
          labelId="urgencyGrade-label"
          value={urgencyGrade}
          onChange={(e) => setUrgencyGrade(e.target.value as Incident['urgencyGrade'])}
          label="Urgency Grade"
        >
          <MenuItem value="I Grade">I Grade (15 minutes)</MenuItem>
          <MenuItem value="S Grade">S Grade (60 minutes)</MenuItem>
          <MenuItem value="E Grade">E Grade (48 hours)</MenuItem>
          <MenuItem value="R Grade">R Grade (Referred)</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="majorClass-label">Major Class</InputLabel>
        <Select
          labelId="majorClass-label"
          value={majorClass}
          onChange={(e) => {
            setMajorClass(e.target.value as MajorClass);
            setMinorClass(Object.values(MinorClass).find(minor => minor.startsWith(e.target.value.split(' ')[0])) || MinorClass.BurglaryInDwelling);
          }}
          label="Major Class"
        >
          {Object.values(MajorClass).map((major) => (
            <MenuItem key={major} value={major}>{major}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="minorClass-label">Minor Class</InputLabel>
        <Select
          labelId="minorClass-label"
          value={minorClass}
          onChange={(e) => setMinorClass(e.target.value as MinorClass)}
          label="Minor Class"
        >
          {Object.values(MinorClass).filter(minor => minor.startsWith(majorClass.split(' ')[0])).map((minor) => (
            <MenuItem key={minor} value={minor}>{minor}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Add Incident
      </Button>
    </Box>
  );
};

export default IncidentForm;
