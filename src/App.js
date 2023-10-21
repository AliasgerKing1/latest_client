/* eslint-disable */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Meeting from './Components/Meeting'
import SittingChart from './Components/SittingChart'
let App = () => {
  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<SittingChart />}/>
      <Route path='/meeting' element={<Meeting />}/>
    </Routes>
    </div>
  );
}

export default App;
