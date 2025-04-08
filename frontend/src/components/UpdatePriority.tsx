import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate } from "react-router-dom";

interface Props {
  idtask: string;
  priority: number;
}

interface State {
  priority: number;
  status: boolean;
}

class UpdatePriority extends Component<Props, State> {
  state: State = {
    priority: this.props.priority, 
    status: false,  
  };

  handlePriorityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      priority: parseInt(event.target.value),
    });
  };

  handleUpdatePriority = () => {
    const { idtask } = this.props;
    const { priority } = this.state;

    const url = `${Global.urlApiTask}TaskItem/${idtask}/priority`;
    const taskToUpdate = { priority };

    axios.put(url, taskToUpdate).then(() => {
        console.log("Priority updated");
        this.setState({ status: true }); 
      })
      .catch((error) => {
        console.error("Error", error);
      });
  };

  render() {
    if (this.state.status) {
      return <Navigate to="/" />; 
    }

    return (
      <div>
        <h1>Actualizar Prioridad</h1>
        <div>
          <p>Selecciona la nueva prioridad:</p>
          <select
            value={this.state.priority}
            onChange={this.handlePriorityChange} 
            className="form-control"
          >
            <option value={1}>1 - Baja</option>
            <option value={2}>2</option>
            <option value={3}>3 - Media</option>
            <option value={4}>4</option>
            <option value={5}>5 - Urgente</option>
          </select>
          <br />
          <button className="btn btn-warning" onClick={this.handleUpdatePriority}>
            Confirmar Cambio de Prioridad
          </button>
        </div>
      </div>
    );
  }
}

export default UpdatePriority;
