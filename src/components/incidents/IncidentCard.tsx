import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Chip,
  Avatar,
  Box,
  Menu,
  MenuItem as MenuOption
} from '@mui/material';
import { MoreVert } from '@mui/icons-material';
import { Incident } from '../../types';
import { SelectChangeEvent } from '@mui/material';

interface IncidentCardProps {
  incident: Incident;
  updateStatus: (id: number, status: Incident['status']) => void;
  updateUrgency: (id: number, urgency: Incident['urgencyGrade']) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, updateStatus, updateUrgency }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (event: SelectChangeEvent<Incident['status']>) => {
    const newStatus = event.target.value as Incident['status'];
    updateStatus(incident.id, newStatus);
  };

  const handleUrgencyChange = (event: SelectChangeEvent<Incident['urgencyGrade']>) => {
    const newUrgency = event.target.value as Incident['urgencyGrade'];
    updateUrgency(incident.id, newUrgency);
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'primary.main' }}>
            {incident.description.charAt(0).toUpperCase()}
          </Avatar>
        }
        action={
          <>
            <IconButton aria-label="settings" onClick={handleMenuOpen}>
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuOption>
                <FormControl fullWidth>
                  <InputLabel id="urgency-label">Urgency</InputLabel>
                  <Select
                    labelId="urgency-label"
                    value={incident.urgencyGrade}
                    onChange={handleUrgencyChange}
                    label="Urgency"
                  >
                    <MenuItem value="I Grade">I Grade</MenuItem>
                    <MenuItem value="S Grade">S Grade</MenuItem>
                    <MenuItem value="E Grade">E Grade</MenuItem>
                    <MenuItem value="R Grade">R Grade</MenuItem>
                  </Select>
                </FormControl>
              </MenuOption>
              <MenuOption>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    value={incident.status}
                    onChange={handleStatusChange}
                    label="Status"
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                    <MenuItem value="Closed">Closed</MenuItem>
                    <MenuItem value="Cancelled">Cancelled</MenuItem>
                    <MenuItem value="Referred">Referred</MenuItem>
                    <MenuItem value="Escalated">Escalated</MenuItem>
                    <MenuItem value="Awaiting Resources">Awaiting Resources</MenuItem>
                    <MenuItem value="Follow-Up Required">Follow-Up Required</MenuItem>
                    <MenuItem value="On Hold">On Hold</MenuItem>
                    <MenuItem value="Transporting">Transporting</MenuItem>
                    <MenuItem value="Arrived on Scene">Arrived on Scene</MenuItem>
                    <MenuItem value="Under Review">Under Review</MenuItem>
                  </Select>
                </FormControl>
              </MenuOption>
            </Menu>
          </>
        }
        title={
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{incident.description}</Typography>
            <Box display="flex" alignItems="center">
              <Chip label={incident.urgencyGrade} sx={{ mr: 1 }} />
              <Chip label={incident.status} />
            </Box>
          </Box>
        }
        subheader={new Date(incident.dateTime).toLocaleString()}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {incident.street}, {incident.city}, {incident.county} {incident.postalCode}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Classes:</strong> <Chip label={`${incident.majorClass} - ${incident.minorClass}`} />
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Description:</strong> {incident.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;
