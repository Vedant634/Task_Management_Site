import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import TaskList from '../TaskList/TaskList';

const Home = () => {
 
    return (
        <div className="lg:flex ">
          <div className="hidden lg:block w-[25vw] relative">
            <Sidebar />
          </div>
          <div className="flex-grow bg-gray-100 p-8">
        
           <TaskList/>
          
          </div>
        </div>
      );
}

export default Home