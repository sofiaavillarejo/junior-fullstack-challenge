import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';

interface TaskItem {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority?: number;
}

interface State {
  tasks: TaskItem[];
}

export default class Home extends Component {
  state: State = {
    tasks: []
  }

  getAllTasks = () => {
    const request = "TaskItem";
    const url = Global.urlApiTask + request;
    axios.get<TaskItem[]>(url).then(response => {
      console.log(response.data);
      this.setState({
        tasks: response.data
      });
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    })
  }

  componentDidMount(): void {
    this.getAllTasks();
  }

  render(){
    return (
      <div>
        <h1>Task List</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Completed</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <NavLink to={`/updatepriority/${task.id}/${task.priority}`}>{task.priority} Cambiar prioridad</NavLink>
                <td>{task.isCompleted ? 'Yes' : 'No'}</td>
                <td><NavLink to={"/deletetask/" + task.id }>Borrar</NavLink></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
