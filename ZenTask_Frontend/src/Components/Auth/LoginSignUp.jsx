import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel,FormControl,InputLabel,Select,MenuItem } from '@mui/material';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, login, register ,} from '../../Redux/AuthSlice';


const LoginSignup = () => {
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true);
  const {auth}  = useSelector(store=>store.auth)

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const [formData,setFormData] = useState({
    email:"",
    password:"",
    fullName:"",
    role:""
  })

  const handleChange = (e)=>{
    const {name,value}= e.target 
    setFormData({
        ...formData,
        [name]:value
    })
  }

  const handleSubmit=(e)=>{
    console.log(formData)
    e.preventDefault()
    if(isLogin) {
      dispatch(login(formData))}
    else {
      dispatch(register(formData))
    }
  
  }

  return (
    <div className="flex h-screen bg-purple-700">
    
      <div className="w-1/2 bg-white flex flex-col justify-center items-center">
        <motion.div
          className="text-left space-y-4 p-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl font-bold text-purple-600">Hello, welcome!</h2>
          <p className="text-gray-500">Please {isLogin ? 'login' : 'sign up'} to continue</p>

     
          <form className="space-y-4" onSubmit={handleSubmit}>
  {!isLogin && (
    <>
      <TextField
        label="Full Name"
        name="fullName"
        variant="outlined"
        fullWidth
        className="mb-4"
        type="text"
        value={formData.fullName}
        onChange={handleChange}
      />
      <FormControl fullWidth variant="outlined" className="mb-4">
        <InputLabel>Role</InputLabel>
        <Select
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
        >
          <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
          <MenuItem value="ROLE_USER">User</MenuItem>
        </Select>
      </FormControl>
    </>
  )}
  <TextField
    label="Email address"
    name="email"
    variant="outlined"
    fullWidth
    className="mb-4"
    type="email"
    value={formData.email}
    onChange={handleChange}
  />
  <TextField
    label="Password"
    name="password"
    variant="outlined"
    fullWidth
    className="mb-4"
    type="password"
    value={formData.password}
    onChange={handleChange}
  />
  <FormControlLabel
    control={<Checkbox color="primary" />}
    label="Remember me"
  />
  <div className="flex justify-between">
    <Button
      variant="contained"
      color="primary"
      className="w-1/2"
      type="submit"
    >
      {isLogin ? "Login" : "Sign Up"}
    </Button>
    <Button onClick={toggleForm} className="w-1/2">
      {isLogin ? "Sign Up" : "Login"}
    </Button>
  </div>
</form>


          <p className="mt-4 text-gray-400">
            {isLogin ? 'Forgot password?' : 'Already have an account?'}
          </p>
          <div className="mt-4 flex space-x-4">
            <FaFacebook className="text-gray-500" />
            <FaTwitter className="text-gray-500" />
            <FaInstagram className="text-gray-500" />
          </div>
        </motion.div>
      </div>

   
      <div className="w-1/2 flex justify-center items-center bg-gradient-to-r from-purple-400 via-pink-500 to-purple-700">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
         
          <div className="relative h-full w-full">
            <div className="absolute h-[200px] w-[200px] bg-pink-500 rounded-full top-10 left-20"></div>
            <div className="absolute h-[250px] w-[250px] bg-purple-500 rounded-full bottom-20 right-20"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginSignup;
