import React, { Component } from 'react'
import Global from './Global';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import './../styles/home.scss';
import TaskDetailsModal from './TaskDetailsModel';

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
  filteredTasks: TaskItem[];
  detailsTask: TaskItem | null;
  showModal: boolean;
  searchQuery: string;
}

export default class Home extends Component<{}, State> {
  state: State = {
    tasks: [],
    filteredTasks: [],
    detailsTask: null,
    showModal: false,
    searchQuery: ''
  };

  getAllTasks = () => {
    const request = "TaskItem";
    const url = Global.urlApiTask + request;
    axios.get<TaskItem[]>(url).then(response => {
      this.setState({
        tasks: response.data,
        filteredTasks: response.data,
      });
    }).catch(error => {
      console.error('Error fetching tasks:', error);
    })
  };

  handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery }, () => {
      this.filterTasks(searchQuery);
    });
  };

  filterTasks = (searchQuery: string) => {
    const filteredTasks = this.state.tasks.filter(task =>
      task.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    this.setState({ filteredTasks });
  };

  isCompletedTask = (idtask: number) => {
    console.log(idtask);
    const url = `${Global.urlApiTask}TaskItem/${idtask}/complete`;
    axios.put(url, {}, { headers: { "Content-Type": "application/json" } }).then(response => {
      console.log(`Task ${idtask} completed!`);
      this.getAllTasks();
    }).catch(error => {
      console.error("Error: ", error);
    });
  }

  detailsTask = (idtask: number) => {
    const url = `${Global.urlApiTask}TaskItem/${idtask}`;
    axios.get<TaskItem>(url).then((response) => {
      this.setState({
        detailsTask: response.data,
        showModal: true,
      });
    });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount(): void {
    this.getAllTasks();
  }

  render() {
    const { filteredTasks, searchQuery } = this.state;
  
    return (
      <div className="task-container">
        <h1>Task List</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
          />
        </div>
        
        {this.state.tasks.length === 0 ? (
          <div className="empty-state-container">
            <div className="empty-state-content">
              <div className="empty-icon">📋</div>
              <h2>No Tasks Available</h2>
              <p>Your task list is currently empty. Create your first task to get started.</p>
              <NavLink to="/createtask" className="add-task-btn">Create New Task</NavLink>
            </div>
          </div>
        ) : (
          filteredTasks.length === 0 && searchQuery !== '' ? (
            <div className="empty-state-container">
              <div className="empty-state-content">
                <div className="empty-icon">🔎</div>
                <h2>No se ha encontrado ninguna tarea</h2>
                <p>No se ha encontrado ninguna tarea que coincida con tu búsqueda.</p>
              </div>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Priority</th>
                  <th>Completed</th>
                  <th>Delete</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task, index) => (
                  <tr key={index}>
                    <td>{task.id}</td>
                    <td>{task.name}</td>
                    <td>
                      <div className="priority-link">
                        {task.priority}
                        <NavLink to={`/updatepriority/${task.id}/${task.priority}`}>⚙️</NavLink>
                      </div>
                    </td>
                    <td>
                      <div className={task.isCompleted ? 'task-completed' : 'task-pending'}>
                        {task.isCompleted ? "Completed" : "Pending"}
                        <input
                          type="checkbox"
                          checked={task.isCompleted}
                          onChange={() => this.isCompletedTask(task.id)}
                          className="task-checkbox"
                        />
                      </div>
                    </td>
                    <td><NavLink to={"/deletetask/" + task.id} className="delete-link">🗑️</NavLink></td>
                    <td><button onClick={() => this.detailsTask(task.id)} className="details-btn">Details</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
  
        <div>
          {this.state.showModal && this.state.detailsTask && (
            <TaskDetailsModal task={this.state.detailsTask} onClose={this.closeModal} />
          )}
        </div>
      </div>
    );
  }
  
}
