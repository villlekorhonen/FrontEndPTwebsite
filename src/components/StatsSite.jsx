import React, { useState, useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import Stats from "./Stats";

export default function StatsSite() {
  const [trainings, setTrainings] = useState([]);
  

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
      
      <Stats trainings={trainings} />
      
    </div>
  )
}
