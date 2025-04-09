import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Home from "./Home";
import { Component } from "react";
import MenuApp from "./MenuApp";
import CreateTask from "./CreateTask";
import DeleteTask from "./DeleteTask";
import UpdatePriority from "./UpdatePriority";

type Params = Record<string, string>;

function DeleteTaskItem() {
  const { idtask } = useParams<Params>();
  if (!idtask) {
    return <div>Task not found</div>;
  }

  return <DeleteTask idtask={idtask} />;
}

function UpdatePriorityTask(){
  const { idtask, priority  } =useParams<Params>();
  if (!idtask || !priority) {
    return <div>Task not found</div>;
  }
  const parsedPriority = parseInt(priority, 10);

  return <UpdatePriority idtask={idtask} priority={parsedPriority}/>
}
export default class Router extends Component {
  render(){
    return (
      <div>
        <BrowserRouter>
        <MenuApp/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/createtask' element={<CreateTask/>} />
            <Route path="/deletetask/:idtask" element={<DeleteTaskItem />} />
            <Route path="/updatepriority/:idtask/:priority" element={<UpdatePriorityTask />} /> 
          </Routes>
        </BrowserRouter>
      </div>
    )
  }
}