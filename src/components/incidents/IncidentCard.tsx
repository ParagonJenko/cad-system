import React, { useEffect, useState } from 'react';
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
  Box,
  Avatar,
  Menu,
  Chip,
  MenuItem as MenuOption,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import { MoreVert, Receipt } from '@mui/icons-material';
import { Incident, LogEntry } from '../../types';
import { SelectChangeEvent } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

interface IncidentCardProps {
  incident: Incident;
  updateStatus: (id: number, status: Incident['status']) => void;
  updateUrgency: (id: number, urgency: Incident['urgencyGrade']) => void;
  addLog: (id: number, log: LogEntry) => void;
}

const IncidentCard: React.FC<IncidentCardProps> = ({ incident, updateStatus, updateUrgency, addLog }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [timeAgo, setTimeAgo] = useState(formatDistanceToNow(new Date(incident.timestamp)));
  const [newLog, setNewLog] = useState('');
  const [showAllLogs, setShowAllLogs] = useState(false);

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

  const handleAddLog = () => {
    if (newLog.trim() !== '') {
      const logEntry: LogEntry = {
        timestamp: new Date().toISOString(),
        message: newLog.trim()
      };
      addLog(incident.id, logEntry);
      setNewLog('');
    }
  };

  const toggleShowAllLogs = () => {
    setShowAllLogs(!showAllLogs);
  };

  // Define card color based on urgency grade
  const getCardColor = (urgencyGrade: Incident['urgencyGrade']) => {
    switch (urgencyGrade) {
      case 'I Grade':
        return '#ffcdd2'; // Light red
      case 'S Grade':
        return '#fff9c4'; // Light yellow
      case 'E Grade':
        return '#e0f7fa'; // Light cyan
      case 'R Grade':
        return '#bbdefb'; // Light blue
      default:
        return 'white';
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeAgo(formatDistanceToNow(new Date(incident.timestamp)));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [incident.timestamp]);

  // Reverse logs to show latest first
  const logsToShow = showAllLogs ? incident.logs : incident.logs.slice(0, 3);

  return (
    <Card sx={{ mb: 2, backgroundColor: getCardColor(incident.urgencyGrade) }}>
      <CardHeader
        avatar={
          <Avatar sx={{ color: getCardColor(incident.urgencyGrade) }}>
            <Receipt /> 
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
            <Typography variant="h6">{incident.urgencyGrade} - Incident Report</Typography>
            <Box display="flex" alignItems="center">
              <Chip label={incident.urgencyGrade} sx={{ mr: 1 }} />
              <Chip label={incident.status} />
            </Box>
          </Box>
        }
        subheader={`Reported ${timeAgo} ago`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Address:</strong> {incident.street}, {incident.city}, {incident.county} {incident.postalCode}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Classes:</strong> <Chip label={`${incident.majorClass} - ${incident.minorClass}`} />
        </Typography>
        {/* Logs */}
        <Typography variant="body2" color="text.secondary" gutterBottom>
          <strong>Logs:</strong>
        </Typography>
        <List>
          {logsToShow.reverse().map((log, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={<Typography style={{ whiteSpace: 'pre-line' }}>{log.message}</Typography>}
                  secondary={new Date(log.timestamp).toLocaleString()}
                />
              </ListItem>
              {index < incident.logs.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
        {incident.logs.length > 3 && (
          <Button onClick={toggleShowAllLogs}>
            {showAllLogs ? 'Show less' : 'Show more'}
          </Button>
        )}
        <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
          <TextField
            label="Add Log"
            value={newLog}
            onChange={(e) => setNewLog(e.target.value)}
            fullWidth
            multiline
            sx={{ mr: 2 }}
          />
          <Button variant="contained" onClick={handleAddLog}>
            Add
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default IncidentCard;
