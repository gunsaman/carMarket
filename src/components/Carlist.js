import React, {useState, useEffect, useRef} from 'react';
import {AgGridColumn, AgGridReact} from 'ag-grid-react';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import AddCar from './AddCar';
import Modify from './Modify';


export default function Carlist() {
    const [cars, setCars] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState('');
    const gridRef = useRef();
    useEffect(()=> {
        getCars();
    }, [])

    const deleteCar = (link) => {
        if(window.confirm('Are you sure?')) {
                    fetch(link, {
            method: 'DELETE'
        })
        .then(_ => gridRef.current.refreshCells({rowNodes: getCars()})) 
        .then(_=> {
            setMsg('Car was deleted successfully');
            setOpen(true);
            })
        .catch(err => console.log(err))         
    }
    }
    const addCar =(newCar)=> {
        fetch('https://carstockrest.herokuapp.com/cars', {
            method:'POST',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify(newCar)
        })
        .then(_=> getCars())
        .then(_=> {
            setMsg('Car was added successfully');
            setOpen(true);
        })
        .catch(err=> console.error(err))

    }
    
    const editCar = (link, car) => {
        fetch(link, {
            method:'PUT',
            headers: {'Content-type': 'application/json'},
            body:JSON.stringify(car)
        })
            .then(_ => getCars())
            .catch(err => console.error(err))
    }

    const handleClose =() => {
        setOpen(false);
    }


    const columns = [
        {headerName: 'Brand', field: 'brand', sortable: true, filter:true},
        {headerName: 'Model', field: 'model', sortable: true, filter:true},
        {headerName: 'Color', field: 'color', sortable: true, filter:true},
        {headerName: 'Fuel', field: 'fuel', sortable: true, filter:true},
        {headerName: 'Year', field: 'year', sortable: true, filter:true, width: 120},
        {headerName: 'Price', field: 'price', sortable: true, filter:true, width:120},
        {
            headerName: '',
            width:70,
            field:'_links.self.href',
            cellRendererFramework: params => <Modify updateCar={editCar} params={params} /> 
        },
        {
            headerName: '', 
            field:'_links.self.href',
            width: 70,
            cellRendererFramework: params => <Button 
                                            color="secondary" 
                                            size="small" 
                                            onClick={()=> deleteCar(params.value)}>Delete
                                            </Button>
        }
    ]
    //fetch cars from backend
    const getCars = () => {
        fetch('https://carstockrest.herokuapp.com/cars')
        .then(response => response.json())
        .then(data => setCars(data._embedded.cars))
        .catch(err => console.log(err))
    };
    return (
        <div>
            <AddCar addCar= {addCar} />
            <div className="ag-theme-material" style = {{height:'700px', width: '100%', margin:'auto'}}>
                <AgGridReact 
                    ref={gridRef}
                    onGridReady = { params => {
                        gridRef.current = params.api
                        params.api.sizeColumnsToFit()
                    }}
                    columnDefs={columns}
                    suppressCellSelection={true}
                    rowData={cars}
                    pagination={true}
                    paginationPageSize={10}
                >
                </AgGridReact>
                <Snackbar
                    anchorOrigin={{ vertical:'top', horizontal:'center' }}
                    open={open}
                    autoHideDuration= {5000}
                    onClose ={handleClose}
                    message={msg}
                />
                <p>Welcome to CarShop</p>
            </div>
        </div>
    );
}