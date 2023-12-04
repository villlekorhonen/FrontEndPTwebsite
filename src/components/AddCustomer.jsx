import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

export default function AddCustomer(props) {
    const [open, setOpen] = React.useState(false);
    const [customer, setCustomer] = useState({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: ""
    }) 

    const { saveCustomer } = props;

    const handChangeInput = event => {
        setCustomer({...customer, [event.target.name]: event.target.value })
    }

    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () =>  {
        saveCustomer(customer);
        setOpen(false);
    }

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen} style={{ color: 'white', backgroundColor:'#262626', borderColor: '#262626', marginBottom: 10 }}>
            Add new customer
        </Button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="firstname"
                name="firstname"
                label="Firstname"
                type="text"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />

                <TextField
                autoFocus
                margin="dense"
                id="lastname"
                name="lastname"
                label="Lastname"
                type="text"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />
                <TextField
                autoFocus
                margin="dense"
                id="streetaddress"
                name="streetaddress"
                label="Streetaddress"
                type="text"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />
                <TextField
                autoFocus
                margin="dense"
                id="postcode"
                name="postcode"
                label="Postcode"
                type="number"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />
                <TextField
                autoFocus
                margin="dense"
                id="city"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />
                <TextField
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="text"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />
                <TextField
                autoFocus
                margin="dense"
                id="phone"
                name="phone"
                label="Phone"
                type="number"
                fullWidth
                variant="standard"
                onChange={event => handChangeInput(event)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSave}>Add</Button>
                
            </DialogActions>
        </Dialog>

        </div>
    )

}