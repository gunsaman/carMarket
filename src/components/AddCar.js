import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function AddCar(props) {

    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({
        brand:'', 
        model:'', 
        color:'', 
        fuel:'',
        price:'',
        year:''
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const inputChanged =(event)=> {
        setCar({...car, [event.target.name]:event.target.value})

    }


    const handleSave =()=> {
        
        props.addCar(car);
        handleClose();
    }
  
    return (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add New Car
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">New Car</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                name ="brand"
                value={car.brand}
                onChange={inputChanged}
                margin="dense"
                label="Brand"
                fullWidth
                />
                <TextField
                name ="model"
                value={car.mobel}
                onChange={inputChanged}
                margin="dense"
                label="Model"
                fullWidth
                />
                <TextField
                name ="color"
                value={car.color}
                onChange={inputChanged}
                margin="dense"
                label="Color"
                fullWidth
                />
                <TextField
                name ="fuel"
                value={car.fuel}
                onChange={inputChanged}
                margin="dense"
                label="Fuel"
                fullWidth
                />
                <TextField
                name ="year"
                value={car.year}
                onChange={inputChanged}
                margin="dense"
                label="Year"
                fullWidth
                />
                <TextField
                name ="price"
                value={car.price}
                onChange={inputChanged}
                margin="dense"
                label="Price"
                fullWidth
                />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Disagree
              </Button>
              <Button onClick={handleSave} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}