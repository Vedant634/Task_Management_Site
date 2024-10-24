import React from 'react';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const auth = useSelector(store => store.auth);
    const userName = auth.user.fullName;
    
    // console.log(auth)

    return (
        <nav className="h-[8vh] flex justify-between items-center px-6 py-2 bg-gradient-to-r from-indigo-700 to-purple-800">
            <div className="text-white text-xl font-semibold">
                ZenTask Task Manager
            </div>
            <div className="flex items-center space-x-4">
                <span className="text-white font-medium">
                    {userName}
                </span>
                <Avatar sx={{ bgcolor: deepPurple[500] }}>
                    {userName.charAt(0)}
                </Avatar>
            </div>
        </nav>
    );
};

export default Navbar;
