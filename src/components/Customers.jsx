import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import ExportExcel from "./ExportExcel";


export default function Customers() {
    const [customers, setCustomers] = useState([]);

    const fetchData = () => {
        fetch('http://traineeapp.azurewebsites.net/api/customers')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok!');
                }
                return response.json();
            })
            .then(data => {
                setCustomers(data.content);
            })
            .catch(error => {
                console.error(error);
            });
    }

    
    const deleteCustomer = (href) => {
        const confirmation = window.confirm("Do you want to delete this customer?");
    
        if (confirmation) {
            console.log("Poistetaan resurssi: ", href);
            const options = {
                method: 'delete',
            };
            fetch(href, options)
                .then(response => fetchData())
                .catch(error => console.error(error));
        } else {
            
        }
    }

    const saveCustomer = customer => {
        const options = {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        }
        fetch('http://traineeapp.azurewebsites.net/api/customers', options)
            .then(response => fetchData())
            .catch(error => console.error(error));
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: "put",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(response => fetchData())
            .catch(error => console.error(error));
    }

   
    const saveTraining = (training) => {
        console.log('Training data:', training);
        if (!training || !training.date || !training.duration || !training.activity) {
            console.error('Kaikki tiedot eivät ole täytetty.');
            return;
        }
    
        // Tarkista, että asiakkaan id on käytettävissä
        if (!training.customer || !training.customer.id) {
            console.error('Asiakkaan id ei ole saatavilla.');
            return;
        }
    
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(training),
        };
    
        fetch(`http://traineeapp.azurewebsites.net/api/customers/${training.customer.id}/trainings`, options)
            .then(response => fetchData())
            .catch(error => console.error(error));
    }
      
      
  
  
      

    useEffect(() => {
        fetchData();
    }, []);

    const columns = [
        { 
            
            sortable: false,
            filter: false,
            floatingFilter: false,
            width: 180,
            cellRenderer: (params) => {
                console.log("Asiakastiedot:", params.data);
                return <AddTraining customer={params.data} saveTraining={saveTraining} />;
                
            }
        },
        { field: "firstname" },
        { field: "lastname" },
        { field: "streetaddress" },
        { field: "postcode" },
        { field: "city" },
        { field: "email" },
        { field: "phone" },
        {
            
            sortable: false,
            filter: false,
            floatingFilter: false,
            width: 100,
            cellRenderer: params => {
                return (
                    <EditCustomer customer={params.data} updateCustomer={updateCustomer} />
                )
            }
        },
        {
            field: "links.rel.href",
            headerName: "",
            sortable: false,
            filter: false,
            floatingFilter: false,
            width: 100,
            cellRenderer: params => {
                return (
                    <Button
                        variant="text"
                        color="secondary"
                        style={{ color: 'white', backgroundColor:'red', borderColor: '#262626' }}
                        onClick={() => deleteCustomer(params.data.links[1].href)}>
                        Delete
                    </Button>
                    
                )
                
            }
        }

    ];

    return (
        <div>
            <h3>Customers</h3>
            <AddCustomer saveCustomer={saveCustomer} />
            <ExportExcel customers={customers} />
            <div className="ag-theme-material"
                style={{ height: '700px', width: '90%', margin: 'auto' }} >
                <AgGridReact
                    rowData={customers}
                    columnDefs={columns}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        floatingFilter: true,
                    }}
                >
                </AgGridReact>
            </div>
        </div>
    )
}