import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

const localizer = momentLocalizer(moment);

const CustomCalendar = () => {
  const [trainings, setTrainings] = useState([]);

  const fetchData = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok!");
        }
        return response.json();
      })
      .then((data) => {
        const validTrainings = data.filter(training => dayjs(training.date).isValid());
        const updatedTrainings = validTrainings.map((training) => ({
          id: training.id,
          title: training.activity,
          start: new Date(training.date),
          end: dayjs(training.date).add(training.duration, 'minutes').toDate(),
        }));
        setTrainings(updatedTrainings);
        
      })
      .catch((error) => {
        console.error(error);
      });
  };
  

  useEffect(() => {
    fetchData();
  }, []); 
  console.log("Trainings testi:", trainings);

  return (
    <div>
      <h5>Calendar</h5>
      <Calendar
        localizer={localizer}
        events={trainings}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 1000, marginLeft: 230  }}
      />
    </div>
  );
};

export default CustomCalendar;
