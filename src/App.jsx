import {Link, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  

  return (
    <div className='App'>
      <h1>Personal Training by Ville</h1>
      <nav>
        <Link to={"/"}>Home</Link>
        <Link to={"/customers"}>Customers</Link>
        <Link to={"/trainings"}>Trainings</Link>
        <Link to={"/calendar"}>Calendar</Link>
        <Link to={"/statssite"}>Stats</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App

