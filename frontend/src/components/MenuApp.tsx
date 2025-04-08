import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export default class MenuApp extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark" aria-label="Third navbar example">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">Tasks</NavLink>
            <div className="collapse navbar-collapse" id="navbarsExample03">
              <ul className="navbar-nav me-auto mb-2 mb-sm-0">
                <li className="nav-item">
                  <NavLink className="nav-link active" aria-current="page" to="/">Task List</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/createtask">Crear tarea</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}