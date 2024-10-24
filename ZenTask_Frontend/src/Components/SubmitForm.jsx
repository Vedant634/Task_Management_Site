import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskById, updateTask } from "../Redux/TaskSlice";
import { submitTask } from "../Redux/SubmissionSlice";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const tags = ["Angular", "React", "Spring Boot"];

export default function SubmitForm({taskId, handleClose, open }) {
  
  const dispatch = useDispatch()

  const task = useSelector(store=>store.tasks)
  const auth = useSelector(store=>store.auth)
  const [formData, setFormData] = useState({
    githubLink: "",
    taskId:taskId,
    userId:auth.user.id
 
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  const handelSubmit = (e) => {
    e.preventDefault();
    
    dispatch(submitTask(formData))
    console.log("working")
    handleClose();
  };
 


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handelSubmit}>
            <Grid2 container spacing={2} alignItems="center">
            <Grid2 item="true" xs={12}>
                <TextField
                  label="githubLink"
                  fullWidth
                  name="githubLink"
                  value={formData.githubLink}
                  onChange={handleChange}
                />
              </Grid2>
              
             
              
              <Grid2 item="true" xs={12}>
                <Button
                  fullWidth
                  className="customButton"
                  type="submit"
                  sx={{ padding: ".9rem" }}
                >
                 Submit 
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
