
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import { div } from 'framer-motion/client'
import LoginSignup from './Components/Auth/LoginSignUp'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchTasks } from './Redux/TaskSlice';
import { getUserProfile } from './Redux/AuthSlice';


function App() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);
const auth = useSelector((state) => state.auth);

  
  useEffect(()=>{
    dispatch(getUserProfile(auth.jwt || localStorage.getItem("jwt")))
    dispatch(fetchTasks({}));
  },[auth.jwt])

  const user = true;
  
  return (
    <div>
      {auth.user ? (
        <div>
          <Navbar />
          <Home />
        </div>
      ) : (
        <div>
          <LoginSignup />
        </div>
      )}
    </div>
  );
}


export default App
