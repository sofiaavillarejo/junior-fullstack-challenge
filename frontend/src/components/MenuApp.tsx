import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import './../styles/menu.scss';

export default class MenuApp extends Component {
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Tasks</NavLink>
            <div className="navbar-collapse">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <NavLink 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                    to="/"
                  >
                    Task List
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink 
                    className={({isActive}) => isActive ? "nav-link active" : "nav-link"} 
                    to="/createtask"
                  >
                    Create new task
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}