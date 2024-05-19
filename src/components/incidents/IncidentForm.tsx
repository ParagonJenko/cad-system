import React, { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Card,
  CardContent,
  Grid,
  Typography
} from '@mui/material';
import { Incident, MajorClass, MinorClass, LogEntry } from '../../types';

interface IncidentFormProps {
  addIncident: (incident: Incident) => void;
}

const IncidentForm: React.FC<IncidentFormProps> = ({ addIncident }) => {
  const [logEntry, setLogEntry] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [county, setCounty] = useState<string>('');
  const [postalCode, setPostalCode] = useState<string>('');
  const [urgencyGrade, setUrgencyGrade] = useState<Incident['urgencyGrade']>('I Grade');
  const [majorClass, setMajorClass] = useState<MajorClass>(MajorClass.NA);
  const [minorClass, setMinorClass] = useState<MinorClass>(MinorClass.NA);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLog: LogEntry = {
      timestamp: new Date().toISOString(),
      message: logEntry
    };
    const newIncident: Incident = {
      id: Date.now(),
      logs: [newLog],
      street,
      city,
      county,
      postalCode,
      urgencyGrade,
      status: 'Pending',
      majorClass,
      minorClass,
      timestamp: new Date().toISOString(),
    };
    addIncident(newIncident);
    setLogEntry('');
    setStreet('');
    setCity('');
    setCounty('');
    setPostalCode('');
    setUrgencyGrade('I Grade');
    setMajorClass(MajorClass.NA);
    setMinorClass(MinorClass.NA);
    setShowForm(false);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Button variant="contained" onClick={() => setShowForm(!showForm)} sx={{ mb: 2 }}>
        {showForm ? 'Hide Incident Form' : 'Show Incident Form'}
      </Button>
      {showForm && (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Add Incident
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                label="Log entry"
                value={logEntry}
                onChange={(e) => setLogEntry(e.target.value)}
                fullWidth
                multiline
                required
                sx={{ mb: 2 }}
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Street"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="County"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Postal Code"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
              </Grid>
              <FormControl fullWidth sx={{ mb: 2, mt: 2 }}>
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
                    setMinorClass(
                      Object.values(MinorClass).find(minor =>
                        minor.startsWith(e.target.value.split(' ')[0])
                      ) || MinorClass.BurglaryInDwelling
                    );
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
                  {Object.values(MinorClass).filter(minor =>
                    minor.startsWith(majorClass.split(' ')[0])
                  ).map((minor) => (
                    <MenuItem key={minor} value={minor}>{minor}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button type="submit" variant="contained">
                Add Incident
              </Button>
            </Box>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default IncidentForm;
