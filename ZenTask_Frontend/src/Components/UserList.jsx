import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Avatar, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getUserList } from '../Redux/AuthSlice';
import { assignedTaskToUSer } from '../Redux/TaskSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'black',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function UserList({ id, handleClose, open }) {

  const dispatch = useDispatch()
  const auth  =useSelector(store=>store.auth)


  const handleAssignUser= (userId)=>{
    console.log("Hello")
    dispatch(assignedTaskToUSer({userId:userId,taskId:id}))
    console.log("Bye")
    handleClose()
  }
 
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {auth.users.map((item) => (
            <div
              key={item.id} 
              className="flex items-center justify-between w-full p-4 bg-gray-800 rounded-lg mb-4"
            >
              <div className="flex items-center">
                <ListItem>
                  <ListItemAvatar>
                    <Avatar />
                  </ListItemAvatar>
                  <ListItemText 
                    primary={<span className="text-white">{item.fullName}</span>} 
                    secondary={<span className="text-gray-400">{`@${item.fullName.split(' ').join('_').toLowerCase()}`}</span>}
                  />
                </ListItem>
              </div>
              <Button onClick={()=>handleAssignUser(item.id)} className="bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none">
                Select
              </Button>
            </div>
          ))}
        </Box>
      </Modal>
    </div>
  );
}
