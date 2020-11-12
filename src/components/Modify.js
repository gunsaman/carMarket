import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';

export default function Modify(props) {

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
        console.log(props.params)
        setCar({
            brand: props.params.data.brand,
            model: props.params.data.model,
            color: props.params.data.color,
            fuel: props.params.data.fuel,
            price: props.params.data.price,
            year: props.params.data.year,
        })
         setOpen(true);
    };
  
    const handleClose = () => {
         setOpen(false);
    };

    const inputChanged =(event)=> {
        setCar({...car, [event.target.name]:event.target.value})

    }


    const updateCar =()=> {        
        props.updateCar(props.params.value, car);
        handleClose();
    }
  
    return (
        <div>
          <Button size="small"  color="primary" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Edit Car</DialogTitle>
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
                value={car.model}
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
              <Button onClick={updateCar} color="primary" autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}