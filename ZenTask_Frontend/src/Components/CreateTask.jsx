import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { useDispatch } from "react-redux";
import { createTask } from "../Redux/TaskSlice";
import { TbRuler } from "react-icons/tb";

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

export default function CreateTask({ handleClose, open }) {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    title: "",
    image: "",
    description: "",
    tags: [],
    deadline: new Date(),
  });
  const [selectedTags, setSelectedTags] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (e, value) => {
    setSelectedTags(value);
    setFormData({
      ...formData,
      tags: value,
    });
  };

  const handelDeadlineChange = (date) => {
    setFormData({
      ...formData,
      deadline: date,
    });
  };

  const formateDate = (input)=>{
      let{
        $y:year,
        $M:month,
        $D:day,
        $H:hours,
        $m:minutes,
        $s:seconds,
        $ms:milliseconds,
      } = input

      const date = new Date(year,month,day,hours,minutes,seconds,milliseconds)
      const formatedDate = date.toISOString()
      return formatedDate
  }
  const handelSubmit = (e) => {
    e.preventDefault();
    const {deadline} = formData
    formData.deadline=formateDate(deadline)
    formData.tags = selectedTags
    dispatch(createTask(formData))
    console.log("formData", formData,"deadline:",formData.deadline); 
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
                  label="Title"
                  fullWidth
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 item="true" xs={12}>
                <TextField
                  label="Image"
                  fullWidth
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 item="true" xs={12}>
                <TextField
                  label="Description"
                  fullWidth
                  multiline
                  rows={4}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </Grid2>
              <Grid2 item="true" xs={12}>
                <Autocomplete
                  multiple
                  id="multiple-limit-tags"
                  options={tags}
                  onChange={handleTagsChange}
                  getOptionLabel={(option) => option}
                  renderInput={(params) => (
                    <TextField label="Tags" fullWidth {...params} />
                  )}
                />
              </Grid2>
              <Grid2 item="true" xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    className="w-full"
                    onChange={handelDeadlineChange}
                    label="Deadline"
                   
                    textField={<TextField />}
                  />
                </LocalizationProvider>
              </Grid2>
              <Grid2 item="true" xs={12}>
                <Button
                  fullWidth
                  className="customButton"
                  type="submit"
                  sx={{ padding: ".9rem" }}
                >
                  Create task
                </Button>
              </Grid2>
            </Grid2>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
