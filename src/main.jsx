import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import React from 'react'
import App from './App.jsx'
import { CustomerList } from './components/customers/CustomerList.jsx'
import { TrainingList } from './components/trainings/TrainingList.jsx'
import { Calendar } from './components/Calendar.jsx'
import { Routes, Route } from 'react-router-dom'
import TrainingChart from './components/trainings/TrainingChart.jsx'

// Start the app by rendering the root component
createRoot(document.getElementById('root')).render(
  <React.StrictMode> {/* HashRouter is used to manage pare URLs */}
    <HashRouter>
      <Routes>
        
        <Route path="/" element={<App />} errorElement={<Error />}> {/* Main route that shows the App layout */}
         
          <Route path="customers" element={<CustomerList />} /> {/* When URL is #/customers, show CustomerList */}
          <Route path="trainings" element={<TrainingList />} /> {/* When URL is #/trainings, show TrainingList */}
          <Route path="calendar" element={<Calendar />} /> {/* When URL is #/calendar, show Calendar */}
          <Route path='charts' element={<TrainingChart />} /> {/* When URL is #/charts, show TrainingChart */}
          
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
)
