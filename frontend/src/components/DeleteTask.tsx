import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import { Navigate } from 'react-router-dom';

interface DeleteTaskProps {
  idtask: string; 
}

interface State {
  status: boolean;
}

class DeleteTask extends Component<DeleteTaskProps, State> {
  state: State = {
    status: false
  };

  deleteTaskItem = () => {
    const { idtask } = this.props;
    let request = "TaskItem/" + idtask;
    let url = Global.urlApiTask + request;
    axios.delete(url).then(() => {
        console.log("Deleted task");
        this.setState({ status: true });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div>
        {this.state.status ? (
          <Navigate to="/" />
        ) : (
          <div>
            <h1>¿Deseas eliminar esta tarea?</h1>
            <button onClick={() => this.deleteTaskItem()}>Confirmar eliminación</button>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteTask;