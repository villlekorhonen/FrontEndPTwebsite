import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Home from './components/Home.jsx';
import Customers from './components/Customers.jsx';
import Trainings from './components/Trainings.jsx';
import Calendar from './components/Calendar.jsx';
import StatsSite from './components/StatsSite.jsx';



const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children: [
      {
        element: <Home />,
        index: true
      },
      {
        path: "customers",
        element: <Customers />,
      },
      {
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "statssite",
        element: <StatsSite />,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
