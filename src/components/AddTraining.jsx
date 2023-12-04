import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AddTraining(props) {
  const [open, setOpen] = React.useState(false);
  const [newTraining, setNewTraining] = useState({
    date: "",
    duration: "",
    activity: "",
    customer: props.customer && props.customer ? props.customer.id : "",
  });

  const handleChangeInput = (event) => {
    setNewTraining({ ...newTraining, [event.target.name]: event.target.value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    console.log(newTraining);
    if (newTraining.date && newTraining.duration && newTraining.activity) {
      props.saveTraining(newTraining);
      setOpen(false);
    } else {
      
      console.error("Kaikki tiedot eivät ole täytetty");
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen} style={{ color: 'black', backgroundColor:'lightgreen', borderColor: '#262626', marginBottom: 10 }}>
        New Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Training</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="date"
            name="date"
            label="Date"
            type="date" 
            fullWidth
            variant="standard"
            onChange={event => handleChangeInput(event)}
          />

          <TextField
            autoFocus
            margin="dense"
            id="duration"
            name="duration"
            label="Duration (minutes)" 
            type="number"
            fullWidth
            variant="standard"
            onChange={event => handleChangeInput(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="activity"
            name="activity"
            label="Activity"
            type="text"
            fullWidth
            variant="standard"
            onChange={event => handleChangeInput(event)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="customer"
            name="customer"
            label="Customer"
            type="text"
            disabled={props.customer !== undefined} 
            fullWidth
            variant="standard"
            value={props.customer ? `${props.customer.firstname} ${props.customer.lastname}` : ""} 
            onChange={event => handleChangeInput(event)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
