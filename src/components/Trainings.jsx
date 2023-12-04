import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import AddTraining from "./AddTraining";


export default function Trainings() {
  const [trainings, setTrainings] = useState([]);
  const gridOptionsRef = useRef(null);

  const fetchData = () => {
    fetch('https://traineeapp.azurewebsites.net/gettrainings')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok!');
        }
        return response.json();
      })
      .then(data => {
        const updatedTrainings = data.map(training => ({
          ...training,
          date: dayjs(training.date).format("DD.MM.YYYY HH:mm"),
        }));
        setTrainings(updatedTrainings);
        console.log(updatedTrainings);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const deleteTraining = (trainingId) => {
    const confirmation = window.confirm("Are you sure that you want to delete this training session?");
    fetch(`https://traineeapp.azurewebsites.net/api/trainings/${trainingId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          console.log('Training deleted successfully');
          // Päivitä tila, joka laukaisee komponentin uudelleenrenderoinnin
          setTrainings(prevTrainings => prevTrainings.filter(training => training.id !== trainingId));
          // Päivitä myös AgGridReact-komponentti
          const api = gridOptionsRef.current && gridOptionsRef.current.api;
          if (api) {
            api.refreshCells();
          }
        } else {
          console.error('Failed to delete training');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  const columns = [
    {
      field: "id",
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
            onClick={() => deleteTraining(params.data.id)}>
            Delete
          </Button>
        )
      }
    },
    { field: "date" },
    { field: "duration" },
    { field: "activity" },
    {
      headerName: "Customer",
      valueGetter: (params) => {
        return params.data.customer && params.data.customer.firstname
          ? params.data.customer.firstname + ' ' + params.data.customer.lastname
          : 'N/A';
      },
    },
  ];

  return (
    <div>
      <h4>Trainings</h4>
      
      <div className="ag-theme-material"
        style={{ height: '700px', width: '1000px', margin: 'auto' }} >
        <AgGridReact
          rowData={trainings}
          columnDefs={columns}
          defaultColDef={{
            sortable: true,
            filter: true,
            floatingFilter: true,
          }}
          onGridReady={(params) => {
            gridOptionsRef.current = params.api;
          }}
        >
        </AgGridReact>
      </div>
    </div>
  )
}
