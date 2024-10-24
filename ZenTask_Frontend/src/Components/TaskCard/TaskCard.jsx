import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from "@mui/material";
import { MoreVerticalIcon } from "lucide-react";
import UserList from '../UserList';
import SubmissionList from '../SubmissionList';
import EditTask from '../EditTask';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, fetchTaskById } from '../../Redux/TaskSlice';
import {fetchSubmissionByTaskId} from "../../Redux/SubmissionSlice"
import { getUserList } from '../../Redux/AuthSlice';
import SubmitForm from '../SubmitForm';

const TaskCard = ({task}) => {
  const {title,image,id,description,tags} = task
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch()
  const auth = useSelector(store=>store.auth)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [openUserList,setOpenUserList] = useState(false)
  const [openSubmissionList,setOpenSubmissionList] = useState(false)
  const [openSubmitForm,setOpenSubmitForm] = useState(false)
  const [openUpdateTask,setOpenUpdateTask] = useState(false)
  const handleCloseUserList=()=>{
    setOpenUserList(false)
}
  const handleOpenUserList=()=>{
        setOpenUserList(true)
        dispatch(getUserList(localStorage.getItem("jwt")));
        handleClose()
  }
  const handleCloseSubmitForm=()=>{
    setOpenSubmitForm(false)
}
  const handleOpenSubmitForm=()=>{
    setOpenSubmitForm(true)
    handleClose()
  }
  const handleCloseSubmissionList=()=>{
    setOpenSubmissionList(false)
}
  const handleOpenSubmissionList=()=>{
    setOpenSubmissionList(true)
    dispatch(fetchSubmissionByTaskId(task.id))
    handleClose()
  }
  const handleOpenUpdateTask=()=>{
    // const updatedParams = new URLSearchParams(location.search); 
 
    setOpenUpdateTask(true)
    dispatch(fetchTaskById(task.id))
    // updatedParams.set("taskId",id);
    // navigate(`${location.pathname}?${updatedParams.toString()}`)
    handleClose()
  }
  const handleCloseUpdateTask=()=>{
    setOpenUpdateTask(false)
}

  const handleDeleteTask=()=>{
    dispatch(deleteTask(id))
  }

  const role = "ROLE_ADMIN";

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 relative">
      <div className="flex items-center mb-2">
        <img src={image} alt="Task" className="w-12 h-12 rounded mr-4" />
        <div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm">{description}</p>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreVerticalIcon color="white" />
        </IconButton>

        <Menu
  id="basic-menu"
  anchorEl={anchorEl}
  open={open}
  onClose={handleClose}
  MenuListProps={{
    "aria-labelledby": "basic-button",
  }}
  anchorOrigin={{
    vertical: "bottom",
    horizontal: "right",
  }}
  transformOrigin={{
    vertical: "top",
    horizontal: "right",
  }}
  PaperProps={{
    style: {
      marginLeft: "-10px",
    },
  }}
>
  {auth.user.role === "ROLE_ADMIN" 
    ? [
        <MenuItem key="assign" onClick={handleOpenUserList}>
          Assign User
        </MenuItem>,
        <MenuItem key="submission" onClick={handleOpenSubmissionList}>
          See Submission
        </MenuItem>,
        <MenuItem key="edit" onClick={handleOpenUpdateTask}>
          Edit
        </MenuItem>,
        <MenuItem key="delete" onClick={handleDeleteTask}>
          Delete
        </MenuItem>
      ] 
    : [
        <MenuItem key="submit" onClick={handleOpenSubmitForm}>
          Submit
        </MenuItem>
      ]
  }
</Menu>

      </div>

      <div className="flex flex-wrap mt-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="bg-purple-700 text-white text-xs px-2 py-1 rounded-full mr-2 mb-2"
          >
            {tag}
          </span>
        ))}
      </div>
      <UserList
        id={task.id}
        open={openUserList}
        handleClose={handleCloseUserList}
      />
      <SubmissionList
        open={openSubmissionList}
        handleClose={handleCloseSubmissionList}
      />
      <EditTask
        item={task}
        open={openUpdateTask}
        handleClose={handleCloseUpdateTask}
      />
       <SubmitForm
        taskId={task.id}
        open={openSubmitForm}
        handleClose={handleCloseSubmitForm}
      />
    </div>
  );
};  

export default TaskCard;
