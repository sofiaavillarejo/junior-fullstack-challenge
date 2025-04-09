import React, { Component } from "react";
import axios from "axios";
import Global from "./Global";
import { Navigate } from "react-router-dom";
import './../styles/updatepriority.scss';

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
        console.error("Error: ", error);
      });
  };

  render() {
    if (this.state.status) {
      return <Navigate to="/" />;
    }

    return (
      <div className="update-priority-container">
        <h1>Update Priority Task {this.props.priority}</h1>
        <div>
          <p>Select the new priority:</p>
          <select
            value={this.state.priority}
            onChange={this.handlePriorityChange}
            className="form-control"
          >
            <option value={1}>1 - Low</option>
            <option value={2}>2</option>
            <option value={3}>3 - Mid</option>
            <option value={4}>4</option>
            <option value={5}>5 - High-priority</option>
          </select>
          <br />
          <button className="btn btn-warning" onClick={this.handleUpdatePriority}>
            Confirmar
          </button>
        </div>
      </div>
    );
  }
}

export default UpdatePriority;
