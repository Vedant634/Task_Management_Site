import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import SubmissionCard from './SubmissionCard';
import { useSelector } from 'react-redux';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function SubmissionList({handleClose,open}) {
  


    const submissions = useSelector(store=>store.submissions)
    const submissionList = submissions.taskSubmissions
    
  
 

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            {submissionList.length>0?<div className='space-y-2'>
              {submissionList.map((item)=><SubmissionCard key={item.id} item={item}/>)}
            </div>:<div className="space-y-2">
            <div className="text-center">
              NO submission found
            </div>
          </div>
            }
          </div>
          
        </Box>
      </Modal>
    </div>
  );
}
