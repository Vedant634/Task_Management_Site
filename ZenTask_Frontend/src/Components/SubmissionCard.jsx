import { div } from 'framer-motion/client'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import React from 'react';
import { Button, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { acceptDeclineSubmission } from '../Redux/SubmissionSlice';

const SubmissionCard = ({item}) => {
const dispatch = useDispatch()
const handleAcceptDecline = (review)=>{
    console.log(review)
    dispatch(acceptDeclineSubmission({id:item.id,status:review}))
}




  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-lg flex items-center justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <span className="text-lg font-medium text-white">GitHub:</span>
          <div className="flex items-center gap-2 text-blue-400 hover:text-blue-500">
            <OpenInNewIcon />
            <a href={item.githubLink} target="_blank" rel="noopener noreferrer" className="underline">
              Go to Link
            </a>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <p className="text-gray-300">Submission Time:</p>
          <p className="text-gray-400">{item.submissionTime}</p>
        </div>
      </div>
      <div>
        {item.status==="Pending" ? (
          <div className="flex gap-5 items-center">
          <IconButton
            style={{ backgroundColor: '#4caf50', color: '#fff' }} 
            onClick={() => handleAcceptDecline("ACCEPT")}
          >
            <CheckIcon />
          </IconButton>
        
          <IconButton
            style={{ backgroundColor: '#f44336', color: '#fff' }} 
            onClick={() => handleAcceptDecline("DECLINE")}
          >
            <CloseIcon /> 
          </IconButton>
        </div>
        ) : (
          <Button size="small" variant="outlined" style={{ borderColor: '#4caf50', color: '#4caf50' }}>
            Accepted
          </Button>
        )}
      </div>
    </div>
  );
}

export default SubmissionCard;
