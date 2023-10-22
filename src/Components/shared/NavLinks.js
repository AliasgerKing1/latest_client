/* eslint-disable */
import React from 'react'
import { NavLink } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {alphabaticalSortDataRed} from '../../Redux/alphabaticalSortReducer'
const NavLinks = () => {
  let dispatch = useDispatch()
  let sortAlphabaticalOrderFun = () => {
    dispatch(alphabaticalSortDataRed())
  }
  return (
    <>
   <nav className="navbar navbar-expand-lg bg-body-dark navbar-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Clap</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
        <NavLink to='/' className="nav-link" aria-current="page">Sitting Chart</NavLink>
        </li>
        <li className="nav-item">
        <NavLink to='/meeting' className="nav-link">Meeting</NavLink>
        </li>
        <li className="nav-item">
        <a className="nav-link cursor-pointer" onClick={sortAlphabaticalOrderFun} style={{cursor: 'pointer'}}>Alphabatical Order</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}

export default NavLinks