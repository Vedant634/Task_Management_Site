import React, { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import {logout} from "../../Redux/AuthSlice";
import {
  Home,
  CheckCircle,
  ClipboardList,
  ClipboardX,
  Bell,
  PlusCircle,
  MessageCircle,
  LogOut,
} from "lucide-react";
import CreateTask from "../CreateTask";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {auth}  = useSelector(store=>store.auth)
  const [selected, setSelected] = useState("Home");
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const handleOpenCreateTask = () => {
    setOpenCreateTask(true);
  };
  const handleCloseCreateTask = () => {
    setOpenCreateTask(false);
  };

  const handeleMenuChange = (item) => {
    const updatedParams = new URLSearchParams(location.search);
    if (item.name === "Create Task") handleOpenCreateTask();
    else if(item.name=="Home"){
        updatedParams.delete("filter");
        const queryString = updatedParams.toString();
        const updatedPath = queryString 
                ? `${location.pathname}?${queryString}` 
                : location.pathname;
        navigate(updatedPath);

    }
    else{
        updatedParams.set("filter",item.value);
        navigate(`${location.pathname}?${updatedParams.toString()}`)
    }
    setSelected(item.name);
  };

  const handleLogout = ()=>{
    dispatch(logout())
  }
  const menuItems = [
    { name: "Home", icon: Home, roles: ["ROLE_ADMIN", "ROLE_CUSTOMER"], value: "HOME" },
    { name: "Done", icon: CheckCircle, roles: ["ROLE_ADMIN", "ROLE_CUSTOMER"], value: "DONE" },
    { name: "Assigned", icon: ClipboardList, roles: ["ROLE_ADMIN"], value: "ASSIGNED" },
    { name: "Not Assigned", icon: ClipboardX, roles: ["ROLE_ADMIN"], value: "PENDING" },
    // { name: "Notification", icon: Bell, roles: ["ROLE_ADMIN", "ROLE_CUSTOMER"], value: "NOTIFICATION" },
    { name: "Create Task", icon: PlusCircle, roles: ["ROLE_ADMIN"], value: "CREATE_TASK" }
  ];
  

  return (
    <motion.div
      className="h-[92vh] bg-gray-900 text-white p-4 flex flex-col"
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-8">
        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-gray-900 rounded-sm"></div>
        </div>
      </div>
      <div>
        <nav className="flex-grow">
          <ul>
            {menuItems.map((item) => (
              <motion.li
                key={item.name}
                className="mb-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a
                 
                  className={`flex items-center ${
                    selected === item.name ? "text-white" : "text-gray-400"
                  } hover:text-white ml-4 mb-6 text-xl`}
                  onClick={() => handeleMenuChange(item)}
                >
                  <item.icon className="mr-4" size={24} />
                  <span>{item.name}</span>
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
        <CreateTask open={openCreateTask} handleClose={handleCloseCreateTask} />
      </div>
      <button
        onClick={handleLogout}
        className="mt-auto bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>
    </motion.div>
  );
};

export default Sidebar;
