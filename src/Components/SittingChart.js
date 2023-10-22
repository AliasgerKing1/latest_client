/* eslint-disable */
import React, { useEffect, useState } from 'react';
import NavLinks from './shared/NavLinks'
import { useSelector } from 'react-redux';
const SittingChart = () => {
  let state = useSelector(state=>state.alphabaticalSortReducer)
  let [participants, setParticipants] = useState([])
  useEffect(()=> {
    document.getElementById('zmmtg-root').style.display = 'none'
    let result = JSON.parse(localStorage.getItem('participants'))
    // console.log('unsorted',result)
    setParticipants(result)
  }, [])
  useEffect(()=> {
    if(participants.length > 0) {
      if(state == true) {
      const sortedParticipants = [...participants]?.sort((a, b) =>
                  a?.userName?.localeCompare(b?.userName)
                  );
                  // console.log('sorted particpants',sortedParticipants)
      setParticipants(sortedParticipants)
    }
    }
  }, [state])
  return (
    <>
          <div style={{zIndex : 22}}>
    <h1 style={{color : 'green'}}>Sitting Chart</h1>
      <NavLinks />
      <div className='row'>
      {participants?.map((userData) => (
        <div className='col-md-3'>
        <div className="card bg-dark text-light" key={userData.userName} style={{width: '18rem'}}>
        <img src="/assets/images/user.jpg" className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{userData.userName}</h5>
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