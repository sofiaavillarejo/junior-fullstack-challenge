import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import './../styles/create.scss';

interface TaskItem{
  name: string;
  description: string;
  dueDate: Date;
  priority: number;
  status: boolean;
}

interface State {
  status: boolean;
}

export default class CreateTask extends Component {
  boxName = React.createRef<HTMLInputElement>();
  boxDescription = React.createRef<HTMLInputElement>();
  boxDueDate = React.createRef<HTMLInputElement>();
  boxPriority = React.createRef<HTMLInputElement>();
  state: State = {
    status: false
  };

  createTask = (e: React.FormEvent) => {
    e.preventDefault();
    const name = this.boxName.current!.value || ''; 
    const description = this.boxDescription.current!.value || '';
    const dueDate = this.boxDueDate.current!.value || '';

    const task: TaskItem = {
      name,
      description,
      dueDate: new Date(),
      priority: 1,
      status: false
    };
    
    const request = "TaskItem";
    const url = Global.urlApiTask + request;
    axios.post<TaskItem>(url,task).then(response => {
      console.log('Created task');
      this.setState({
        status: true
      });
    }).catch(error => {
      console.error('Error:', error);
    });
  };

  render() {
    return (
      <div className="task-form-container">
        {this.state.status && <Navigate to="/" />}
        <form className="form-control" onSubmit={this.createTask}>
          <h1>Crear Tarea</h1>
          
          <label htmlFor="task-name">Nombre:</label>
          <input id="task-name" ref={this.boxName} className="form-control" type="text" />
  
          <label htmlFor="task-description">Descripción:</label>
          <input id="task-description" ref={this.boxDescription} className="form-control" type="text" />
  
          <label htmlFor="task-date">Fecha de vencimiento:</label>
          <input id="task-date" ref={this.boxDueDate} className="form-control" type="date" />
          <hr />
          <button type="submit" className="btn btn-primary">Crear Tarea</button>
        </form>
      </div>
    );
  }
}