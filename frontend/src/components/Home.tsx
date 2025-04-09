import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { Navigate, NavLink } from 'react-router-dom';
import './../styles/home.scss';

interface TaskItem {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  isCompleted: boolean;
  priority: number;
}

interface State {
  tasks: TaskItem[];
}

export default class Home extends Component<{}, State> {
  state: State = {
    tasks: [],
  };

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

  isCompletedTask = (idtask: number) => {
    console.log(idtask);
    const url = `${Global.urlApiTask}TaskItem/${idtask}/complete`;
    axios.put(url, {}, { headers: { "Content-Type": "application/json" } })
      .then((response) => {
        console.log(`Task ${idtask} completed!`);
        this.getAllTasks();
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  }

  componentDidMount(): void {
    this.getAllTasks();
  }

  render() {
    return (
      <div className="task-container">
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
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {this.state.tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.name}</td>
                <td>{task.description}</td>
                <td>{task.dueDate}</td>
                <td className="priority-link">
                  {task.priority}
                  <NavLink to={`/updatepriority/${task.id}/${task.priority}`}>⚙️</NavLink>
                </td>
                <td className={task.isCompleted ? 'task-completed' : 'task-pending'} onClick={() => this.isCompletedTask(task.id)}>
                  {task.isCompleted ? "Completed" : "Pending"}
                  <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={() => this.isCompletedTask(task.id)}
                    className="task-checkbox"
                  />
                </td>
                <td><NavLink to={"/deletetask/" + task.id} className="delete-link">🗑️</NavLink></td>
                <td><NavLink to={"/details/" + task.id}>Details</NavLink></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
