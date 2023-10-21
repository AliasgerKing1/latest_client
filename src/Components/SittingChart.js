/* eslint-disable */
import React from 'react';
import NavLinks from './shared/NavLinks'
const SittingChart = () => {
  let tempArray = [
    {
      name : 'Aliasger',
    },
    {
      name : 'Jafarusadiq',
    }
  ]
  return (
    <>
          <div style={{zIndex : 22}}>
    <h1 style={{color : 'green'}}>Sitting Chart</h1>
      <NavLinks />
      <div className='row'>
      {tempArray?.map((userData) => (
        <div className='col-md-3'>
        <div className="card bg-dark text-light" key={userData.name} style={{width: '18rem'}}>
        <img src="/assets/images/user.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{userData.name}</h5>
          <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
        </div>
        </div>
      ))}
      </div>
</div>
    </>
  )
}

export default SittingChart