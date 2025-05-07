import { useState, useEffect } from 'react'
import { getCustomers } from './api/customerApi';
import { getTrainings } from './api/trainingApi';
import { CustomerList } from './components/customers/CustomerList';
import { TrainingList } from './components/trainings/TrainingList';
import { Calendar } from './components/Calendar';
import { Link, Outlet } from 'react-router-dom';
import { Container, CssBaseline, AppBar, Toolbar } from '@mui/material';


function App() {

  return (
    <>
      <Container>
        <CssBaseline />
        {/* Top navigation bar */}
        <AppBar position="static" sx={{ backgroundColor: '#8884d8'}}>
          <Toolbar>
            {/* Navigation links styled horizontally */}
            <nav style={{ display: "flex", gap: '1rem' }}>
              <Link to={"/customers"} style={{color: 'white', textDecoration: 'none'}}>Customers</Link>
              <Link to={"/trainings"} style={{color: 'white', textDecoration: 'none'}}>Trainings</Link>
              <Link to={"/calendar"} style={{color: 'white', textDecoration: 'none'}}>Calendar</Link>
              <Link to={"/charts"} style={{color: 'white', textDecoration: 'none'}}>Charts</Link>
            </nav>
          </Toolbar>
        </AppBar>
        {/* Outlet will render the matched child route here */}
        <Outlet />
      </Container>
    </>
  )
}


export default App
