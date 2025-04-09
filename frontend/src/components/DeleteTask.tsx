import React, { Component } from 'react'
import axios from 'axios';
import Global from './Global';
import { Navigate } from 'react-router-dom';
import './../styles/delete.scss';

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
          <div className="delete-task-container">
            <div className="delete-icon">🗑️</div>
            <h1>¿Deseas eliminar esta tarea?</h1>
            <p>Esta acción no se puede deshacer y la tarea será eliminada permanentemente.</p>
            
            <div className="buttons-container">
              <button className="btn-danger" onClick={() => this.deleteTaskItem()}>
                Confirmar eliminación
              </button>
              <button className="btn-cancel" onClick={() => this.setState({ status: true })}>
                Cancelar
              </button>
            </div>
            
            <p className="warning-message">
              Nota: Los datos eliminados no podrán ser recuperados.
            </p>
          </div>
        )}
      </div>
    );
  }
}

export default DeleteTask;