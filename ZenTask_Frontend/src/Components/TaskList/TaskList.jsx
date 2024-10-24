
import React, { useEffect } from "react";
import TaskCard from "../TaskCard/TaskCard";
import { useDispatch, useSelector } from "react-redux";
import {fetchTasks,fetchUserTasks} from "../../Redux/TaskSlice";

import store from "../../Redux/store";
import { useLocation } from "react-router-dom";




const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
  const auth = useSelector((state) => state.auth);
  
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const filterValue = queryParams.get("filter")
  // console.log(filterValue)
 
  useEffect(()=>{
     
    if(auth.user?.role==="ROLE_ADMIN"){
      dispatch(fetchTasks({status:filterValue}));
    }
    else{
      dispatch(fetchUserTasks({status:filterValue}))
    }
    
  },[filterValue])
  
  const taskList = auth.user?.role === "ROLE_ADMIN" ? tasks.tasks : tasks.userTasks; 
 
  return (
    <div className="grid grid-rows-4 gap-4 h-full">
      {taskList.map((task, index) => (
        <TaskCard key={index} task={task} />
      ))}
    </div>
  );
};

export default React.memo(TaskList);
