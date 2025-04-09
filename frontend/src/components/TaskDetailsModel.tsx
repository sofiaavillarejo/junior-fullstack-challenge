import React from "react";
import './../styles/detailsmodal.scss';

interface Props {
  task: {
    name: string;
    description: string;
    dueDate: string;
    isCompleted: boolean;
    priority: number;
  };
  onClose: () => void;
}

const TaskDetailsModal: React.FC<Props> = ({ task, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{task.name}</h2>
        <p>{task.description}</p>
        <p>Fecha Límite: {task.dueDate}</p>
        <p>Prioridad: {task.priority}</p>
        <p>Estado: {task.isCompleted ? "Completed" : "Pending"}</p>
        <button className="btnClose" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default TaskDetailsModal;
